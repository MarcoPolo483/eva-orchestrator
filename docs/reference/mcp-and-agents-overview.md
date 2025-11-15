# MCP & Agent Strategy Overview

Last updated: 2025-11-14

## What Is MCP?

- **Model Context Protocol (MCP)** provides a standard way for agents to call external tools (HTTP APIs, local scripts, cloud services) during a conversation.
- MCP servers expose capabilities ("tools") with well-defined schemas; any compliant agent runtime can discover and invoke them.
- In VS Code, MCP servers appear automatically to enabled agents, enabling repo-aware actions without custom hardcoding.

## Why MCP Matters for EVA

- **Composable Tooling**: We can bundle Azure, Git, documentation, and observability actions as MCP servers and mix/match per agent.
- **Runtime Portability**: The same agent logic works in VS Code, WSL2, or cloud environments as long as the MCP endpoints are reachable.
- **Security & Governance**: Each MCP server can enforce RBAC, logging, and secrets isolation, aligning with enterprise requirements.

## Agent Capabilities at Our Disposal

- **AI Toolkit Best-Practice Guides** (`aitk-get_agent_code_gen_best_practices`, `aitk-get_ai_model_guidance`, etc.) to design agents correctly from day one.
- **Evaluation & Tracing Hooks** (`aitk-evaluation_planner`, `aitk-evaluation_agent_runner_best_practices`, `aitk-get_tracing_code_gen_best_practices`) to ensure each agent ships with metrics, tests, and observability.
- **Existing EVA MCP Tooling Ideas**:
  - Cosmos DB administration for vector/memory stores.
  - Azure Resource Manager operations (deployments, policy checks).
  - Git and backlog management within EVA repositories.
  - Documentation search and summarization across `docs/` and legacy archives.

## How We Will Use MCP & Agents

1. **Design Phase**
   - Use AI Toolkit best-practice tools to capture agent goals, guardrails, and evaluation plans.
   - Generate architecture briefs that specify required MCP servers and memory strategies.
2. **Implementation Phase**
   - Register MCP servers (Azure, Git, documentation) in Azure Container Apps or local runtimes.
   - Build agent orchestrations that call MCP tools using the EVA session ledger for memory persistence.
   - Integrate tracing instrumentation so every tool call is auditable.
3. **Evaluation Phase**
   - Run automated evaluation suites (safety, correctness, latency) via AI Toolkit evaluation tools.
   - Store results in Application Insights/Power BI dashboards for stakeholders.
4. **Deployment & Operations**
   - Host agents and MCP servers in Azure (App Service, Container Apps) with managed identities to access enterprise resources.
   - Provide VS Code and web interfaces (EVA OS Companion) for daily use.
   - Offer export/import of agent configurations and memory for portability to WSL2 or on-prem environments.

## Immediate Opportunities

- Build an **EVA Agent Foundry** service (see backlog) that productizes this workflow for internal teams and external customers.
- Deliver curated MCP tool packs (Azure governance, documentation concierge, localization assistant) that can be turned on per agent.
- Create demos showcasing end-to-end agent lifecycle: design → deploy → evaluate → iterate, all within Azure.

## Next Steps

- Prioritize the EVA Agent Foundry backlog to establish the Azure reference deployment and MCP server catalog.
- Align portability workstreams so agents can sync memory between cloud and WSL2 setups.
- Draft marketplace messaging that highlights composability, observability, and portability as differentiators.
