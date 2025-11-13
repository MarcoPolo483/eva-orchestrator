# ADR 0002: Tech Stack and Baseline Platform Decisions
Status: Accepted

- Backend: Node.js (TypeScript)
- IaC: Terraform
- Data: Cosmos DB, Azure AI Search, Blob, Redis
- Messaging: Service Bus
- UI: React + TS + Vite + Storybook + Tailwind
- i18n: en-US / fr-FR (ICU)
- Accessibility: WCAG 2.1 AA + enterprise i11y library
- LLM: Azure OpenAI (adapter abstraction)
- Safety: Azure AI Content Safety + eval harness
- Metering: Log Analytics + Power BI
- MCP: Servers for Azure, SharePoint/Graph, Search, Tools