# WSL2 + Claude Integration Backlog

_Last updated: 2025-11-14_

## Objective
- Stand up a fully local developer cockpit (WSL2 + VS Code or terminal) that uses Claude for AI assistance while preserving EVA’s conversational memory and workflows.
- Offer a migration path off hosted Copilot/ChatGPT without losing productivity or historical context.

## Current Questions from Marco
- “Can I replicate today’s GitHub + VS Code + Copilot flow using WSL2, Claude, and a self-hosted Git alternative?”
- “How do I transfer EVA’s accumulated memory into this new environment and keep it in sync?”

## Capability Assessment (Initial Findings)
- **WSL2**: Supports Ubuntu/Debian environments with full dev toolchains; VS Code Remote WSL provides editor parity.
- **Claude**: Claude.ai web UI available via subscription; API access requires Anthropic keys and rate limits; no official VS Code plugin yet.
- **Local Git Alternatives**: Gitea, GitLab CE, or bare Git server can replace GitHub; Codespaces features (Actions, Packages) would need substitutes (e.g., Woodpecker CI, Jenkins, self-hosted runners).
- **Memory Portability**: Requires export/import of EVA session ledger plus background knowledge into portable storage (encrypted JSON/SQLite) that both platforms can read.

## Backlog Items
1. **Environment Blueprint**
   - Document WSL2 base images, package installs, and automation scripts (e.g., `setup-eva-wsl.ps1`).
   - Validate GPU/compute requirements for local LLM fallbacks if Claude is unavailable.
2. **Claude API Integration**
   - Build a lightweight CLI/daemon that proxies Anthropic API calls for IDEs or terminal workflows.
   - Explore open-source VS Code extensions (e.g., Continue, Cursor) that can route to Claude via custom endpoints.
3. **Memory Bridge**
   - Define a portable session ledger format (SQLite/JSON) and encryption strategy.
   - Implement sync tooling to export from GitHub-hosted EVA memory and import into local store; schedule bidirectional sync jobs.
4. **Local Repository Hosting**
   - Evaluate Gitea vs. GitLab CE setup on WSL2/Windows; map feature gaps vs. GitHub (issues, Actions, PR workflows).
   - Draft migration guides for mirroring existing repos and preserving commit history.
5. **Workflow Parity**
   - Recreate key EVA rituals (backlog updates, sprint automation, doc generation) with local tooling (Makefiles, Taskfile, or Git hooks).
   - Identify services that still require cloud dependencies (Azure, OpenAI) and specify how to tunnel or mock them locally.
6. **Security & Compliance**
   - Determine secret storage (1Password CLI, Azure Key Vault via CLI, local .env with vault) for Claude keys and EVA credentials.
   - Assess data residency implications when exporting EVA memory off corporate systems.

## Open Issues
- Does the Anthropic API usage under a $30 Claude plan permit automated tooling, or is enterprise access required?
- What is the acceptable latency/cost trade-off vs. Copilot when running through the API?
- How will collaborative features (PR reviews, team chat) translate if teammates remain on GitHub?

## Next Checkpoint
- Review findings after confirming Claude API feasibility and selecting a local Git platform; then prioritize build tasks.
