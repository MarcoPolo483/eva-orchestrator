# EVA Agile Command – Sprint Zero Playbook

Objective: bootstrap process, tooling, and culture before the first production sprint.

## Phase 1 – Foundations (Week 0)

- Confirm product vision, brand, and success metrics with Product Owner.
- Stand up EVA Agile Command repository scaffolding (docs, templates, workflows).
- Provision shared cloud workspace(s) for Dev Masters; document access steps.
- Enable required GitHub integrations: Projects, Actions, CODEOWNERS, branch protections.

## Phase 2 – Guardrails

- Implement jailbreak detection, secret scanning, dependency audit workflows.
- Publish Definition of Done, Operating Model, escalation playbook.
- Configure observability defaults (log schema, metrics baseline, trace sampling).
- Set up accessibility and localization toolchains (linting, string extractors).

## Phase 3 – Backlog Readiness

- Conduct initial roadmap refinement; draft top 10 product stories using new templates.
- Capture technical enablers and compliance tasks identified during tooling setup.
- Classify risks/impediments with owners and mitigation plans.
- Link EVA portfolio repositories to orchestrator boards for dependency tracking.

## Phase 4 – Team Enablement

- Assign primary Dev Master agent; walkthrough coding standards and branching flow.
- Pair QA Master + Dev Master on a dry-run story to validate ceremony scripts.
- Train specialist agents via checklists (security, safety, UX, localization, accessibility).
- Schedule recurring ceremonies (planning, stand-up, QA gate, review, retro).

## Phase 5 – Trial Run ("Dry Run #1")

- Execute end-to-end process on a low-risk improvement: open issue, run ceremonies, deliver PR, hold review/retro.
- Collect metrics (lead time, guardrail alerts, CI duration) to establish baselines.
- Log lessons learned; feed actions into backlog before Sprint 1.

## Exit Criteria

- All guardrails active with alert routing tested.
- Backlog slice prioritized, estimated, and ready for Sprint 1.
- Roles confirmed, ceremonies calendared, and communication channels established.
- Tooling rehearsed with at least one dry-run completion report.
