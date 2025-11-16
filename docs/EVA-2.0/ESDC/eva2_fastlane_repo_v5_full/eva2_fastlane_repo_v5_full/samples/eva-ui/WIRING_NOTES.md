# EVA UI Sample Wiring Notes

These samples show how to hook `eva-seed` config, layouts, templates, and assets into `eva-ui`.

1. Use `projects.json` from `samples/eva-seed` as the starting shape for the project registry.
2. Use `layouts/home.layout.json` with `LayoutRenderer` and a component registry.
3. Use `themeExamples.ts` or derive theme from project config.
4. Implement a `Graphic` component that maps `assetId` to real asset paths using `assetCatalog.json`.
5. Build a home page that:
   - Wraps the content in an AppShell using theme.
   - Renders the `eva_da_home` layout via `LayoutRenderer`.
   - Wires the chat panel to `/rag/answer`.
