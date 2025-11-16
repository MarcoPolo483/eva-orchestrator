# Copilot Brief – eva-core

    ## Context

    You are helping build **EVA 2.0**, a modular AI platform.
    This brief is specifically about the **`eva-core`** repo.

    Before you start, skim:

    - `docs/architecture_overview.md`
    - `docs/fastlane_demo_scope.md`
    - `docs/api_eva_api_contract.md` (if API-related)
    - `docs/ui_templates_and_assets.md` (if UI-related)
    - `plans/minimum_readiness_matrix.md` (section for `eva-core`)

    ## Role of this repo

    Core domain types and interfaces shared across backend and frontend.

    ## Priority for Fastlane Demo

    **MEDIUM**

    ## Minimum Demo Readiness – Definition of Done

    For the fastlane demo, this repo is ready when:

    - Define TypeScript interfaces for ProjectConfig, Layout, ScreenTemplate, Asset, RagRequest, RagResponse.
- Export as small package used by `eva-api`, `eva-ui`, and `eva-mobile`.

    ## Tasks for You (Copilot)

    1. Assess the current state of this repo against the Definition of Done.
    2. Generate/refactor code and docs to reach minimum readiness.
    3. Prefer simple, explicit, well-documented solutions.
    4. Add or update a short `STATUS.md` summarizing what is implemented and what remains.
