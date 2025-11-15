# EVA Orchestrator (Local)

Run this locally to create and scaffold all EVA 2.0 repositories in your GitHub account or organization.

**📋 [View EVA Hub - Navigate all 17 repos →](EVA-HUB.md)**

**🧭 [EVA Agile Command Sprint Kit →](docs/sprint-kit/README.md)**

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

## Update Project Dashboard

Update a GitHub Project board with all issues and pull requests from a repository:

```powershell
$env:GITHUB_TOKEN="YOUR_PAT"
npm run build
npm run update-dashboard -- --repo owner/repo --project "Project Name"
```

Example:
```powershell
npm run update-dashboard -- --repo MarcoPolo483/eva-orchestrator --project "EVA Agile Sprint 1"
```

Dry run mode:
```powershell
npm run update-dashboard -- --repo owner/repo --project "Project Name" --dry-run
```

**Note:** Your GitHub token must have `project` scope in addition to `repo` scope to update project boards.

## Agile Command Resources

- [Sprint Kit](docs/sprint-kit/README.md)
- [Role Runbooks](docs/sprint-kit/runbooks)
- [RACI Matrix](docs/sprint-kit/raci-matrix.md)
