# Portability & AI Pairing Backlog

_Last updated: 2025-11-14_

## Vision Snapshot
- Ensure EVA’s conversational memory, workflows, and tooling can follow Marco across environments (VS Code, WSL2, GitHub Codespaces, local laptops) and across AI providers (Copilot, Claude, local LLMs).
- Highlight “portability” as a core capability: seamless migration of context, preferences, and historical knowledge between platforms.

## Drivers
- Interest in running EVA workflow locally via WSL2 while leveraging third-party AI subscriptions (e.g., Claude) alongside GitHub Copilot.
- Desire to reuse EVA Agile Dev Team patterns on unrelated projects without losing accumulated institutional memory.

## Initial Backlog
1. **Environment Inventory & Requirements**
   - Document current EVA stack dependencies (Node, Python, Terraform, Azure CLI, etc.) and assess WSL2 readiness.
   - Identify secrets management and credential flow when operating off the corporate GitHub environment.
2. **Memory Portability Framework**
   - Define export/import formats for session ledger, knowledge library, and preferences (e.g., JSON bundles, Markdown snapshots).
   - Prototype a "memory handoff" CLI that syncs context between GitHub-hosted storage and local filesystem or cloud storage.
3. **Multi-AI Provider Integration**
   - Evaluate API compatibility layers for Claude, GPT, and open-source models; draft abstraction for routing tasks across providers.
   - Design failover/selection logic (cost, latency, capability) and user controls for picking the assistant per task.
4. **Local Dev Enablement**
   - Create a WSL2 setup guide and scripts for provisioning EVA tooling locally (including optional Dockerized services).
   - Ensure VS Code extension + EVA Companion can operate offline with optional connections to remote AI services.
5. **Portability Feature Messaging**
   - Document differentiators (cross-environment continuity, AI provider flexibility) for future marketing and product pages.
   - Capture success metrics (time-to-setup on new machine, number of transferable threads) for roadmap tracking.

## Open Questions
- What storage backends are acceptable for personal vs. enterprise memory sync (OneDrive, Azure Blob, local encrypted store)?
- How do we maintain security/compliance when exporting organization-sensitive context to personal environments?
- Should portability be self-service or mediated by an orchestration service (e.g., EVA Cloud sync)?

## Next Review
- Revisit with the EVA OS extension discussion to align on shared session ledger and portability roadmap.
