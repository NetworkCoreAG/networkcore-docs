# NetworkCore Docs

Public developer documentation for the NetworkCore Hub, hosted at
**[docs.networkcore.org](https://docs.networkcore.org)**.

NetworkCore is a clearing + settlement platform that ships EV charging as
its first vertical via a spec-compliant **OCPI 2.2.1** hub. These docs are
for developers integrating against the hub — CPOs, CSMS, Distribution
Partners, and accounting / finance systems.

## What's where

- [`docs/`](docs/) — every page in the site, as MDX
- [`sidebars.ts`](sidebars.ts) — navigation structure
- [`docusaurus.config.ts`](docusaurus.config.ts) — site config (brand, plugins, navbar)
- [`src/css/custom.css`](src/css/custom.css) — design tokens mapped from the hub's `/shared/tokens.css`
- [`static/openapi.yaml`](static/openapi.yaml) — OpenAPI 3.0 spec (synced from the hub repo)
- [`static/img/`](static/img/) — favicon + brand mark (synced from the hub repo)

## Local development

```bash
npm install
npm start        # local dev server on http://localhost:3000
npm run build    # static build into /build
npm run serve    # serve the built /build locally
```

The dev server hot-reloads on file save. Most page edits are MDX (Markdown
with React components), so the editing experience is just writing prose.

## Contributing

Found something wrong, unclear, or out of date?

- **Open an issue** — fastest if it's a question or a bug report
- **Open a PR** — every page has an "Edit this page" link that jumps you straight to the source on GitHub

External contributions welcome. The site is intentionally public so
partner devs can fix mistakes they notice while integrating.

## Deployment

The site auto-deploys to Vercel on every push to `main`. Production lives at
`docs.networkcore.org` (mapped via Vercel custom domain, DNS at IONOS).

## Source of truth

The OpenAPI spec (`static/openapi.yaml`) is **synced from** the hub repo
(`NetworkCoreAG/Platform/public/docs/openapi.yaml`). Don't edit it here —
change it in the hub repo and re-sync.

A future GitHub Action will automate that sync. For now it's a manual
`cp` whenever the hub spec changes.

## License

Docs content: © NetworkCore AG. Code samples in the docs are CC0 — copy them
freely into your integration.
