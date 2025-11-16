# Copilot Brief – eva-ui

    ## Context

    You are helping build **EVA 2.0**, a modular AI platform.
    This brief is specifically about the **`eva-ui`** repo.

    Before you start, skim:

    - `docs/architecture_overview.md`
    - `docs/fastlane_demo_scope.md`
    - `docs/api_eva_api_contract.md` (if API-related)
    - `docs/ui_templates_and_assets.md` (if UI-related)
    - `plans/minimum_readiness_matrix.md` (section for `eva-ui`)

    ## Role of this repo

    EVA Domain Assistant 2.0 frontend (React/Vite/TS/Tailwind, metadata-driven).

    ## Priority for Fastlane Demo

    **CRITICAL**

    ## Minimum Demo Readiness – Definition of Done

    For the fastlane demo, this repo is ready when:

    - Vite + React + TypeScript + Tailwind app running locally.
- Home screen rendered via `LayoutRenderer` using `home.layout.json` from `eva-seed`.
- Header with EVA Domain Assistant label and project dropdown (Canada Life, Jurisprudence, Admin).
- Dynamic theme based on selected project.
- EN/FR toggle using `eva-i18n`.
- Basic a11y: skip link, landmark roles, keyboard-friendly structure.
- Chat panel with messages, input, send, Clear chat, and suggested questions per project.
- Calls `/rag/answer` on backend with projectId + question.
- Uses asset catalog (e.g., hero_animated_eva) in at least one component.

    ## Tasks for You (Copilot)

    1. Assess the current state of this repo against the Definition of Done.
    2. Generate/refactor code and docs to reach minimum readiness.
    3. Prefer simple, explicit, well-documented solutions.
    4. Add or update a short `STATUS.md` summarizing what is implemented and what remains.
