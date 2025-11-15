# EVA 1.0 Knowledge Pack

Snapshot of the EVA DA 2.0 demo repo (`docs/EVA-2.0/eva-1.0 repo/`). Use this as the historical reference while we design EVA 2.0.

## Why It Matters
- Demonstrates the bilingual, project-aware assistant shipped as **EVA DA 2.0 Demo v0.75** (`eva-1.0 repo/README.md`).
- Provides concrete UI flows (Project Registry, App Admin) that inform EVA 2.0 user journeys.
- Includes integration stubs (mock APIM, RAG config, guardrail settings) we can adapt to new architecture work.

## Key Artifacts & Evidence
- `eva-1.0 repo/docs/APIM_CONTRACT.md` – REST contract for APIM façade.
- `eva-1.0 repo/docs/DEPLOY.md` – Production deployment choreography and prerequisites.
- `eva-1.0 repo/docs/ADMIN_TODO.md` – Roadmap plus Azure DevOps import CSV (`azure_devops_todos.csv`).
- `eva-1.0 repo/scripts/run-demo.ps1` – End-to-end demo launcher used in v0.75.
- `eva-1.0 repo/src/components/ProjectRegistry.tsx` – Reference implementation of the registry UI.
- `eva-1.0 repo/src/lib/config/appConfigStore.ts` – Example of client-side config persistence.

## How To Use
- During EVA 2.0 planning, cite relevant files in sprint plans or ADRs to ground decisions.
- When upgrading contracts, diff against `APIM_CONTRACT.md` to track breaking changes.
- For UX inspiration, capture screenshots or component notes and place them in the EVA 2.0 design docs.

## Next Actions
- Extract architectural lessons into `docs/EVA-2.0/architecture/` (TBD) before removing the raw repo copy.
- Promote legacy-specific content into the upcoming **“EVA 1.0 Book”** archive; keep EVA 2.0 docs focused on forward design.
