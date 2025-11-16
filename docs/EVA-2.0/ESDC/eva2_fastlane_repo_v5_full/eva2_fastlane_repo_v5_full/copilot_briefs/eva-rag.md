# Copilot Brief – eva-rag

    ## Context

    You are helping build **EVA 2.0**, a modular AI platform.
    This brief is specifically about the **`eva-rag`** repo.

    Before you start, skim:

    - `docs/architecture_overview.md`
    - `docs/fastlane_demo_scope.md`
    - `docs/api_eva_api_contract.md` (if API-related)
    - `docs/ui_templates_and_assets.md` (if UI-related)
    - `plans/minimum_readiness_matrix.md` (section for `eva-rag`)

    ## Role of this repo

    RAG orchestration layer (combining search + LLM).

    ## Priority for Fastlane Demo

    **MEDIUM**

    ## Minimum Demo Readiness – Definition of Done

    For the fastlane demo, this repo is ready when:

    - Interface `IRagService.answer(request: RagRequest): Promise<RagResponse>`.
- Demo implementation returning a mock answer based on projectId.

    ## Tasks for You (Copilot)

    1. Assess the current state of this repo against the Definition of Done.
    2. Generate/refactor code and docs to reach minimum readiness.
    3. Prefer simple, explicit, well-documented solutions.
    4. Add or update a short `STATUS.md` summarizing what is implemented and what remains.
