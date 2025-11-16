# EVA 2.0 – High-Level Architecture Overview

## Vision

EVA 2.0 is ESDC’s **faceless AI platform** – a shared brain that exposes reusable services via APIs:

- RAG services (`/rag/retrieve`, `/rag/answer`)
- Document services (`/doc/summarize`, `/doc/compare`, `/doc/extract`, `/doc/translate`)
- Ingestion services (`/ingest/preview`, `/ingest/queue`, `/ingest/status`)
- Safety & policy services (`/safety/check`, `/safety/redact`, `/safety/explain`)
- Future agent routing (`/agent/route`, `/agent/tools`, `/agent/session`)

Multiple applications act as **faces** on top of EVA services:

- EVA Chat (general-purpose assistant)
- EVA Domain Assistant (EVA DA) – project-based RAG assistants (“Chat with your work data”)
- Jurisprudence Assistant, AssistMe-like assistants, KM Assistant, etc.
- EVA Mobile – a mobile client consuming the same APIs

All of this runs on **Azure** (Protected B), with:

- Azure OpenAI for LLMs
- Azure AI Search for semantic + vector search
- Azure API Management (APIM) for routing, security, metering and tool catalog
- Supporting services (Functions / Web Apps / Storage / DB / monitoring)

## EVA 1.x vs EVA 2.0

- EVA 1.x ≈ monolithic solution (e.g., PubSec Info Assistant style).
- EVA 2.0 = **modular, multi-repo architecture** where each `eva-*` repo has a clear role but plugs into the same trunk.

## Key Principles

- **Faceless core:** EVA Foundation is headless; UIs are separate consumers.
- **Reuse-first:** One trunk for EVA; projects plug in via configuration and project registry.
- **Governed by design:** PIA, AI review, monitoring, and cost attribution are first-class.
- **Multi-tenant:** Project spaces, RBAC, and cost-centre tagging per assistant.
- **Accessible & Bilingual:** WCAG 2.1 AA, EN/FR by default, theming and personalization.
- **Metadata-driven UI:** Screens, components, and assets defined as JSON and rendered by React (modern Siebel-style).
