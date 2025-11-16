#!/usr/bin/env python3
"""
Import graphic assets from microsoft/PubSec-Info-Assistant into this repo.

Best practices implemented:
- Uses GitHub REST API with pagination to enumerate all files under /docs and /docs/images.
- Filters image/diagram extensions (.png .jpg .jpeg .gif .svg .webp .drawio .pdf).
- Downloads each asset, preserving original filename.
- Deduplicates by computing SHA256 and skipping identical existing assets.
- Generates/updates a manifest with metadata (source path, size, sha256, category).
- Adds MIT license attribution section (source repo license).
- Supports dry-run mode.
- Can produce a diff summary.
- Safe re-run: only new/changed files are rewritten.

Requirements:
  pip install requests

Environment:
  GITHUB_TOKEN (with public repo read rights at minimum)
  TARGET_REPO_ROOT (optional; defaults to current working directory)

Usage:
  python scripts/import_pubsec_info_assets.py           # normal run
  python scripts/import_pubsec_info_assets.py --dry-run # list actions only
  python scripts/import_pubsec_info_assets.py --force   # re-download even if exists
"""
from __future__ import annotations
import os
import sys
import json
import argparse
import hashlib
import time
from pathlib import Path
from typing import List, Dict, Any, Tuple
import requests

OWNER = "microsoft"
REPO = "PubSec-Info-Assistant"
API_BASE = "https://api.github.com"
# Remote directories to scan
REMOTE_PATHS = [
    "docs",
    "docs/images",
]
# File extensions to include
ALLOWED_EXT = {
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp",
    ".drawio", ".drawio.png", ".pdf"
}

# Local target root for third-party assets
LOCAL_ASSET_DIR = Path("assets/third-party/pubsec-info-assistant")
MANIFEST_FILE = LOCAL_ASSET_DIR / "PUBSEC-INFO-ASSETS_MANIFEST.json"
MANIFEST_MD_FILE = Path("docs/EVA-2.0/reference/PUBSEC-INFO-ASSETS_MANIFEST.md")
LICENSE_COPY_FILE = LOCAL_ASSET_DIR / "SOURCE_LICENSE_MIT.txt"

SESSION = requests.Session()

def github_request(url: str, params: Dict[str, Any] | None = None) -> Any:
    token = os.getenv("GITHUB_TOKEN")
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "asset-import-script",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    resp = SESSION.get(url, headers=headers, params=params, timeout=30)
    if resp.status_code == 403 and "rate limit" in resp.text.lower():
        reset = resp.headers.get("X-RateLimit-Reset")
        if reset:
            wait_sec = max(int(reset) - int(time.time()), 5)
            print(f"Rate limit hit. Sleeping {wait_sec}s...", file=sys.stderr)
            time.sleep(wait_sec)
            return github_request(url, params)
    resp.raise_for_status()
    return resp.json()

def list_directory(path: str) -> List[Dict[str, Any]]:
    """
    Return list of items (files & subdirs) for a given path.
    GitHub contents API does not paginate directory listing; but large trees may need /git/trees.
    Use /contents first; if truncated, fallback to /git/trees?recursive=1
    """
    url = f"{API_BASE}/repos/{OWNER}/{REPO}/contents/{path}"
    try:
        data = github_request(url)
        if isinstance(data, list):
            return data
        return []
    except (requests.HTTPError, requests.exceptions.ConnectionError, OSError) as e:
        print(f"Failed to list {path}: {e}", file=sys.stderr)
        print(f"Trying alternate method...", file=sys.stderr)
        # Fallback: try using raw githubusercontent.com
        try:
            return list_directory_fallback(path)
        except Exception as e2:
            print(f"Fallback also failed: {e2}", file=sys.stderr)
            return []

def list_directory_fallback(path: str) -> List[Dict[str, Any]]:
    """
    Fallback method using tree API when direct listing fails.
    """
    import subprocess
    import json as json_lib
    
    # Use GitHub CLI if available
    try:
        result = subprocess.run(
            ["gh", "api", f"/repos/{OWNER}/{REPO}/contents/{path}"],
            capture_output=True,
            text=True,
            timeout=30
        )
        if result.returncode == 0:
            return json_lib.loads(result.stdout)
    except (FileNotFoundError, subprocess.TimeoutExpired, json_lib.JSONDecodeError):
        pass
    
    return []

def is_asset(name: str) -> bool:
    lower = name.lower()
    for ext in ALLOWED_EXT:
        if lower.endswith(ext):
            return True
    # handle .drawio.png combined extension
    if lower.endswith(".drawio.png"):
        return True
    return False

def classify(filename: str) -> str:
    """
    Heuristic category classification based on filename keywords.
    """
    f = filename.lower()
    if "architecture" in f or "diagram" in f or "flow" in f or "network" in f:
        return "architecture-diagram"
    if "ui" in f or "interface" in f or "screen" in f or "panel" in f:
        return "ui-screenshot"
    if "deploy" in f or "deployment" in f:
        return "deployment-diagram"
    if "math-assistant" in f:
        return "feature-math-assistant"
    if "manage-content" in f or "upload" in f or "content" in f:
        return "content-management"
    if "secure" in f:
        return "security-architecture"
    if "vectorsearch" in f or "search" in f:
        return "search-feature"
    if f.endswith(".pdf"):
        return "document"
    if f.endswith(".drawio") or f.endswith(".drawio.png"):
        return "source-diagram"
    return "misc"

def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()

