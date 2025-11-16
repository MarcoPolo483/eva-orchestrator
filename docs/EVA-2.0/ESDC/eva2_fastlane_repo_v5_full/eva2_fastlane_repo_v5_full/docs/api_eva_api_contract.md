# EVA API – Fastlane Demo HTTP Contract

This document specifies the **minimum API surface** for the EVA 2.0 fastlane demo.

Endpoints:

- `GET /projects`
- `GET /layouts/:pageId`
- `GET /assets`
- `GET /templates`
- `POST /rag/answer`

Types below are illustrative; in real code they live in `eva-core`.

## Type Shapes (TypeScript)

```ts
export interface ProjectConfig {
  projectId: string;
  name: string;
  description?: string;
  theme: {
    primaryColor: string;
    backgroundColor: string;
    headerTextColor: string;
  };
  i18n: {
    headlineKeyEn: string;
    headlineKeyFr: string;
    subtitleKeyEn: string;
    subtitleKeyFr: string;
  };
  api: {
    ragEndpoint: string;
    safetyProfile: string;
  };
}

export interface LayoutSection {
  id: string;
  type: string;
  props?: Record<string, any>;
}

export interface Layout {
  pageId: string;
  version?: string;
  sections: LayoutSection[];
}

export interface ScreenTemplate {
  templateId: string;
  label: string;
  description?: string;
  layoutRef: string;
  allowedProjects: string[];
  editableProps: string[];
}

export interface Asset {
  assetId: string;
  type: "svg" | "png" | "gif" | "jpeg" | "webp";
  path: string;
  description?: string;
}

export interface RagHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export interface RagRequest {
  question: string;
  projectId: string;
  history?: RagHistoryMessage[];
}

export interface RagAnswer {
  text: string;
  citations?: Array<{ sourceId: string; snippet?: string }>;
}

export interface SafetyResult {
  blocked: boolean;
  reason?: string;
  redactedText?: string;
}

export interface RagResponse {
  answer: RagAnswer;
  safety?: SafetyResult;
}
```

## GET /projects

Returns the list of EVA projects.

- **Path:** `/projects`
- **Method:** `GET`

Response 200:

```jsonc
{
  "projects": [ { /* ProjectConfig */ } ]
}
```

## GET /layouts/:pageId

Returns a layout JSON for a given page.

- **Path:** `/layouts/:pageId`
- **Method:** `GET`

Response 200: `Layout`.

## GET /assets

Returns the catalog of graphic assets.

- **Path:** `/assets`
- **Method:** `GET`

Response 200:

```jsonc
{
  "assets": [ { /* Asset */ } ]
}
```

## GET /templates

Returns the list of screen templates.

- **Path:** `/templates`
- **Method:** `GET`

Response 200:

```jsonc
{
  "templates": [ { /* ScreenTemplate */ } ]
}
```

## POST /rag/answer

Main RAG chat endpoint for EVA DA.

- **Path:** `/rag/answer`
- **Method:** `POST`
- **Body:** `RagRequest`
- **Response:** `RagResponse`

Typical pipeline:

1. Validate `RagRequest`.
2. Track usage (projectId, question length, timestamp).
3. Call RAG service (Azure OpenAI + search, or mock).
4. Run safety check.
5. Return `RagResponse`.
