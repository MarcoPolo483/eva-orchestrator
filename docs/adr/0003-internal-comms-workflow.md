# ADR 0003: Internal Scrum Communication Lives in Orchestrator Workflows
Status: Accepted

## Context
The EVA Agile Command team explored creating a dedicated "SM communications hub" repository to coordinate Scrum ceremonies and cross-team updates. The current orchestration repo already owns sprint governance assets (sprint kit, runbooks, workflows), and the upcoming metrics/dashboard work will surface team status.

## Decision
Keep Scrum Master communication and coordination assets inside `eva-orchestrator` instead of creating a new repository. Use the pinned communication issue plus GitHub Discussions (as needed) for team-wide updates, and rely on existing workflows/metrics for visibility.

## Consequences
- Pros:
  - Avoids spinning up and maintaining another repo/project
  - All agile governance artifacts remain in one place for easy onboarding
  - Workflows can be updated without cross-repo automation
- Cons:
  - Requires orchestrator repo to host both tooling and process documentation
  - Future expansion to external stakeholder channels may require revisiting the decision
