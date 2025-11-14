# EVA Agile Command Sprint Kit

Use this folder to bootstrap every sprint. Start with the planning template, link ceremonies, and file completed notes into `../sprint-history/`.

## Included Templates

- `sprint-plan-template.md` – captures scope, Definition of Ready, exit criteria, risks, and assignments.
- `ceremony-notes-template.md` – reusable log for planning, stand-ups, QA gate reviews, reviews, and retros.
- `runbooks/` – role-specific operating guides for EVA Agile Command agents.

## How to Use

1. Copy the templates into a new folder named after the sprint (for example, `../sprint-history/2025-11-sprint-01/`).
2. The Scrum Master fills in the sprint plan after planning with leadership; link all scoped issues.
3. During execution, capture ceremony notes and attach relevant recordings or dashboards.
4. When the sprint closes, move the completed documents into the sprint-history folder and link them in the retro summary issue.

## Required Automations

The GitHub workflows in `.github/workflows/` wire the sprint cadence:

- `sprint-planning.yml` – share sprint kit links in the planning issue.
- `qa-gate.yml` – placeholder QA guardrail triggered by the `qa-gate` label.
- `daily-metrics.yml` – refreshes `metrics/latest-metrics.json` via `lowlighter/metrics` (swap in a PAT once ready).
- `weekly-status-report.yml` – posts a Friday summary comment or can be run on demand.

> Configure repository secrets or variables for any integrations (for example, a fine-grained PAT for metrics or webhook URLs) before enabling scheduled jobs.

## Board Setup

1. Create a sprint view in the EVA Agile Command GitHub Project with columns `Backlog → Ready → In Progress → QA Gate → Done`.
2. Add swimlanes per pod (eva-api, eva-ui, etc.) to prepare for multi-team scaling.
3. Enable auto-add of issues/PRs to ensure the board mirrors GitHub activity.
