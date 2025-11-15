# How to Run / Deploy EVA DA (Two Modes)

This repository supports two development/deployment modes:

- Local fake APIM (fast feedback loop) — good for UI and agent prototyping.
- Azure APIM → EVA Foundation (production path) — when you're ready to move to Azure.

## 1) Local Fake APIM (Recommended for Development)

**Prereqs:**

- Node.js and npm installed locally.

Start the mock APIM server and the frontend (PowerShell):

```powershell
# install dev deps (one time)
npm install

# start mock APIM + dev server (runs mock in background)
.\scripts\run-dev-mock.ps1
```

What this does:

- starts the mock APIM server at [http://localhost:5178](http://localhost:5178) by default. The mock enforces headers and logs to `scripts/mock-apim.log`.
- starts Vite dev server with `VITE_APIM_BASE_URL` pointing at the mock server so UI network calls go to the mock.

Logs:

- Mock server logs are appended to `scripts/mock-apim.log`. The mock also prints console logs to its process.

## 2) Azure APIM + EVA Foundation (Production)

High-level steps (manual / scripted):

1. Provision an Azure Function App or API backend which implements the contract described in `docs/APIM_CONTRACT.md`.
2. Provision Azure API Management (APIM) and create an API that fronts your backend. Apply APIM policies to enforce headers (`x-project`, `x-app`, `x-user`), add tracing headers, rate-limits, and logging.
3. Deploy your backend (model router + RAG agents) behind APIM. The backend should implement endpoints like:
   - `POST /rag/answer`
   - `POST /doc/summarize`
   - `POST /doc/compare`
4. Set your frontend to use the APIM base URL by setting `VITE_APIM_BASE_URL` before running or building. For example:

```powershell
$env:VITE_APIM_BASE_URL='https://my-apim.azure.net'; npm run build
```

**Security & governance notes:**

- APIM policies should validate `x-project`, `x-user` and inject `x-request-id`.
- Keep any secrets (keys) out of client code; use server-side connectors for model providers.

## Repository Scripts

- `npm run mock-apim` — starts the mock APIM server (requires express + body-parser installed).
- `scripts/run-dev-mock.ps1` — PowerShell helper that starts the mock and the dev server together.

## Further Automation

If you want, this can be extended with a PowerShell deploy script (`scripts/deploy-azure.ps1`) that:

- runs `az` CLI to create resource groups/APIM/function app,
- deploys code to the Function App,
- configures APIM policies to forward requests to the Function App.
