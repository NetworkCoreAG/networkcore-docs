/**
 * NetworkCore Docs — Docusaurus configuration.
 *
 * Deploys to docs.networkcore.org via Vercel. Source of truth for the
 * OpenAPI spec is the hub repo (NetworkCoreAG/Platform/public/docs/openapi.yaml);
 * a copy is committed to static/openapi.yaml so the docs build is
 * self-contained. A future GitHub Action can keep them in sync.
 *
 * IA reflects the three audience clusters that matter today:
 *   - Charging Software (CPOs + CSMS) — push-side of OCPI
 *   - Distribution Partners            — pull-side of OCPI + driver APIs
 *   - Accounting integrations          — read-only finance feeds
 *
 * Layer 1 (Platform Concepts) lives at the top, vertical-free so future
 * verticals plug in beside "EV Charging" without restructuring.
 */

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title:    'NetworkCore Docs',
  tagline:  'OCPI 2.2.1 hub for CPOs, CSMS, and Distribution Partners',
  favicon:  'img/favicon-180.png',

  future: { v4: true },

  url:     'https://docs.networkcore.org',
  baseUrl: '/',

  organizationName: 'NetworkCoreAG',
  projectName:      'networkcore-docs',

  // 'warn' during scaffold; flip to 'throw' once content stabilises
  onBrokenLinks:         'warn',

  // Migrate the markdown-link config to the new nested form (Docusaurus 3.7+
  // moved this out of the top-level config; v4 will hard-remove the old shape).
  markdown: {
    // Mermaid renders sequence + flow diagrams inline. Used by the
    // /reference-architecture page (handshake, session lifecycle, settlement,
    // dispute).
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  // Docusaurus' built-in Mermaid theme module — needed alongside markdown.mermaid.
  themes: ['@docusaurus/theme-mermaid'],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  // Trailing slashes off — feels cleaner for shareable URLs (Stripe / Plaid pattern)
  trailingSlash: false,

  // ── Presets ───────────────────────────────────────────────────────────────
  // Redocusaurus is a *preset*, not a plugin — registered alongside classic.
  // It renders OpenAPI YAML as a Redoc-styled reference page (same renderer
  // Anthropic, Sentry, and many others use).
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath:    './sidebars.ts',
          routeBasePath:  '/',              // docs are the WHOLE site — no /docs/ prefix
          editUrl:        'https://github.com/NetworkCoreAG/networkcore-docs/edit/main/',
          showLastUpdateTime: true,
        },
        // We don't run a blog — the changelog lives as a doc, not a blog
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
    // Redocusaurus preset temporarily disabled — known marked.js incompat
    // when rendering certain markdown patterns in OpenAPI description fields.
    // For Phase 1 we ship a placeholder /api-reference page that links to
    // the raw spec; auto-render comes back once the spec descriptions are
    // cleaned up.
  ],

  // ── Plugins ───────────────────────────────────────────────────────────────
  plugins: [
    // Local full-text search — indexes at build time, served as static JSON,
    // no external service (no Algolia application waiting period). Adds a
    // search bar to the navbar and ⌘+K shortcut.
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed:                  true,    // cache-busts the index on each build
        indexBlog:               false,   // we don't have a blog
        indexPages:              true,    // index custom pages too
        docsRouteBasePath:       '/',     // matches presets.classic.docs.routeBasePath
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits:      8,
        explicitSearchResultPath: true,
      },
    ],
  ],

  // ── Theme ─────────────────────────────────────────────────────────────────
  themeConfig: {
    image: 'img/social-card.png',  // placeholder until a real OG image is added
    colorMode: {
      defaultMode:           'light',
      disableSwitch:         false,
      respectPrefersColorScheme: true,
    },

    // Attrus-style top nav — minimal, dark background, full wordmark on the
    // left (logo glyph + "NetworkCore" rendered as a single image so the
    // typography matches the brand exactly, not a web-font approximation).
    // `title` is intentionally omitted so we don't render text beside the image.
    navbar: {
      logo: {
        alt:     'NetworkCore',
        src:     'img/logo-wordmark.png',
        srcDark: 'img/logo-wordmark.png',
        href:    '/',
        target:  '_self',
        height:  '24px',
      },
      items: [
        {
          to:       '/ev-charging/charging-software',
          label:    'For CPOs & CSMS',
          position: 'left',
        },
        {
          to:       '/ev-charging/distribution-partners',
          label:    'For DPs',
          position: 'left',
        },
        {
          to:       '/ev-charging/accounting',
          label:    'For Accounting',
          position: 'left',
        },
        {
          to:       '/api-reference',
          label:    'API Reference',
          position: 'left',
        },
        {
          to:       '/changelog',
          label:    'Changelog',
          position: 'right',
        },
        {
          href:     'https://github.com/NetworkCoreAG/networkcore-docs',
          label:    'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/getting-started' },
            { label: 'API Reference',   to: '/api-reference' },
            { label: 'Webhooks',        to: '/webhooks' },
            { label: 'Sandbox',         to: '/sandbox' },
          ],
        },
        {
          title: 'Roles',
          items: [
            { label: 'CPOs & CSMS',           to: '/ev-charging/charging-software' },
            { label: 'Distribution Partners', to: '/ev-charging/distribution-partners' },
            { label: 'Accounting',            to: '/ev-charging/accounting' },
          ],
        },
        {
          title: 'NetworkCore',
          items: [
            { label: 'Website',         href: 'https://www.networkcore.org' },
            { label: 'Partner portal',  href: 'https://hub.networkcore.org/partner/ui/' },
            { label: 'Contact',         href: 'mailto:partner@networkcore.org' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} NetworkCore AG.`,
    },

    prism: {
      theme:     prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'http'],
    },

    // Algolia DocSearch comes later — free for OSS docs sites.
    // To enable: apply at https://docsearch.algolia.com/apply/
    // algolia: { appId: '...', apiKey: '...', indexName: 'networkcore-docs' },
  } satisfies Preset.ThemeConfig,
};

export default config;
