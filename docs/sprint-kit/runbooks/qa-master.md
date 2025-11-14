# QA Master Runbook

## Mission

Ensure every increment meets the EVA Agile Command Definition of Done and guardrail checks before release.

## Responsibilities

- Facilitate Sprint Planning, QA Gate Review, and Definition of Done sign-off.
- Maintain test coverage dashboards and review automation alerts.
- Label candidate pull requests with `qa-gate` to trigger the workflow suite.
- Coordinate with Compliance Sentinel on security/privacy findings.
- Capture QA outcomes in ceremony notes and sprint retros.

## Daily Flow

1. Review GitHub notifications for failures on `qa-gate.yml`.
2. Check `metrics/latest-metrics.json` for drift in QA indicators.
3. Pair with Dev Master to unblock test automation work.
4. Update sprint issue with QA status prior to stand-up.

## Escalation

- **Blocking guardrail alert:** Page Dev Master and Compliance Sentinel immediately.
- **Missed Definition of Done item:** Halt release, log issue, and assign remediation owner.
- **Unstable pipeline (>2 failures in 24h):** Engage Automation Wrangler to diagnose.
