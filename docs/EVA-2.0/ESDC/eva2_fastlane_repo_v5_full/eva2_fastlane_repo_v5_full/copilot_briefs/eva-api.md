# Copilot Brief – eva-api

    ## Context

    You are helping build **EVA 2.0**, a modular AI platform.
    This brief is specifically about the **`eva-api`** repo.

    Before you start, skim:

    - `docs/architecture_overview.md`
    - `docs/fastlane_demo_scope.md`
    - `docs/api_eva_api_contract.md` (if API-related)
    - `docs/ui_templates_and_assets.md` (if UI-related)
    - `plans/minimum_readiness_matrix.md` (section for `eva-api`)

    ## Role of this repo

    HTTP API surface for EVA services consumed by EVA UI and mobile.

    ## Priority for Fastlane Demo

    **HIGH**

    ## Minimum Demo Readiness – Definition of Done

    For the fastlane demo, this repo is ready when:

    - Implement `/projects`, `/layouts/:pageId`, `/assets`, `/templates`, and `/rag/answer` endpoints as per `docs/api_eva_api_contract.md`.
- Wire `/rag/answer` to `eva-rag` mock and `eva-safety` check.
- Log usage via `eva-metering` helper.
- Run locally and deploy to Azure.

    ## Tasks for You (Copilot)

    1. Assess the current state of this repo against the Definition of Done.
    2. Generate/refactor code and docs to reach minimum readiness.
    3. Prefer simple, explicit, well-documented solutions.
    4. Add or update a short `STATUS.md` summarizing what is implemented and what remains.
