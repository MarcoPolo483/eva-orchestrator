#!/usr/bin/env python3
"""
Standalone version that works without GitHub API access.
Uses hardcoded file list from microsoft/PubSec-Info-Assistant.
"""
from __future__ import annotations
import os
import sys
import json
import hashlib
import time
from pathlib import Path
from typing import List, Dict, Any
import urllib.request
import urllib.error

OWNER = "microsoft"
REPO = "PubSec-Info-Assistant"
COMMIT = "807ee181757af830cd46eadbe31036901183e5dd"  # Latest commit

# Hardcoded list of asset files from the repository
ASSET_FILES = [
    # From docs/
    {"name": "Information Assistant - Architecture Document v1.0.pdf", "path": "docs/Information Assistant - Architecture Document v1.0.pdf", "size": 1123074},
    {"name": "process_flow_agent.drawio.png", "path": "docs/process_flow_agent.drawio.png", "size": 771473},
    {"name": "process_flow_agent.png", "path": "docs/process_flow_agent.png", "size": 771473},
    {"name": "process_flow_chat.drawio.png", "path": "docs/process_flow_chat.drawio.png", "size": 1779473},
    {"name": "process_flow_chat.png", "path": "docs/process_flow_chat.png", "size": 1779469},
    {"name": "work-plus-web-search-web.png", "path": "docs/work-plus-web-search-web.png", "size": 117632},
    # From docs/images/
    {"name": "UX_analysispanel_supportingcontent.png", "path": "docs/images/UX_analysispanel_supportingcontent.png", "size": 1298356},
    {"name": "UX_analysispanel_thoughtprocess.png", "path": "docs/images/UX_analysispanel_thoughtprocess.png", "size": 598835},
    {"name": "UX_anlysispanel_citation_document.png", "path": "docs/images/UX_anlysispanel_citation_document.png", "size": 151435},
    {"name": "UX_anlysispanel_citation_documentsection.png", "path": "docs/images/UX_anlysispanel_citation_documentsection.png", "size": 487759},
    {"name": "VectorSearch.png", "path": "docs/images/VectorSearch.png", "size": 340384},
    {"name": "adjust-settings-ui.png", "path": "docs/images/adjust-settings-ui.png", "size": 19289},
    {"name": "app_registration.png", "path": "docs/images/app_registration.png", "size": 84121},
    {"name": "appcomponents.png", "path": "docs/images/appcomponents.png", "size": 81541},
    {"name": "ask-a-question-interface.jpg", "path": "docs/images/ask-a-question-interface.jpg", "size": 95807},
    {"name": "authentication_identity_provider_identification.jpg", "path": "docs/images/authentication_identity_provider_identification.jpg", "size": 14741},
    {"name": "authentication_managed_application.jpg", "path": "docs/images/authentication_managed_application.jpg", "size": 70744},
    {"name": "chat-interface.png", "path": "docs/images/chat-interface.png", "size": 80514},
    {"name": "codespace_creation.png", "path": "docs/images/codespace_creation.png", "size": 27745},
    {"name": "codespaces_building_container.png", "path": "docs/images/codespaces_building_container.png", "size": 15662},
    {"name": "codespaces_open_in_vs_code_desktop.png", "path": "docs/images/codespaces_open_in_vs_code_desktop.png", "size": 171203},
    {"name": "configure-answer-generation.png", "path": "docs/images/configure-answer-generation.png", "size": 33133},
    {"name": "cosmos_account.png", "path": "docs/images/cosmos_account.png", "size": 6256},
    {"name": "credential-lifespan.png", "path": "docs/images/credential-lifespan.png", "size": 81861},
    {"name": "custom_language_file.png", "path": "docs/images/custom_language_file.png", "size": 3610},
    {"name": "data_explorer.png", "path": "docs/images/data_explorer.png", "size": 128776},
    {"name": "deployment_app_service_location.jpg", "path": "docs/images/deployment_app_service_location.jpg", "size": 79276},
    {"name": "deployment_default_domain.jpg", "path": "docs/images/deployment_default_domain.jpg", "size": 59143},
    {"name": "developing_in_a_codespaces_image_1.png", "path": "docs/images/developing_in_a_codespaces_image_1.png", "size": 153697},
    {"name": "developing_in_a_codespaces_image_2.png", "path": "docs/images/developing_in_a_codespaces_image_2.png", "size": 135368},
    {"name": "developing_in_a_codespaces_open_in_vscode_2.png", "path": "docs/images/developing_in_a_codespaces_open_in_vscode_2.png", "size": 150754},
    {"name": "developing_in_a_codespaces_open_in_vscode_3.png", "path": "docs/images/developing_in_a_codespaces_open_in_vscode_3.png", "size": 35652},
    {"name": "developing_in_a_codespaces_open_in_vscode_4.png", "path": "docs/images/developing_in_a_codespaces_open_in_vscode_4.png", "size": 211916},
    {"name": "fastapi_debug.png", "path": "docs/images/fastapi_debug.png", "size": 12281},
    {"name": "fork_repo.png", "path": "docs/images/fork_repo.png", "size": 7307},
    {"name": "frontend-watch.png", "path": "docs/images/frontend-watch.png", "size": 15370},
    {"name": "function_attach.png", "path": "docs/images/function_attach.png", "size": 21391},
    {"name": "function_running.png", "path": "docs/images/function_running.png", "size": 82266},
    {"name": "generative-ungrounded-ui.png", "path": "docs/images/generative-ungrounded-ui.png", "size": 42364},
    {"name": "info-assist-chat-ui.png", "path": "docs/images/info-assist-chat-ui.png", "size": 76899},
    {"name": "info_assistant_chatscreen.png", "path": "docs/images/info_assistant_chatscreen.png", "size": 133684},
    {"name": "known_Issues_web_app_authentication.png", "path": "docs/images/known_Issues_web_app_authentication.png", "size": 107192},
    {"name": "manage-content-delete.png", "path": "docs/images/manage-content-delete.png", "size": 87417},
    {"name": "manage-content-interface.png", "path": "docs/images/manage-content-interface.png", "size": 14198},
    {"name": "manage-content-ui.png", "path": "docs/images/manage-content-ui.png", "size": 18403},
    {"name": "manage-content-upload-files-1.png", "path": "docs/images/manage-content-upload-files-1.png", "size": 69311},
    {"name": "manage-content-upload-files.png", "path": "docs/images/manage-content-upload-files.png", "size": 18349},
    {"name": "manage-content-upload-status.png", "path": "docs/images/manage-content-upload-status.png", "size": 58853},
    {"name": "math-assistant-give-me-clues.png", "path": "docs/images/math-assistant-give-me-clues.png", "size": 56484},
    {"name": "math-assistant-show-me-how-to-solve.png", "path": "docs/images/math-assistant-show-me-how-to-solve.png", "size": 59066},
    {"name": "math-assistant-show-me-the-answer.png", "path": "docs/images/math-assistant-show-me-the-answer.png", "size": 51430},
    {"name": "math-assistant-ui.png", "path": "docs/images/math-assistant-ui.png", "size": 48221},
    {"name": "python_version.png", "path": "docs/images/python_version.png", "size": 13881},
    {"name": "sandbox_environment_build_pipeline_configuration.png", "path": "docs/images/sandbox_environment_build_pipeline_configuration.png", "size": 321540},
    {"name": "secure-deploy-detail-architecture.drawio", "path": "docs/images/secure-deploy-detail-architecture.drawio", "size": 1039119},
    {"name": "secure-deploy-detail-architecture.png", "path": "docs/images/secure-deploy-detail-architecture.png", "size": 4912033},
    {"name": "secure-deploy-frontend-architecture.drawio", "path": "docs/images/secure-deploy-frontend-architecture.drawio", "size": 1352607},
    {"name": "secure-deploy-frontend-architecture.png", "path": "docs/images/secure-deploy-frontend-architecture.png", "size": 4735231},
    {"name": "secure-deploy-function-architecture.drawio", "path": "docs/images/secure-deploy-function-architecture.drawio", "size": 1840296},
    {"name": "secure-deploy-function-architecture.png", "path": "docs/images/secure-deploy-function-architecture.png", "size": 2547217},
    {"name": "secure-deploy-high-level-architecture.drawio", "path": "docs/images/secure-deploy-high-level-architecture.drawio", "size": 918017},
    {"name": "secure-deploy-high-level-architecture.png", "path": "docs/images/secure-deploy-high-level-architecture.png", "size": 4661139},
    {"name": "secure-deploy-network-architecture.png", "path": "docs/images/secure-deploy-network-architecture.png", "size": 401601},
    {"name": "sharepoint-preview-designer-known-issue.png", "path": "docs/images/sharepoint-preview-designer-known-issue.png", "size": 174308},
    {"name": "sharepoint_logic_app_diagram.png", "path": "docs/images/sharepoint_logic_app_diagram.png", "size": 206711},
    {"name": "tab-data-assist-how-many-rows.png", "path": "docs/images/tab-data-assist-how-many-rows.png", "size": 91111},
    {"name": "tab-data-assist-how-many.png", "path": "docs/images/tab-data-assist-how-many.png", "size": 76471},
    {"name": "tab-data-assist-upload-files-ui.png", "path": "docs/images/tab-data-assist-upload-files-ui.png", "size": 49711},
    {"name": "upload-files-drag-drop.jpg", "path": "docs/images/upload-files-drag-drop.jpg", "size": 30653},
    {"name": "upload-files-link.png", "path": "docs/images/upload-files-link.png", "size": 18374},
    {"name": "upload-status-delete.png", "path": "docs/images/upload-status-delete.png", "size": 55279},
    {"name": "view-upload-status-link.png", "path": "docs/images/view-upload-status-link.png", "size": 30865},
    {"name": "view-upload-status-options-and-refresh.png", "path": "docs/images/view-upload-status-options-and-refresh.png", "size": 190219},
    {"name": "virtual_env.jpg", "path": "docs/images/virtual_env.jpg", "size": 27165},
    {"name": "vite-debug.png", "path": "docs/images/vite-debug.png", "size": 15506},
    {"name": "vscode_reopen_in_container.png", "path": "docs/images/vscode_reopen_in_container.png", "size": 6457},
    {"name": "vscode_starting_dev_container.png", "path": "docs/images/vscode_starting_dev_container.png", "size": 3152},
    {"name": "vscode_terminal_windows.png", "path": "docs/images/vscode_terminal_windows.png", "size": 27414},
    {"name": "webapp-backend.png", "path": "docs/images/webapp-backend.png", "size": 17142},
    {"name": "webapp_debug_1.png", "path": "docs/images/webapp_debug_1.png", "size": 9201},
    {"name": "webapp_debug_2.png", "path": "docs/images/webapp_debug_2.png", "size": 15423},
    {"name": "webapp_debug_3.png", "path": "docs/images/webapp_debug_3.png", "size": 3734},
    {"name": "work-plus-web-compare-with-web.png", "path": "docs/images/work-plus-web-compare-with-web.png", "size": 94625},
    {"name": "work-plus-web-compare-with-work.png", "path": "docs/images/work-plus-web-compare-with-work.png", "size": 148829},
    {"name": "work-plus-web-search-web.png", "path": "docs/images/work-plus-web-search-web.png", "size": 131249},
    {"name": "work-plus-web-ui.png", "path": "docs/images/work-plus-web-ui.png", "size": 147885},
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

MIT_LICENSE = """MIT License

Copyright (c) Microsoft Corporation.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE
"""

def is_asset(name: str) -> bool:
    lower = name.lower()
    for ext in ALLOWED_EXT:
        if lower.endswith(ext):
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
    MANIFEST_FILE.parent.mkdir(parents=True, exist_ok=True)
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

def download_file(path: str) -> bytes:
    """Download file from raw.githubusercontent.com"""
    url_path = urllib.parse.quote(path)
    url = f"https://raw.githubusercontent.com/{OWNER}/{REPO}/{COMMIT}/{url_path}"
    print(f"Downloading {path}...", file=sys.stderr)
    req = urllib.request.Request(url, headers={"User-Agent": "asset-import-script"})
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            return response.read()
    except urllib.error.URLError as e:
        print(f"Failed to download {path}: {e}", file=sys.stderr)
        raise

def process_assets(dry_run: bool = False, force: bool = False) -> None:
    LOCAL_ASSET_DIR.mkdir(parents=True, exist_ok=True)
    existing_manifest = load_manifest()
    manifest_assets: List[Dict[str, Any]] = existing_manifest.get("assets", [])

    new_assets: List[Dict[str, Any]] = []
    actions: List[str] = []

    # Process hardcoded asset list
    for item in ASSET_FILES:
        name = item["name"]
        path = item["path"]
        size = item["size"]
        
        if not is_asset(name):
            continue

        # Download bytes (or skip if already present & same hash)
        try:
            content_bytes = download_file(path)
        except Exception as e:
            actions.append(f"FAILED to download {name}: {e}")
            continue
            
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

        # Write license copy
        if (not LICENSE_COPY_FILE.exists()) or force:
            LICENSE_COPY_FILE.write_text(MIT_LICENSE, encoding="utf-8")

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
    import argparse
    parser = argparse.ArgumentParser(description="Import PubSec Info Assistant graphic assets (standalone version).")
    parser.add_argument("--dry-run", action="store_true", help="List actions only; do not write files.")
    parser.add_argument("--force", action="store_true", help="Force re-download and overwrite.")
    args = parser.parse_args()

    process_assets(dry_run=args.dry_run, force=args.force)

if __name__ == "__main__":
    main()
