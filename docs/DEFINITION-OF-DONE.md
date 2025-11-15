# EVA Agile Command – Definition of Done

The QA Master safeguards this checklist; any item unchecked keeps the story in progress.

## 1. Functional Completeness

- Acceptance criteria approved by Product Owner.
- Feature toggles documented with default state and rollback notes.
- Cross-repo impacts acknowledged (linked issues or follow-on tasks).

## 2. Code Quality

- Code reviewed and approved per PR policy (two sets of eyes for high-risk changes).
- Lint, formatting, and type checks pass with zero warnings.
- Complex logic carries succinct comments or ADR references.

## 3. Testing

- Unit tests cover new/changed paths with ≥80% local coverage.
- Integration/contract tests updated; mocks refreshed.
- Regression suite green in CI (including replay of relevant dry runs).
- Negative and boundary cases considered (document gaps if deferred).

## 4. Security & Safety

- Static analysis, dependency audits, and secret scans are clean.
- Threat model updated (or statement of no change recorded).
- Jailbreak detection and prompt-injection guardrails validated when conversational flows change.

## 5. Accessibility & UX

- WCAG 2.1 AA checks for UI-affecting work (color contrast, keyboard nav, aria labels).
- UX Partner agent sign-off for user-facing copy or flows.

## 6. Performance & Observability

- P95/P99 targets measured or benchmarks updated.
- Telemetry: logs, metrics, traces instrumented and tagged with story ID.
- Runbooks or dashboards updated when signals change.

## 7. Documentation

- README / playbook / API docs updated where behavior or contract shifts.
- Changelog entry drafted (if release-worthy) with rollout instructions.
- Support FAQ or ops notes refreshed for on-call incidents.

## 8. Compliance & Data

- Data classifications reviewed; privacy statements align with usage.
- Localization files updated (en-US, fr-FR minimum) or tasks queued.
- Licensing obligations respected (SBoM diff reviewed).

## 9. Deployment Readiness

- Deploy preview validated (if applicable) and sign-off captured.
- Rollback plan confirmed; feature flags or toggles tested.
- Post-deploy monitoring plan activated (alert thresholds reviewed).

## 10. Administrative

- Story status moved to "Done" with links to PRs, test evidence, and review notes.
- Retro action items (if any) logged.

The QA Master has final authority to block release until every criterion is satisfied or an explicit waiver is approved by the Product Owner.