# Sprint Lifecycle with EVA Agile Command

This walkthrough captures the flexible cadence we rehearsed in Dry Run 02. Use it as the default playbook for production sprints.

## 1. Plan on Demand

- Product Owner (PO) and Scrum Master (SM) meet whenever new work is ready.
- Review the master plan and choose a backlog slice that fits the goals (size and duration are variable).
- Copy the sprint kit templates into a new folder under `docs/sprint-history/<yyyy-mm-sprint-name>/`.
- Fill in the sprint plan (scope, Definition of Ready/Done alignment, risks) and commit it to `main`.

## 2. Enable the Board

- Scrum Master creates a sprint view in the EVA Agile Command GitHub Project.
- Dev Master moves scoped issues into `Ready` and confirms WIP limits.
- Automation Wrangler runs the `sprint-planning` workflow (manual dispatch) to post links in the planning issue.

## 3. Launch the Sprint

- Hold Sprint Planning: assign owners, confirm acceptance criteria, and capture notes in the pinned communication issue.
- Kick off work immediately; sprints can be short (hours) or longer (days) depending on the slice.
- Daily stand-ups happen in the pinned issue (or mirrored channel once `COMM_CHANNEL_ISSUE` is set).

## 4. Guardrails in Motion

- Label any candidate PR with `qa-gate` to trigger the QA workflow.
- Daily at noon EST, the metrics workflow refreshes `metrics/latest-metrics.json` (set `METRICS_TOKEN` if private data needed).
- Friday noon EST (or manual run) posts the weekly status comment; set `STATUS_TOKEN` if posting outside this repo.

## 5. Review and Retro

- Sprint Review demonstrates the increment (even if it is a rehearsal or documentation update).
- Retrospective records improvements and experiments; archive notes in the sprint folder.
- Set `COMM_CHANNEL_ISSUE` to the pinned issue number so future workflows deliver updates automatically.

## 6. Rinse and Repeat

- As soon as the PO and SM are ready, repeat the planning step for the next sprint—no need to wait for a fixed cadence.
- Archive completed documents in `docs/sprint-history/` and link outcomes in the pinned thread to maintain traceability.

_This document will grow as we add onboarding scripts, dashboard SOPs, and cross-team coordination patterns._
