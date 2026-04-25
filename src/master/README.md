# `src/master/` — Cochrane Master Builders Source of Truth

This folder is the **parent brand**. Every remixed trade site (drywall, roofing, plumbing, electrical, etc.) inherits from here.

## The rule

> **Edit it here once. It propagates to every remix.**

If a piece of brand, copy, persona, SEO list, or playbook applies to *more than one* trade site, it lives in `src/master/`. If it only applies to *this one* trade, it lives in `src/config/trade.config.ts`.

## Layout

```
src/master/
├── brand/
│   ├── identity.ts          ← parent-brand mission, voice, do/don't, master email
│   ├── style-guide.ts       ← master color/type/spacing rules (parent of trade.config palette)
│   ├── logo.svg             ← master CMB logo (used by AI logo generator as reference)
│   └── brand-docs.md        ← embedded business plan + brand bible (markdown)
│
├── personas/                ← 19 rewritten persona files, all in CMB voice
│
├── seo/
│   ├── service-areas.ts     ← 100+ areas (lat/lng, neighborhoods, schema)
│   ├── seo-playbook.md      ← per-page SEO best practices
│   └── backlink-network.ts  ← list of all sister sites, for cross-linking
│
├── playbooks/
│   ├── REMIX_PLAYBOOK.md    ← step-by-step remix guide (~20 min target)
│   ├── BRAND_AUDIT.md       ← how to verify a remix reflects CMB
│   ├── AI_IMAGE_RULES.md    ← no faces, no people, ultra-realistic, prompt patterns
│   ├── COPY_GUIDE.md        ← voice, story rules, words to avoid
│   ├── SEO_PLAYBOOK.md      ← per-page SEO checklist
│   └── PERFORMANCE_PLAYBOOK.md
│
├── trades.ts                ← taxonomy of every planned trade (slug, category, adjacencies)
├── checklist.ts             ← typed remix checklist (drives /remix dashboard UI)
└── VERSION.ts               ← semver of the master brand; remixes record what they forked from
```

## How a remix works

1. Click **Remix** in Lovable.
2. Open `src/config/trade.config.ts` — edit ~6 fields (name, trade slug, palette accent, services, optional contact override).
3. Open `/remix` route in the preview — click **Generate logo for this trade** (AI generates the wordmark from the master logo).
4. Walk the checklist on `/remix` until all items are green.
5. Deploy.

Total time target: **15–30 minutes per site**.

## What does NOT live here

- App data (bookings, emails) — that's the database.
- Trade-specific copy, services, palette accents — that's `src/config/trade.config.ts`.
- Per-site assets (hero images, before/afters) — that's `src/assets/`.
