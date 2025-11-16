# Copilot Brief – eva-seed

    ## Context

    You are helping build **EVA 2.0**, a modular AI platform.
    This brief is specifically about the **`eva-seed`** repo.

    Before you start, skim:

    - `docs/architecture_overview.md`
    - `docs/fastlane_demo_scope.md`
    - `docs/api_eva_api_contract.md` (if API-related)
    - `docs/ui_templates_and_assets.md` (if UI-related)
    - `plans/minimum_readiness_matrix.md` (section for `eva-seed`)

    ## Role of this repo

    Seed data and configuration (projects, layouts, templates, assets, prompts).

    ## Priority for Fastlane Demo

    **HIGH**

    ## Minimum Demo Readiness – Definition of Done

    For the fastlane demo, this repo is ready when:

    - Provide `projects.json` with at least Canada Life, Jurisprudence, Admin.
- Provide `layouts/home.layout.json` used by `eva-ui`.
- Provide `templates/screenTemplates.json` with `chat_landing_v1`.
- Provide `assets/assetCatalog.json` with a few example assets.
- Provide `sample_prompts.json` with 2–3 suggested questions per project.

    ## Tasks for You (Copilot)

    1. Assess the current state of this repo against the Definition of Done.
    2. Generate/refactor code and docs to reach minimum readiness.
    3. Prefer simple, explicit, well-documented solutions.
    4. Add or update a short `STATUS.md` summarizing what is implemented and what remains.
