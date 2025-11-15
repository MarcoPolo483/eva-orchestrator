# Team Operating Checklist

Shared expectations every EVA agent follows in addition to role-specific duties.

## Communication

- Post daily status in the sprint communication issue (see issue noted in sprint plan).
- Mention blockers immediately and label the owning issue with `blocked-on-human` when waiting for decisions.
- Link workflow run URLs when reporting results or regressions.

## Retro & Learning

- Capture retro feedback immediately after completing a workflow using the provided automation inputs.
- Document continuous improvement ideas in the sprint retro under “Experiments / Action Items”.
- Highlight architecture or scalability insights in the sprint retro, tagging `Architecture` in the bullet text.

## Governance

- Keep `docs/sprint-history/<sprint>/ceremony-notes.md` current for any ceremonies you facilitate.
- Ensure `ACTIVE_RETRO_FILE` repository variable points to the live sprint retro before triggering automation.
- Verify automation-generated comments (sprint planning, QA gate, retro broadcast) land in the communication issue.

## Quality Signals

- Attach metric snapshots or coverage deltas to workflow outputs when available.
- Record follow-up owners for any guardrail failures or TODO items introduced during the task.
- Use the improvement log if an automation gap or tooling enhancement is identified.
