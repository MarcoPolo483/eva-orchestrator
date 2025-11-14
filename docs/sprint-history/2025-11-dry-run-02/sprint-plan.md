# Sprint Plan: Dry Run 02

## 1. Mission & Scope

- **Sprint window:** 2025-11-14 → 2025-11-18
- **Product area / pod:** EVA Agile Command (dry run rehearsal)
- **Objective statement:** Rehearse the full EVA Agile Command workflow using blank test tasks to validate ceremonies, tooling, and communications.

## 2. Sprint Backlog

| Issue | Title | DoR Ready? | Owner | Notes |
|-------|-------|------------|-------|-------|
| [DR2-001](https://github.com/MarcoPolo483/eva-orchestrator/issues/5) | Placeholder Story A | ✅ | To be assigned | Create shell issue with acceptance stub only.
| [DR2-002](https://github.com/MarcoPolo483/eva-orchestrator/issues/6) | Placeholder Story B | ✅ | To be assigned | Link to dummy repo branch; no production impact.
| [DR2-003](https://github.com/MarcoPolo483/eva-orchestrator/issues/7) | Placeholder Chore C | ✅ | To be assigned | Exercise automation + documentation steps.
| [DR2-004](https://github.com/MarcoPolo483/eva-orchestrator/issues/8) | Automation Exercise | ✅ | To be assigned | Trigger label application + workflow comment (simulate cross-repo automation).

- Link to GitHub Project view: [Dry Run 02 board](https://github.com/users/MarcoPolo483/projects/2)
- Definition of Ready checklist location(s): [Definition of Done](../../docs/DEFINITION-OF-DONE.md) + sprint kit checklist
- Quick DoR spot-check (applies to all placeholder issues): acceptance stub present, owner identified, QA note drafted, automation touchpoint listed.

## 3. Definition of Done Alignment

- ✅ Functional criteria satisfied per [Definition of Done](../../docs/DEFINITION-OF-DONE.md)
- ✅ Tests automated and documented (use placeholder command with echo output)
- ✅ Security/Compliance sign-offs (mock approval recorded in ceremony notes)
- ✅ Documentation + housekeeping complete (update notes + sprint history)

_Add extra acceptance or exit criteria below:_

- [x] Confirm COMM_CHANNEL_ISSUE variable set to #3 (validated 2025-11-14)
- [ ] Capture lessons learned and file in [retro](retro.md)
- [x] Verify `qa-gate` workflow completes successfully with placeholder command output logged (run [19376738042](https://github.com/MarcoPolo483/eva-orchestrator/actions/runs/19376738042))
- [x] Log manual notification workflow test result in ceremony notes (run [19376727644](https://github.com/MarcoPolo483/eva-orchestrator/actions/runs/19376727644) surfaced missing `planning-issue` input handling)

## 4. Risk & Impediment Radar

| Risk | Owner | Mitigation | Trigger |
|------|-------|------------|---------|
| Dry run tasks lack real dependencies | Scrum Master | Pair Dev Master with QA Master to define minimal stubs | Team confusion about task intent |
| Workflow notifications misfire | Automation Wrangler | Run workflows manually before labeling; document result | Missing comment or failure alert |
| Comm channel unset | Scrum Master | (Done 2025-11-14) Variable `COMM_CHANNEL_ISSUE=3`; add guard in first run to echo value | Workflows attempting to post before variable exists |

## 5. Ceremonies & Participants

| Ceremony | Date | Facilitator | Attendees | Notes |
|----------|------|-------------|----------|-------|
| Sprint Planning | 2025-11-14 | Scrum Master | Full pod | Review plan, assign placeholder issues
| Daily Stand-up | 2025-11-15–11-18 | Dev Master | Feature team | Use pinned issue for updates
| QA Gate Review | 2025-11-17 | QA Master | QA + Dev Master | Label DR2 PR with `qa-gate`; pass criteria = placeholder test script + workflow green + comment posted
| Sprint Review | 2025-11-18 | Product Owner | Stakeholders | Demo workflow outputs + metrics
| Retrospective | 2025-11-18 | Scrum Master | Pod + PO | Record actions in ceremony notes

## 6. Metrics Targets

- **Lead time target:** Within 1 day (dry run placeholder)
- **Cycle time target:** Keep each task < 1 day in In Progress
- **QA gate pass rate:** 100% (placeholders should pass)
- **Deployment frequency goal:** N/A (no production deploy)
- **Measurement approach:** Record timestamps via issue activity + pinned issue updates to emulate dashboard inputs.

## 7. Approvals

- Product Owner: Marco (approved 2025-11-14 via issue #4)
- Scrum Master: GitHub Copilot (SM)
- QA Master: QA Master (approved 2025-11-14 via issue #4)
