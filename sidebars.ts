/**
 * NetworkCore Docs — sidebar configuration.
 *
 * Structured as three layers (per the Phase 1 IA discussion):
 *   Layer 1 — Platform Concepts (vertical-free)
 *   Layer 2 — EV Charging vertical (today's focus)
 *   Cross-cutting — Webhooks, Sandbox, Changelog
 *
 * Each top-level section uses an explicit `link` so clicking the category
 * header navigates to its index page (Stripe pattern). Section stub pages
 * exist for every entry so the navigation is fully shaped from day one.
 */

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Single sidebar for the whole docs site (most docs sites do this).
  // If we ever split into multi-instance (e.g. per-version), this becomes
  // multiple sidebars.
  main: [
    {
      type:  'doc',
      id:    'index',
      label: 'Welcome',
    },

    // ── Layer 1 — Platform Concepts ──────────────────────────────────────
    {
      type:  'category',
      label: 'Getting Started',
      link:  { type: 'doc', id: 'getting-started/index' },
      collapsed: false,
      items: [
        'getting-started/concepts',
        'getting-started/onboarding',
        'getting-started/account-security',
        'getting-started/auth',
        'getting-started/sandbox',
        'getting-started/errors',
        'getting-started/rate-limits',
        'getting-started/idempotency',
        'getting-started/pagination',
        'getting-started/versioning',
      ],
    },

    // ── Layer 2 — EV Charging vertical ───────────────────────────────────
    {
      type:  'category',
      label: 'EV Charging',
      link:  { type: 'doc', id: 'ev-charging/index' },
      collapsed: false,
      items: [
        // OCPI protocol discovery — applies to CPOs, CSMS, DPs, Hosts alike
        'ev-charging/discovery-endpoints',
        // Reference architecture — Mermaid sequence diagrams for the four
        // canonical flows (handshake, session lifecycle, settlement, dispute).
        'ev-charging/reference-architecture',
        // Interoperability statement — exactly what we implement of OCPI 2.2.1
        // (modules, roles, status codes, rate limits, extensions).
        'ev-charging/interoperability',
        // Charging software section — CPOs + CSMS share the same OCPI surface
        {
          type:  'category',
          label: 'For CPOs & CSMS',
          link:  { type: 'doc', id: 'ev-charging/charging-software/index' },
          items: [
            'ev-charging/charging-software/ocpi-integration',
            'ev-charging/charging-software/single-cpo-setup',
            'ev-charging/charging-software/multi-cpo-csms-setup',
            'ev-charging/charging-software/locations',
            'ev-charging/charging-software/sessions',
            'ev-charging/charging-software/cdrs',
            'ev-charging/charging-software/tariffs',
            'ev-charging/charging-software/commands',
            'ev-charging/charging-software/settlement',
            'ev-charging/charging-software/chargebacks',
          ],
        },
        // Private Hosts — operationally CPOs, commercially different
        {
          type:  'category',
          label: 'For Private Hosts',
          link:  { type: 'doc', id: 'ev-charging/private-hosts/index' },
          items: [],
        },
        // Distribution partners section — pull side
        {
          type:  'category',
          label: 'For Distribution Partners',
          link:  { type: 'doc', id: 'ev-charging/distribution-partners/index' },
          items: [
            'ev-charging/distribution-partners/handshake',
            'ev-charging/distribution-partners/locations',
            'ev-charging/distribution-partners/tokens',
            'ev-charging/distribution-partners/commands',
            'ev-charging/distribution-partners/risk-fingerprints',
            'ev-charging/distribution-partners/threeds-recommendation',
            'ev-charging/distribution-partners/driver-api',
            'ev-charging/distribution-partners/refunds-disputes',
            'ev-charging/distribution-partners/reconciliation',
          ],
        },
        // Accounting / finance integrations
        {
          type:  'category',
          label: 'For Accounting',
          link:  { type: 'doc', id: 'ev-charging/accounting/index' },
          items: [
            'ev-charging/accounting/invoices',
            'ev-charging/accounting/settlement-reports',
            'ev-charging/accounting/reconciliation',
            'ev-charging/accounting/exports',
          ],
        },
      ],
    },

    // ── Cross-cutting ────────────────────────────────────────────────────
    {
      type:  'doc',
      id:    'api-reference',
      label: 'API Reference',
    },

    {
      type:  'category',
      label: 'Webhooks',
      link:  { type: 'doc', id: 'webhooks/index' },
      items: [
        'webhooks/signatures',
        'webhooks/events',
        'webhooks/retries',
        'webhooks/inbound',
      ],
    },

    {
      type:  'category',
      label: 'Guides & Recipes',
      link:  { type: 'doc', id: 'guides/index' },
      items: [
        'guides/chargeback-evidence',
        'guides/risk-engine',
        'guides/first-loss-envelope',
        'guides/multi-currency-settlement',
        'guides/migrating-from-another-hub',
      ],
    },

    {
      type:  'doc',
      id:    'sandbox',
      label: 'Sandbox',
    },

    {
      type:  'doc',
      id:    'changelog',
      label: 'Changelog',
    },
  ],
};

export default sidebars;
