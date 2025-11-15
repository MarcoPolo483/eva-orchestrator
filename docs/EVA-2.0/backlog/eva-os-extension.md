# EVA OS Extension Backlog

_Last updated: 2025-11-14_

## Vision Snapshot
- Deliver an EVA-branded assistant for VS Code/GitHub that mirrors ChatGPT interchat persistence while staying repo-aware and team-shareable.
- Offer a marketplace-ready product (tentatively "EVA Companion") that plugs into EVA Orchestrator services but can operate in a lightweight self-hosted mode.

## Platform Targets
- Primary: VS Code extension (marketplace distribution) with optional GitHub App integration for org-wide memory sharing.
- Service Layer: Session ledger API backed by Postgres or SQLite + Prisma; deployable via EVA Orchestrator or standalone container.
- Automation: Nightly/periodic summarizer (GitHub Actions or Azure Functions timer) that updates thread digests and knowledge artifacts.

## Initial Backlog
1. **Product Discovery**
   - Validate user segments (solo devs vs. teams) and required persistence depth.
   - Benchmark existing assistants for gaps (Copilot Chat, ChatGPT tabs, Cursor memory).
2. **Session Ledger MVP**
   - Draft schema (threads, turns, summaries, artifacts) and CRUD API contract.
   - Implement storage service with Prisma migrations and auth hooks.
3. **Knowledge Library Pipeline**
   - Define doc export format (e.g., `docs/reference/session-*.md`).
   - Build automation to refresh summaries and publish digests to repo/library.
4. **VS Code UX Shell**
   - Wire message panel, thread switcher, summary pane, and evidence linking.
   - Integrate with EVA agents for repo-aware actions (tests, refactors, docs).
5. **GitHub App Exploration**
   - Outline permissions, event triggers (PR comments, workflow runs), and shared memory use cases.
   - Plan phased rollout once VS Code extension stabilizes.

## Open Questions
- How much context history should persist per thread before compression triggers?
- Should summaries live solely in the ledger service or also reside in-repo for auditability?
- What offline/air-gapped story is required for enterprise adopters?

## Next Review
- Revisit during the next architecture sync to prioritize MVP scope and assign ownership.
