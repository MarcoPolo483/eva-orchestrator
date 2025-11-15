# EVA Agent Foundry Backlog

_Last updated: 2025-11-14_

## Vision Snapshot

- Package EVA’s agent-building know-how into a reusable service that helps teams design, deploy, and evaluate AI copilots backed by MCP toolchains.
- Deliver a marketplace-ready “EVA Agent Foundry” (cloud-first on Azure) with optional VS Code companion so customers can assemble their own EVA-like assistants quickly.

## Key Pillars

- **Design Assistants**: Guided wizards (powered by AI Toolkit best-practice tools) to define memory strategy, toolsets, evaluation plans, and compliance guardrails.
- **Tool Orchestration**: Curated MCP tool packs (Azure, Git, documentation, observability) with a framework for registering custom tools per tenant.
- **Deployment on Azure**: Managed runtime using Azure App Service / Container Apps, Cosmos DB (session store), Azure Storage (artifacts), Application Insights (telemetry).
- **Evaluation & Observability**: Built-in evaluation runners, tracing dashboards, and exportable compliance reports.
- **Portability Hooks**: Export/import flows so agents and their memory can move between cloud, WSL2, or on-prem deployments.

## Initial Backlog

1. **Product Discovery & Personas**
   - Map target users (EVA internal teams, enterprise customers, open-source adopters).
   - Identify required compliance features (data residency, RBAC, audit logging).
2. **MCP Platform Architecture**
   - Define baseline MCP servers (Azure Resource Manager, Cosmos DB admin, Git operations, documentation search).
   - Draft reference topology for hosting MCP servers in Azure Container Apps with managed identity.
3. **Agent Blueprint Wizard**
   - Integrate AI Toolkit best-practice tools to auto-generate design briefs, evaluation checklists, and tracing requirements.
   - Prototype conversational UI that walks users through defining goals, tools, memory, and evaluation metrics.
4. **Session Ledger & Memory Store**
   - Implement Cosmos DB (HPK) schema for multi-tenant agent memory, summaries, and artifacts.
   - Add export/import endpoints for portability to local environments.
5. **Evaluation Pipeline**
   - Wire up Azure Functions or Container Apps jobs to run automated evaluations using `aitk-evaluation_*` tools.
   - Produce dashboards in Application Insights/Power BI for pass/fail, latency, and safety metrics.
6. **VS Code Companion Extension**
   - Create extension that discovers registered agents, initiates conversations, and surfaces evaluation status inside VS Code.
   - Support offline mode with local MCP servers (align with WSL2 portability backlog).
7. **Marketplace Packaging**
   - Prepare offer for Azure Marketplace / GitHub Marketplace, including pricing tiers, onboarding scripts, and compliance documentation.
8. **Demo Environment**
   - Stand up an Azure demo subscription with sample agents and MCP tools; provide scripted walkthroughs for stakeholders.

## Inspirational Use Cases

- "Spin up a compliance reviewer agent" that inspects Terraform changes using Azure Policy MCP tools.
- "Launch a documentation concierge" that walks new hires through EVA playbooks using RAG and backlog interactions.
- "Create a localization assistant" combining i18n repositories, translation APIs, and evaluation gates for phrasing and tone.

## Dependencies & Links

- Portability & AI Pairing Backlog (memory export/import).
- WSL2 + Claude Integration Backlog (offline/alternative AI provider support).
- EVA OS Extension Backlog (shared session ledger and UI patterns).

## Open Questions

- Which MCP servers must be bundled vs. optional marketplace add-ons?
- How do we handle tenant isolation when multiple agents share the same Azure environment?
- What licensing model fits best (subscription per agent, seat-based, consumption)?

## Next Review

- Run an architecture workshop to draft the Azure reference deployment and prioritize MVP scope.
