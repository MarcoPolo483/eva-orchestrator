# EVA 2.0 Hub

> Central navigation for all EVA 2.0 repositories

## 🏗️ Infrastructure & Foundation

| # | Repository | Status | Description |
|---|------------|--------|-------------|
| 1 | [eva-infra](https://github.com/MarcoPolo483/eva-infra) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-infra) | Terraform landing zone, networking, Key Vault, APIM, monitoring |
| 2 | [eva-utils](https://github.com/MarcoPolo483/eva-utils) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-utils) | Config loader, logging, OpenTelemetry, retry/backoff helpers |

## ⚙️ Core Services

| # | Repository | Status | Description |
|---|------------|--------|-------------|
| 3 | [eva-core](https://github.com/MarcoPolo483/eva-core) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-core) | Domain model, orchestrators, provider SPI |
| 4 | [eva-auth](https://github.com/MarcoPolo483/eva-auth) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-auth) | Entra ID integration, role mapping, token validation |
| 5 | [eva-agent](https://github.com/MarcoPolo483/eva-agent) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-agent) | Planner/executor loop, tool registry, memory abstraction |

## 🧠 AI & Integration

| # | Repository | Status | Description |
|---|------------|--------|-------------|
| 6 | [eva-openai](https://github.com/MarcoPolo483/eva-openai) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-openai) | Azure OpenAI adapters, prompt versioning, content safety |
| 7 | [eva-rag](https://github.com/MarcoPolo483/eva-rag) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-rag) | Ingest, chunking, embeddings, hybrid search, citations |
| 8 | [eva-api](https://github.com/MarcoPolo483/eva-api) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-api) | REST/GraphQL + SSE/WebSockets, OpenAPI contract |
| 9 | [eva-mcp](https://github.com/MarcoPolo483/eva-mcp) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-mcp) | MCP client, Azure/SharePoint/Search servers |

## 🛡️ Operations & Governance

| # | Repository | Status | Description |
|---|------------|--------|-------------|
| 10 | [eva-safety](https://github.com/MarcoPolo483/eva-safety) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-safety) | Safety filters, moderation, injection defense, groundedness |
| 11 | [eva-metering](https://github.com/MarcoPolo483/eva-metering) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-metering) | Metering pipeline, pricing, cost calculation |
| 12 | [eva-ops](https://github.com/MarcoPolo483/eva-ops) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-ops) | Live Ops dashboard, quota management, audit logs |

## 🎨 User Experience

| # | Repository | Status | Description |
|---|------------|--------|-------------|
| 13 | [eva-ui](https://github.com/MarcoPolo483/eva-ui) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-ui) | Accessible chat interface, WCAG 2.1 AA compliance |
| 14 | [eva-i18n](https://github.com/MarcoPolo483/eva-i18n) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-i18n) | Catalog management (en-US, fr-FR), ICU formatting |
| 15 | [eva-i11y](https://github.com/MarcoPolo483/eva-i11y) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-i11y) | Enterprise accessibility library, audit CLI |

## 🚀 Deployment & Data

| # | Repository | Status | Description |
|---|------------|--------|-------------|
| 16 | [eva-seed](https://github.com/MarcoPolo483/eva-seed) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-seed) | Seed scripts, bilingual knowledge set |
| 17 | [eva-enterprise](https://github.com/MarcoPolo483/eva-enterprise) | ![Issues](https://img.shields.io/github/issues/MarcoPolo483/eva-enterprise) | Integration tests, version BOM, one-click deploy |

## 📋 Development Tools

| Repository | Description |
|------------|-------------|
| [eva-orchestrator](https://github.com/MarcoPolo483/eva-orchestrator) | EVA Agile Command hub: governance docs, workflows, scaffolding |

## 🧭 EVA Agile Command

- [Operating Model](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/AGILE-OPERATING-MODE.md) – roles, ceremonies, guardrails
- [Definition of Done](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/DEFINITION-OF-DONE.md) – quality gates for every increment
- [Sprint Zero Playbook](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/SPRINT-ZERO-PLAYBOOK.md) – readiness checklist before Sprint 1
- [Command Center Replication Guide](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/SPRINT-ZERO-PLAYBOOK.md#phase-4--team-enablement) – pattern for onboarding new EVA pods and apps
- [Sprint Kit](https://github.com/MarcoPolo483/eva-orchestrator/tree/main/docs/sprint-kit) – sprint plan template, ceremony notes, role runbooks
- [Sprint History](https://github.com/MarcoPolo483/eva-orchestrator/tree/main/docs/sprint-history) – archive completed sprint artifacts for audits
- [User Guide](https://github.com/MarcoPolo483/eva-orchestrator/tree/main/docs/user-guide) – PO/SM workflow walkthroughs and future onboarding docs

> The EVA Agile Command Center is designed to scale: clone these playbooks to spin up pods for any EVA project, then tailor guardrails via repo-specific workflows.

## 🎯 Quick Links

- [Master Plan](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/master-plan.md)
- [Architecture Decisions](https://github.com/MarcoPolo483/eva-orchestrator/tree/main/docs/adr)
- [VS Code Workspace](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/eva-2.0.code-workspace)
- [Client Preferences](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/client-preferences.md)
- [EVA 1.0 Knowledge Pack](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/EVA-2.0/eva-1.0%20goodies/README.md)
- [EVA OS Extension Backlog](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/EVA-2.0/backlog/eva-os-extension.md)
- [Portability & AI Pairing Backlog](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/EVA-2.0/backlog/portability-and-ai-pairing.md)
- [WSL2 + Claude Integration Backlog](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/EVA-2.0/backlog/wsl2-claude-integration.md)
- [EVA Agent Foundry Backlog](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/EVA-2.0/backlog/eva-agent-foundry.md)
- [MCP & Agent Strategy Overview](https://github.com/MarcoPolo483/eva-orchestrator/blob/main/docs/reference/mcp-and-agents-overview.md)

## 🔄 Development Sequence

Follow this order for implementation (from master-plan):

1. **eva-infra** → 2. **eva-utils** → 3. **eva-core** → 4. **eva-auth** → 5. **eva-agent** → 6. **eva-openai** → 7. **eva-rag** → 8. **eva-api** → 9. **eva-mcp** → 10. **eva-safety** → 11. **eva-metering** → 12. **eva-ops** → 13. **eva-ui** → 14. **eva-i18n** → 15. **eva-i11y** → 16. **eva-seed** → 17. **eva-enterprise**

## 📊 Global Success Criteria

- ✅ Coverage ≥80%
- ✅ P95 API latency <300ms
- ✅ WCAG 2.1 AA baseline
- ✅ en-US and fr-FR fully externalized
- ✅ Safety gates in CI (moderation, injection, groundedness)
- ✅ Metering accuracy with showback (Log Analytics + Power BI)
- ✅ OTel traces/logs/metrics to App Insights + Log Analytics
