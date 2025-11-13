# EVA Orchestrator (Local)

Run this locally to create and scaffold all EVA 2.0 repositories in your GitHub account or organization.

**📋 [View EVA Hub - Navigate all 17 repos →](EVA-HUB.md)**

## What it does
- Creates repos listed in `agents/registry.yaml`
- Pushes initial files from `templates/<repo>/...` using the GitHub API
- Adds readiness labels
- Opens tracking issues

## Requirements
- Node.js 20+
- A GitHub token with repo + workflow scopes
- Set environment variables:
  - `GITHUB_TOKEN` (preferred) or `GH_TOKEN`
  - optional overrides:
    - `EVA_OWNER` (defaults to `agents/registry.yaml: org`)
    - `DEFAULT_BRANCH` (defaults to `main`)

## Quickstart (Windows PowerShell)
```powershell
$env:GITHUB_TOKEN="YOUR_PAT"  # or set GH_TOKEN
npm ci
npm run build
node dist/orchestrator.js
```

Or run in dev (ts-node):
```powershell
$env:GITHUB_TOKEN="YOUR_PAT"
npm run dev
```

## Dry run
```powershell
$env:DRY_RUN="1"
npm run dev
```

## Customize
- Edit `agents/registry.yaml` to change owner/org or repo list
- Add/modify files under `templates/<repo>` to change what gets pushed