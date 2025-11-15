# Sprint Plan: Dry Run 04

## 1. Mission & Scope

- **Sprint window:** 2025-12-02 → 2025-12-05
- **Product area / pod:** EVA Agile Command (retro automation pilot)
- **Objective statement:** Validate end-to-end retro automation by capturing feedback directly from role workflows and confirming the broadcast comment reaches the communication hub without manual follow-up.

## 2. Proposed Sprint Backlog (Draft)

| Issue | Title | DoR Ready? | Owner | Notes |
|-------|-------|------------|-------|-------|
| DR4-001 | QA Gate retro note capture | ☐ | QA Master | Run QA Gate via `workflow_dispatch` with `retro-feedback`, ensure retro update commits and broadcast comment posts to issue #4. |
| DR4-002 | Planning workflow retro hookup | ☐ | Scrum Master | Extend `sprint-planning.yml` to optionally call retro append script; capture planning observations. |
| DR4-003 | Retro variable rotation checklist | ☐ | Dev Master | Document and automate update of `ACTIVE_RETRO_FILE` repo variable at sprint boundaries. |
| DR4-004 | Broadcast reliability test | ☐ | Automation Wrangler | Trigger `retro-update.yml` manually + via push to validate edge cases, record diagnostics. |
| DR4-005 | Agent runtime kill switch | ☐ | Dev Master | Wire `eva-agent` runtime into token budget/circuit breaker helpers; add runaway loop guardrail test. |

- Link to GitHub Project view: _Create "Dry Run 04" board once backlog issues exist._
- Definition of Ready references: sprint kit checklist + Dry Run 03 exit criteria + retro automation runbook.

## 3. Success Criteria & Exit Checklist

- [ ] Each role-specific workflow used in the sprint records retro notes automatically through `retro-append.mjs`.
- [ ] `retro-update.yml` posts at least two broadcast comments referencing Dry Run 04 retro file.
- [ ] `ACTIVE_RETRO_FILE` variable rotated to Dry Run 04 path and confirmed via workflow logs.
- [ ] No manual reminders were required to gather retro feedback.

## 4. Risks & Mitigations

| Risk | Owner | Mitigation | Trigger |
|------|-------|------------|---------|
| Automated commits cause merge conflicts | Automation Wrangler | Use dedicated retro branch when needed; squash commits post-run. | Repeated conflicts appear in Dry Run 04 retro history. |
| Repo variable missing | Scrum Master | Add check in workflows to fail early with clear call-to-action. | QA Gate run exits without retro note. |
| Broadcast spam | Dev Master | Rate-limit manual triggers and consolidate batched updates. | More than 3 comments within 10 minutes. |

## 5. Next Steps Before Kickoff

1. Clone Dry Run 03 retro template into Dry Run 04 folder and set as active retro target.
2. Open backlog issues DR4-001 through DR4-004 and link them to the Dry Run 04 project board once created.
3. Schedule rehearsal to walk through QA Gate manual run with retro inputs.
4. Align with Product Owner on automation expectations and sign-off criteria.

_This plan focuses on a controlled pilot of workflow-driven retro capture before scaling to all roles._
