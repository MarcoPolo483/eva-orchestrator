# EVA Agile Command Operating Model

## 1. Mission
- Stand up an autonomous, enterprise-grade AI delivery shop that orchestrates the EVA portfolio with consistent ceremonies, guardrails, and quality gates.
- Ensure every sprint honors safety, security, accessibility, and compliance commitments before value ships.

## 2. Core Roles
- **Product Owner (PO)**: Owns roadmap, value hypotheses, acceptance criteria, and go/no-go decisions.
- **QA Master & Team Manager (SM)**: Facilitates cadence, protects process integrity, maintains Definition of Done, coordinates agents, enforces guardrails, triages incidents.
- **Dev Master Agents**: Execute scoped backlog items in cloud workspaces; each sprint has a primary Dev Master appointed by the QA Master.
- **Specialist Agents** (spawned by the QA Master or Dev Masters): Security Sentinel, Safety Guardian, UX Partner, Localization Steward, Accessibility Advocate, Observability Analyst, etc. Report status back to SM.
- **Support Stack**: Continuous delivery tooling, telemetry collectors, jailbreak monitors, compliance checkers.

## 3. Sprint Cadence (default: weekly)
1. **PO–SM Alignment (pre-sprint)**
   - Review roadmap deltas, funding assumptions, and compliance updates.
   - Curate backlog slice, refresh priorities, and agree on sprint goal candidates.
2. **Sprint Planning (all agents)**
   - Confirm sprint goal and acceptance tests.
   - Assign Dev Master + specialists per story.
   - Capture Definition of Ready confirmations and dependencies.
3. **Daily Orchestration Stand-up**
   - 15-minute async + live sync: status, blockers, jailbreaker alerts, CI signal.
   - QA Master updates the burn chart and risk radar.
4. **Mid-Sprint QA Gate**
   - Run targeted regressions, threat modeling spot check, UX heuristics sweep.
   - Promote blocking issues to impediment queue with owner and ETA.
5. **Sprint Review**
   - Demo increments to PO; highlight metrics, enterprise readiness deltas, and launch risks.
   - PO records accept/reject + follow-up stories.
6. **Sprint Retrospective**
   - Inspect process metrics (lead time, failure rate, signal noise, agent autonomy health).
   - Choose improvement experiments and update runbooks.
7. **Backlog Refinement (continuous)**
   - Groom upcoming work with fresh discovery, compliance notes, and capacity signals.

## 4. Governance & Guardrails
- **Definition of Done** enforced on every story (see companion document).
- **Quality gates**: lint, unit, integration, security, safety, accessibility, observability, data drift.
- **Jailbreak Detection**: automated monitor; breaches pause pipelines, notify QA Master, require incident review.
- **Change Request Workflow**: PR template + reviewer checklist + approval matrix.
- **Compliance Stack**: secrets scanning, SBoM diffing, third-party license enforcement, privacy annotations, audit logging.
- **Observability**: capture telemetry per story; hook dashboards to sprint review.

## 5. Artifact Map
- Backlog → GitHub Projects board (Swimlanes: Ready, In Progress, QA Gate, Review, Done).
- Issue templates: Product Story, Engineering Task, Defect, Risk/Impediment.
- Pull Request template: EVA Agile Command header, narrative, tests, risk sign-off, observability notes.
- Docs: Operating model, Definition of Done, Sprint Zero playbook, Scaling Dev Masters guide, Incident runbook.

## 6. Automation Hooks
- **CI/CD**: GitHub Actions orchestrating lint → tests → security → accessibility → deploy preview.
- **Agent Invocation**: QA Master assigns Dev Masters via orchestrator scripts; specialist agents triggered by labels/workflow dispatch.
- **Metrics**: Push sprint stats to `reports/` and dashboard service.
- **Notifications**: PO receives milestone digest; QA Master gets guardrail alerts; Dev Masters get task-level pings.

## 7. Scaling Dev Masters
- Maintain a roster of certified Dev Masters with domain specialties.
- Onboard new Dev Masters via Sprint Zero tasks: access provisioning, tool training, process rehearsal.
- For multi-agent work:
  - Pair programming policy (primary/secondary roles).
  - Merge queues with QA Master oversight.
  - Shared cloud workspace guidelines (environment parity, secret hygiene, data residency).
- QA Master remains accountable for quality; Dev Masters own implementation, specialists own domain checklists.

## 8. Safety Nets & Incident Handling
- Incident playbook: detect → contain → communicate → correct → learn.
- Root-cause tracking in retros; improvements tied to backlog items.
- Rollback strategy defined per repo; change windows approved by PO + QA Master for high risk items.

## 9. Continuous Improvement Loop
- Weekly metrics review (velocity, escape rate, debt burn-down, guardrail breaches).
- Quarterly health check: revisit ceremonies, tooling, autonomy boundaries.
- Encourage agent experiments with sandboxed branches guarded by QA Master.

EVA Agile Command treats process and quality as first-class deliverables—every sprint reinforces trust, safety, and velocity for the broader EVA ecosystem.