# EVA 2.0 Fastlane Demo Scope (Azure)

## Goal

Stand up a **minimal but convincing EVA 2.0 demo** in an Azure subscription that shows:

1. A working **EVA Domain Assistant 2.0 UI** (React/Vite/Tailwind):
   - Project dropdown (Canada Life, Jurisprudence, Admin)
   - Dynamic theming per project
   - EN/FR toggle
   - Basic accessibility (skip link, keyboard nav)
   - Chat panel with conversation, Clear chat, suggested questions

2. A simple **backend API** that responds to `/rag/answer` with either:
   - A call to Azure OpenAI (if available), OR
   - A deterministic mock answer

3. A **Project Seed / Registry** that:
   - Defines at least 3 projects with theme + i18n keys + API info
   - Drives the UI (switching project changes theme & text)

4. Minimal **safety & metering hooks**:
   - Log each `/rag/answer` call including projectId, timestamp, prompt length
   - Simple SIN-like pattern detection and redaction

5. (Stretch) **Mobile client (eva-mobile)** using React Native + Expo:
   - Single EVA DA screen hitting the same `/rag/answer` backend.

## Non-goals (for fastlane)

- Full ingestion pipeline
- Full RBAC and enterprise integration
- Full APIM configuration (a direct HTTPS endpoint is fine)
- Production-grade infra
