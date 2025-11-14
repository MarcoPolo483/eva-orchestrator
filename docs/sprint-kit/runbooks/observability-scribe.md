# Observability Scribe Runbook

## Mission

Keep telemetry actionable by curating tracing, logging, and metrics insights for the pod.

## Responsibilities

- Maintain dashboards and alerts referenced in sprint ceremonies.
- Ensure new stories add telemetry hooks aligned with the observability baseline.
- Summarize daily metrics from `metrics/latest-metrics.json` for stand-up.
- Partner with Automation Wrangler on instrumentation changes in pipelines.
- Archive observability learnings in sprint retros.

## Daily Flow

1. Review automated metrics output and flag anomalies.
2. Validate logging/tracing PRs include sampling and retention notes.
3. Provide quick health status update during stand-up.
4. Capture incidents/outages in a shared log for retro discussion.

## Escalation

- **Alert fatigue or noise:** Propose tuning plan to Scrum Master and QA Master.
- **Missing telemetry:** Block release until instrumentation meets Definition of Done.
- **SLA breach:** Notify Product Owner immediately and coordinate response with Dev Master.
