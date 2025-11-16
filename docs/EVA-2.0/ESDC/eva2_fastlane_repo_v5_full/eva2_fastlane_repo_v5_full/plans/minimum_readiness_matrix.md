# Minimum Readiness Matrix for EVA 2.0 Fastlane Demo

## eva-orchestrator

**Priority for fastlane:** low

**Role:** High-level configuration & composition of EVA services (future).

**Minimum demo readiness:**
- README explaining vision and how orchestrator will route between services and agents.
- Example JSON/YAML showing a 'demo scenario' configuration.

## eva-infra

**Priority for fastlane:** medium

**Role:** Infrastructure-as-code and deployment patterns for EVA in Azure.

**Minimum demo readiness:**
- Documented manual deployment steps for the fastlane demo.
- Optional: minimal Bicep/Terraform template (single RG + web app + function).

## eva-utils

**Priority for fastlane:** low

**Role:** Shared utilities (logging helpers, config loaders, type helpers).

**Minimum demo readiness:**
- Small TypeScript utility module with logger + config helpers.
- Used by `eva-api` for logging demo calls.

## eva-core

**Priority for fastlane:** medium

**Role:** Core domain types and interfaces shared across backend and frontend.

**Minimum demo readiness:**
- Define TypeScript interfaces for ProjectConfig, Layout, ScreenTemplate, Asset, RagRequest, RagResponse.
- Export as small package used by `eva-api`, `eva-ui`, and `eva-mobile`.

## eva-auth

**Priority for fastlane:** low

**Role:** Authentication & authorization abstractions.

**Minimum demo readiness:**
- Stub `getCurrentUser()` returning a demo user with roles/claims.
- README explaining how real auth will plug in later.

## eva-agent

**Priority for fastlane:** low

**Role:** Agentic orchestration layer (Semantic Kernel / AutoGen, etc.).

**Minimum demo readiness:**
- README describing agent vision and an example pseudo-config for one agent.

## eva-openai

**Priority for fastlane:** medium

**Role:** Wrapper around Azure OpenAI APIs, with EVA-specific conventions.

**Minimum demo readiness:**
- Simple `callChatCompletion(prompt, options)` function using Azure OpenAI (or a mock).
- Config for endpoint/key/deployment.

## eva-rag

**Priority for fastlane:** medium

**Role:** RAG orchestration layer (combining search + LLM).

**Minimum demo readiness:**
- Interface `IRagService.answer(request: RagRequest): Promise<RagResponse>`.
- Demo implementation returning a mock answer based on projectId.

## eva-api

**Priority for fastlane:** high

**Role:** HTTP API surface for EVA services consumed by EVA UI and mobile.

**Minimum demo readiness:**
- Implement `/projects`, `/layouts/:pageId`, `/assets`, `/templates`, and `/rag/answer` endpoints as per `docs/api_eva_api_contract.md`.
- Wire `/rag/answer` to `eva-rag` mock and `eva-safety` check.
- Log usage via `eva-metering` helper.
- Run locally and deploy to Azure.

## eva-mcp

**Priority for fastlane:** low

**Role:** Model Context Protocol integration for EVA tools (future).

**Minimum demo readiness:**
- README explaining how EVA tools would be exposed via MCP and sample tool spec.

## eva-safety

**Priority for fastlane:** medium

**Role:** Centralized safety & policy checks (PII detection, content filters).

**Minimum demo readiness:**
- Implement `runSafetyCheck(text): SafetyResult` with simple SIN-like pattern detection.
- Integrate into `/rag/answer` path in `eva-api`.

## eva-metering

**Priority for fastlane:** medium

**Role:** Usage and cost metering support.

**Minimum demo readiness:**
- Implement `trackUsage(event)` logging projectId, endpoint, timestamp, and question length.
- Use it in `eva-api` `/rag/answer`.

## eva-ops

**Priority for fastlane:** low

**Role:** Operational tooling and dashboards.

**Minimum demo readiness:**
- README describing how logs from `eva-api` will be surfaced in monitoring.

## eva-ui

**Priority for fastlane:** critical

**Role:** EVA Domain Assistant 2.0 frontend (React/Vite/TS/Tailwind, metadata-driven).

**Minimum demo readiness:**
- Vite + React + TypeScript + Tailwind app running locally.
- Home screen rendered via `LayoutRenderer` using `home.layout.json` from `eva-seed`.
- Header with EVA Domain Assistant label and project dropdown (Canada Life, Jurisprudence, Admin).
- Dynamic theme based on selected project.
- EN/FR toggle using `eva-i18n`.
- Basic a11y: skip link, landmark roles, keyboard-friendly structure.
- Chat panel with messages, input, send, Clear chat, and suggested questions per project.
- Calls `/rag/answer` on backend with projectId + question.
- Uses asset catalog (e.g., hero_animated_eva) in at least one component.

## eva-i18n

**Priority for fastlane:** high

**Role:** Internationalization (EN/FR) support for all EVA UIs.

**Minimum demo readiness:**
- Setup of i18n library (e.g., react-i18next) with EN/FR namespaces.
- Helper hook used by `eva-ui` and `eva-mobile` to switch language.

## eva-i11y

**Priority for fastlane:** medium

**Role:** Accessibility support (components, hooks, patterns).

**Minimum demo readiness:**
- Provide `SkipLink` component and at least one focus management hook.
- Document ARIA role and keyboard navigation patterns.

## eva-seed

**Priority for fastlane:** high

**Role:** Seed data and configuration (projects, layouts, templates, assets, prompts).

**Minimum demo readiness:**
- Provide `projects.json` with at least Canada Life, Jurisprudence, Admin.
- Provide `layouts/home.layout.json` used by `eva-ui`.
- Provide `templates/screenTemplates.json` with `chat_landing_v1`.
- Provide `assets/assetCatalog.json` with a few example assets.
- Provide `sample_prompts.json` with 2–3 suggested questions per project.

## eva-enterprise

**Priority for fastlane:** low

**Role:** Enterprise alignment, governance, and integration patterns.

**Minimum demo readiness:**
- README linking fastlane demo to enterprise EVA vision and governance.

## eva-mobile

**Priority for fastlane:** medium

**Role:** Mobile client for EVA Domain Assistant (React Native + Expo).

**Minimum demo readiness:**
- React Native + Expo app bootstrapped with TypeScript.
- Single EVA DA screen with project selector, chat messages list, and text input.
- Calls `/rag/answer` with `{ question, projectId }`.
- Basic theming per project and EN/FR toggle.
