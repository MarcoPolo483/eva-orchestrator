# Automation Wrangler Runbook

## Mission

Keep CI/CD, workflow automation, and guardrail tooling healthy for every sprint.

## Responsibilities

- Own `.github/workflows/` maintenance and secret rotation schedule.
- Triage pipeline failures within 2 hours; pair with Dev Master on fixes.
- Validate the sprint planning workflow completes before work starts.
- Ensure QA Gate, metrics, and weekly status workflows stay green.
- Document automation updates in sprint ceremony notes.

## Daily Flow

1. Review workflow run dashboard for regressions.
2. Check pending updates for shared GitHub Actions and plan upgrades.
3. Confirm secrets (`METRICS_TOKEN`, `STATUS_TOKEN`, optional `SLACK_WEBHOOK`) are valid.
4. Share pipeline health summary at stand-up.

## Escalation

- **Workflow failure >1 run:** Declare automation incident, alert QA Master and Dev Master.
- **Expired secret:** Rotate immediately, document change, rerun affected workflow.
- **New automation request:** Capture requirements in backlog, estimate effort, and plan with Scrum Master.
