# ESDC Import Summary (2025-11-15)

## Quick Highlights
- Centralized the ESDC vision deck, EVA 2.0 fastlane briefing repo, and Marco profile export under `docs/EVA-2.0/ESDC/`.
- Fastlane pack ships architecture notes, readiness matrix, Copilot briefs, and runnable samples for `eva-api`, `eva-seed`, and `eva-ui`.
- Marco profile JSON corpus captures personal context, project dossiers, prompt patterns, and workflow templates for onboarding future assistants.
- Legacy EVA DA 2.0 demo (`eva-1.0 repo/` + book) retained for diffing; contains project registry UI, admin console, and mock APIM scripts.
- Multiple DOCX/PDF artifacts describe CDDs, governance playbooks, and environment provisioning scenarios—flagged for future Markdown conversion.

## Folder-by-Folder Digest

### Vision & Hub (`docs/EVA-2.0/ESDC`)
- `EVA-HUB.md`: GitHub-style index of all `eva-*` repos with responsibilities, plus agile command resources and quality gates.
- `Vision.txt`: December 2023 memo outlining EVA as omnichannel IVR/chat assistant with sentiment-aware handoff and analytics loops; enumerates 15+ assistant personas and supporting tech stack (Azure OpenAI, SharePoint, RPA, AI CoE ecosystem).
- Root DOCX/ZIP additions (`Claude chat.docx`, `EVA 2.0.docx`, `EVA Backlog.zip`, `marco_profile_repo_v2.zip`, etc.) now unpacked into the sections below; originals can be deleted after backup if desired.

### EVA Backlog Corpus (`docs/EVA-2.0/ESDC/EVA Backlog/`)
- **Core backlog (DOCX)**: CDD drafts covering API gateway, cost recovery, live ops, session-aware wrappers, scalable load testing, Model Context Protocol reference design, collaboration guides, microservice RA, and self-service accelerator program.
- **Environment provisioning**: Governance, sandbox enablement, lifecycle management, and trunk-based development playbooks.
- **Archive**: Historic roadmaps, capability evolution notes, PERRON-LOGIE PDF, and slide decks for sandbox kit and EVA DA evolution.
- Action: convert priority CDDs/playbooks to Markdown; tag each with owner + status before removing DOCX originals.

### EVA 1.0 Archives
- `eva-1.0 repo/`: React/Vite demo (v0.75) with project registry CRUD, AppAdmin UI, bilingual theming, mock APIM, and scripts (`run-demo.ps1`, `mock-apim.js`). Keep for code diffing until EVA 2.0 components are rebuilt.
- `eva-1.0 goodies/README.md`: Quick pointers to key contracts (`APIM_CONTRACT.md`, `DEPLOY.md`, `ADMIN_TODO.md`).
- `eva-1.0-book/`: Curated copy of the same artifacts plus Azure DevOps backlog CSV and canonical component sources (`ProjectRegistry.tsx`, `AppAdmin.tsx`). Use as authoritative "book" once raw repo is removed.

### EVA 2.0 Fastlane Demo Pack (`docs/EVA-2.0/ESDC/eva2_fastlane_repo_v5_full/`)
- **Docs**: `architecture_overview.md`, `fastlane_demo_scope.md`, `api_eva_api_contract.md`, `ui_templates_and_assets.md` (metadata-driven layouts, asset catalogs, reusable templates).
- **Plans**: `minimum_readiness_matrix.md` (per-repo DoD + priority) and `project_readiness_matrix.json` for scoring automation.
- **Copilot briefs**: One brief per `eva-*` repo (and `eva-mobile`), each with context, criticality, and tasks tailored for AI pair programming.
- **Samples**:
  - `eva-api/expressHandlers.ts` + `azureFunctionExample.ts`: Minimal `/projects`, `/layouts/:pageId`, `/assets`, `/templates`, `/rag/answer` endpoints with safety + metering stubs.
  - `eva-seed/`: Project registry JSON (Canada Life, Jurisprudence, Admin), layout metadata (`home.layout.json`), asset catalog, and sample prompts.
  - `eva-ui/`: `LayoutRenderer` component, theme map, and wiring notes for metadata-driven rendering and asset usage.
- **Changelog**: documents generation timestamp (2025-11-15) and scope for v5 release.
- Action: ingest briefs into repo READMEs, align EVA backlog tasks with readiness gaps, and use samples to bootstrap actual packages.

### Marco Profile Export (`docs/EVA-2.0/ESDC/marco_profile_repo_v2/`)
- `README.md`: Explains purpose (portable profile for other AIs) and JSON contents.
- `profile/` JSON sets:
  - Identity, preferences, values, lifestyle, and work style.
  - Professional & personal project dossiers with statuses and risks.
  - `eva_suite_2_0_architecture.json`: Detailed description of EVA components, service catalog, governance hooks, and APIM headers.
  - `prompts_playbook.json`: Reusable prompt templates (exec emails, PRDs, governance responses, bilingual content, personal letters, learning plans).
  - `workflow_templates.json`: Standardized structures for PRDs, work plans, RACI, RAIDE, etc.
  - `conversation_history_index.json`: Chapterized timeline of prior AI interactions (for memory bootstrapping).
- `meeting_summaries/meeting_summary_template.json`: Canonical schema for capturing decisions and actions.
- Action: load JSON into EVA memory store, update as context evolves, consider generating Markdown briefs for stakeholder consumption.

## Suggested Follow-Ups
- Prioritize DOCX → Markdown conversion for the CDD series, environment playbooks, and Vision memo to ease diffing and referencing.
- Decide whether to keep `docs/EVA-2.0/eva-1.0 repo/` as a submodule or migrate specific components into targeted `legacy/` samples.
- Feed `project_readiness_matrix.json` into orchestration scripts to automate readiness scoring across repos.
- Mirror `prompts_playbook.json` into the EVA agent memory so assistants can adopt Marco's communication patterns.
- Once summaries are confirmed, remove original ZIP/DOCX binaries from the repo (retain in SharePoint or external archive) to slim Git history.