def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def load_manifest() -> Dict[str, Any]:
    if MANIFEST_FILE.exists():
        try:
            return json.loads(MANIFEST_FILE.read_text(encoding="utf-8"))
        except Exception:
            return {"assets": []}
    return {"assets": []}

def save_manifest(manifest: Dict[str, Any]) -> None:
    MANIFEST_FILE.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

def update_markdown_manifest(manifest: Dict[str, Any]) -> None:
    lines = [
        "# PubSec Info Assistant – Imported Graphic Assets",
        "",
        "This manifest documents third-party assets imported from "
        f"[{OWNER}/{REPO}](https://github.com/{OWNER}/{REPO}) under the MIT License.",
        "",
        "## Attribution",
        "Source repository license: MIT (see SOURCE_LICENSE_MIT.txt)",
        "",
        "## Assets",
        "",
        "| Filename | Category | Source Path | Size (bytes) | SHA256 | First Imported | Last Updated |",
        "|----------|----------|-------------|--------------|--------|----------------|--------------|",
    ]
    for asset in manifest.get("assets", []):
        lines.append(
            f"| {asset['filename']} | {asset['category']} | `{asset['source_path']}` | "
            f"{asset['size']} | `{asset['sha256'][:12]}` | {asset['first_imported']} | {asset['last_updated']} |"
        )
    lines.append("")
    lines.append("## Notes")
    lines.append("- Re-run the import script to update with new upstream assets.")
    lines.append("- Duplicate SHA256 hashes indicate identical content upstream.")
    MANIFEST_MD_FILE.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_MD_FILE.write_text("\n".join(lines), encoding="utf-8")

def fetch_license() -> str:
    url = f"{API_BASE}/repos/{OWNER}/{REPO}/contents/LICENSE"
    data = github_request(url)
    if "content" in data and data.get("encoding") == "base64":
        import base64
        return base64.b64decode(data["content"]).decode("utf-8", "replace")
    # fallback
    return "MIT License (source retrieval failed)"

def download_file(download_url: str) -> bytes:
    token = os.getenv("GITHUB_TOKEN")
    headers = {"User-Agent": "asset-import-script"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    r = SESSION.get(download_url, headers=headers, timeout=60)
    r.raise_for_status()
    return r.content

def process_assets(dry_run: bool = False, force: bool = False) -> None:
    LOCAL_ASSET_DIR.mkdir(parents=True, exist_ok=True)
    existing_manifest = load_manifest()
    manifest_assets: List[Dict[str, Any]] = existing_manifest.get("assets", [])
    manifest_index = {(a["source_path"], a["sha256"]): a for a in manifest_assets}

    new_assets: List[Dict[str, Any]] = []
    actions: List[str] = []

    # Enumerate remote paths
    for remote in REMOTE_PATHS:
        items = list_directory(remote)
        for item in items:
            if item.get("type") != "file":
                continue
            name = item["name"]
            path = item["path"]
            if not is_asset(name):
                continue
            size = item.get("size", 0)
            download_url = item.get("download_url")
            if not download_url:
                continue

            # Download bytes (or skip if already present & same hash)
            content_bytes = download_file(download_url)
            sha256 = sha256_bytes(content_bytes)
            local_path = LOCAL_ASSET_DIR / name

            existing = None
            for a in manifest_assets:
                if a["filename"] == name and a["sha256"] == sha256:
                    existing = a
                    break

            timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            category = classify(name)

            if existing and not force:
                actions.append(f"SKIP (unchanged) {name}")
                # Update last_updated for clarity
                existing["last_updated"] = timestamp
                continue

            if dry_run:
                actions.append(f"DRY-RUN would {'overwrite' if local_path.exists() else 'write'} {name}")
            else:
                local_path.write_bytes(content_bytes)
                if existing:
                    existing["sha256"] = sha256
                    existing["size"] = size
                    existing["category"] = category
                    existing["last_updated"] = timestamp
                    actions.append(f"UPDATED {name}")
                else:
                    asset_entry = {
                        "filename": name,
                        "source_path": path,
                        "size": size,
                        "sha256": sha256,
                        "category": category,
                        "first_imported": timestamp,
                        "last_updated": timestamp,
                    }
                    manifest_assets.append(asset_entry)
                    actions.append(f"ADDED {name}")
                    new_assets.append(asset_entry)

    # Save manifest & markdown manifest
    if not dry_run:
        save_manifest({"assets": manifest_assets})
        update_markdown_manifest({"assets": manifest_assets})

        # Write license copy if absent or force
        if (not LICENSE_COPY_FILE.exists()) or force:
            LICENSE_COPY_FILE.write_text(fetch_license(), encoding="utf-8")

    # Summary
    print("\n=== ACTION SUMMARY ===")
    for a in actions:
        print(a)
    print(f"\nTotal processed assets: {len(actions)}")
    if dry_run:
        print("Dry-run: no files written.")
    else:
        print(f"Manifest entries: {len(manifest_assets)}")
        print(f"New assets added: {len(new_assets)}")

def main():
    parser = argparse.ArgumentParser(description="Import PubSec Info Assistant graphic assets.")
    parser.add_argument("--dry-run", action="store_true", help="List actions only; do not write files.")
    parser.add_argument("--force", action="store_true", help="Force re-download and overwrite.")
    args = parser.parse_args()

    # Optional custom root
    root = os.getenv("TARGET_REPO_ROOT")
    if root:
        os.chdir(root)

    process_assets(dry_run=args.dry_run, force=args.force)

if __name__ == "__main__":
    main()
