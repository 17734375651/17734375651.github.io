# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Selected visual target

- User reconfirmed the latest Product Design option 3 on 2026-08-20.
- Source truth: `references/option-3-sme-workflow.png` (1487 × 1058).
- Direction: warm-paper light homepage with an ink-and-gold brand system, a real workflow visual in the hero, and an inset business-scenario explorer with `中小企业` selected by default.
- Preserve the layout hierarchy and density of the selected image while using the verified product/status/content manifests; never invent customer metrics, logos, awards, testimonials, or download availability.

## Current product and download decision

- User removed ERP from the public website on 2026-08-20. Do not restore ERP cards, routes, media, SEO text, content entries, or scenario recommendations.
- Keep the `中小企业` business scenario, but route unmatched workflows to the customization form rather than an ERP product.
- Every real public file must have a direct download action. As of 2026-08-21, `label`, `bleed`, and `pdf` each have verified public client releases, release-support files, and a separate demo ZIP. `label` and `pdf` expose Windows 10/11 x64 and Windows 7 x64 clients; their activation generators remain private and must never be published. Do not label a demo ZIP as a client installer.

## Product icon decision

- User confirmed on 2026-08-21 that every public software product card must use the icon from the `方寸有序胀色裁切.lnk` shortcut. Preserve the shortcut-referenced ICO byte-for-byte at `public/assets/brand/fangcun-software-icon.ico`, and use its embedded 256 × 256 PNG layer for web rendering.
- This shared software icon replaces only product-card software marks. Keep the site brand mark, favicon, seal, workflow icons, file-type icons, and functional controls unchanged.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
