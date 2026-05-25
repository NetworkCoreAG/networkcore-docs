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
  favicon:  'img/favicon.svg',

  future: { v4: true },

  url:     'https://docs.networkcore.org',
  baseUrl: '/',

  organizationName: 'NetworkCoreAG',
  projectName:      'networkcore-docs',

  // 'warn' during scaffold; flip to 'throw' once content stabilises
  onBrokenLinks:         'warn',
  onBrokenMarkdownLinks: 'warn',

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
    [
      'redocusaurus',
      {
        specs: [
          {
            id:    'hub-api',
            spec:  'static/openapi.yaml',
            route: '/api-reference/',
          },
        ],
        theme: {
          primaryColor: '#1A3554',     // navy gradient endpoint — primary brand
        },
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

    // Attrus-style top nav — minimal, dark background, brand mark on the left,
    // role-targeted entry points + API ref + GitHub link on the right.
    navbar: {
      title: 'NetworkCore',
      logo: {
        alt:     'NetworkCore',
        src:     'img/logo-mark.png',
        srcDark: 'img/logo-mark.png',
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
          to:       '/api-reference/',
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
            { label: 'API Reference',   to: '/api-reference/' },
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
            { label: 'Marketing site',  href: 'https://www.networkcore.org' },
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
