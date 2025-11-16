# UI Templates & Asset Catalog – Metadata-Driven EVA DA

This doc explains how EVA 2.0 supports:

- **Screen templates** – reusable page patterns
- **Layout metadata** – JSON describing sections and components
- **Asset catalogs** – reusable graphics/icons referenced by ID

These are implemented via:

- `eva-seed` – stores project config, layouts, templates, assets
- `eva-ui` – renders layouts + assets with React/Tailwind + a11y + i18n
- `eva-mobile` – can reuse the same metadata with a mobile renderer

## 1. Screen Templates

A **screen template** is a named pattern (e.g., “Chat landing – hero + quick actions + chat”) that points to:

- a base layout (`layoutRef`)
- which properties are meant to be customized (`editableProps`)

Example (`samples/eva-seed/templates/screenTemplates.json`):

```jsonc
{
  "version": "1.0",
  "templates": [
    {
      "templateId": "chat_landing_v1",
      "label": "Chat landing – hero + quick actions + chat",
      "description": "Standard EVA DA welcome screen with hero, quick actions, and chat panel.",
      "layoutRef": "layouts/home.layout.json",
      "allowedProjects": ["*"],
      "editableProps": [
        "hero.props.headlineKeyEn",
        "hero.props.headlineKeyFr",
        "hero.props.subtitleKeyEn",
        "hero.props.subtitleKeyFr",
        "quickActions.props.items"
      ]
    }
  ]
}
```

## 2. Layout Metadata

Layouts describe *what* appears on a page, not how it’s implemented in code.

Example (`samples/eva-seed/layouts/home.layout.json`):

- `HeroBanner`
- `QuickActionsGrid`
- `ChatPanel`

In `eva-ui`, `LayoutRenderer` takes this JSON and a component registry:

```tsx
<LayoutRenderer layout={homeLayout} components={{
  HeroBanner,
  QuickActionsGrid,
  ChatPanel
}} />
```

## 3. Asset Catalog

The asset catalog describes reusable icons/graphics:

```jsonc
{
  "version": "1.0",
  "assets": [
    {
      "assetId": "icon_jurisprudence_scales",
      "type": "svg",
      "path": "/assets/icons/scales.svg",
      "description": "Scales of justice icon."
    },
    {
      "assetId": "hero_animated_eva",
      "type": "gif",
      "path": "/assets/illustrations/eva-hero.gif",
      "description": "Animated EVA assistant."
    }
  ]
}
```

In `eva-ui`, a `Graphic` component maps `assetId` → `src` and alt text (via i18n). Components like `HeroBanner` receive `graphicAssetId` and render it.

## 4. Beyond Siebel

Compared to Siebel’s repository-driven UI, EVA:

- Uses open JSON + TypeScript interfaces
- Can render the same metadata on web and mobile
- Is AI-friendly: Copilot can reason over schemas and examples
- Bakes in a11y, EN/FR, theming, and safety from the start
