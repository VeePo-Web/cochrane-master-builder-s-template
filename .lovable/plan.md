## Goal

Turn this project into the **Cochrane Master Builders master template**: one canonical codebase you remix in Lovable for each new contracting trade (drywall, roofing, plumbing, electrical, etc. — ~100 sites), where every site looks, feels, and ranks like part of one parent brand.

Everything reusable lives **in the codebase** (not the database) so it travels automatically with every remix. The Supabase database stays focused on actual app data (bookings, emails) — same as today.

---

## What you get when this plan ships

1. A `master/` folder in the repo that holds every Cochrane Master Builders asset, persona, playbook, SEO list, and rule.
2. A single `trade.config.ts` you edit per remix — name, palette accents, services, contact email — and the whole site re-themes.
3. An AI-generated trade logo (PNG) wordmarked from the master Cochrane Master Builders mark, dropped into `/public/`.
4. A `/remix` admin route inside the site that shows the live remix checklist, brand audit, and "what's still drywall" warnings.
5. A persona library already rewritten in Cochrane Master Builders voice, ready for the AI to use on any new trade.
6. A shared 100-area service-area SEO module that auto-renders on every site.
7. A backlink-network config so every sister site cross-links for SEO.
8. All booking forms route to one shared master email address.

---

## Architecture

```text
src/
├── master/                          ← NEW — Cochrane Master Builders source of truth
│   ├── brand/
│   │   ├── identity.ts              parent-brand identity (mission, voice, do/don't)
│   │   ├── style-guide.ts           master color/type/spacing rules (parent of trade.config)
│   │   ├── logo.svg                 master CMB logo
│   │   └── brand-docs.md            uploaded business plan, brand bible (markdown)
│   ├── personas/                    rewritten versions of the 19 persona files for CMB
│   ├── seo/
│   │   ├── service-areas.ts         100+ areas (Cochrane, Calgary, Airdrie, Bragg Creek...)
│   │   ├── seo-playbook.md          per-page SEO best practices
│   │   └── backlink-network.ts      list of all sister sites for cross-linking
│   ├── playbooks/
│   │   ├── REMIX_PLAYBOOK.md        step-by-step remix guide
│   │   ├── BRAND_AUDIT.md           how to verify the site reflects CMB
│   │   ├── AI_IMAGE_RULES.md        no faces, no people, ultra-realistic
│   │   └── COPY_GUIDE.md            voice, story, words to avoid
│   └── checklist.ts                 typed remix checklist (drives /remix UI)
│
├── config/
│   └── trade.config.ts              ← the ONE file you edit per remix
│
└── pages/
    ├── ServiceAreas.tsx             auto-renders from master/seo/service-areas.ts
    └── Remix.tsx                    NEW — internal /remix dashboard (checklist + audits)

supabase/functions/
└── generate-trade-logo/             NEW — calls Lovable AI to render the trade-specific logo
```

---

## Phased build

### Phase 1 — Master folder scaffolding (no behavior change yet)
- Create `src/master/` with empty typed files for brand, style-guide, personas, seo, playbooks, checklist.
- Move existing `src/config/personas/*` → copy as starting points into `src/master/personas/` (keep originals for now to avoid breaking imports; we migrate in Phase 4).
- Add `src/master/README.md` explaining the layout and the "edit here once, inherits everywhere" rule.

### Phase 2 — Upload intake
You upload these to chat (one batch is fine):
- Cochrane Master Builders brand identity docs (PDF/DOCX)
- Business plan + website plan + spreadsheet
- Master logo (SVG preferred, PNG ok)
- Style guide doc
- Persona/personality prompts you want customized
- Service-area list (CSV or doc)
- SEO best-practices doc
- Brand audit checklist

I parse them with `document--parse_document` and embed the canonical content into `src/master/brand/brand-docs.md`, `src/master/brand/style-guide.ts`, `src/master/seo/service-areas.ts`, etc. Nothing goes to the database — pure code.

### Phase 3 — Trade-logo generator (AI)
- New edge function `generate-trade-logo` that calls Lovable AI image model (`google/gemini-3-pro-image-preview`) with:
  - Reference image: master CMB logo (sent as `image_url`)
  - Prompt: "Recreate this exact logo style, swap the wordmark to '<TRADE NAME>'. Same colors, weight, spacing, lockup. Keep identical mark. Transparent background, vector-clean."
- A `/remix` page button **"Generate logo for this trade"** runs it, previews the PNG, and saves to `public/logo.png` + `public/og-image.png`.
- One click per remix. No manual asset work.

### Phase 4 — `trade.config.ts` v2
Slim it down so a remix only touches:
- `identity.name`, `identity.shortName`, `identity.trade`
- `palette.accent` (one HSL — most colors stay master-bone/charcoal/forest)
- `services` array (name, slug, summary, range)
- `contact.email` (defaults to master CMB email if omitted)
- `seo.title` / `seo.description`

Everything else (typography, motion, base palette, voice, fear-dispel, persona references) inherits from `src/master/`.

### Phase 5 — Service-area SEO module
- `src/master/seo/service-areas.ts` exports a typed list: `{ slug, name, region, lat, lng, neighborhoods[], population, distanceFromCochrane }`.
- `src/pages/ServiceAreas.tsx` auto-renders an index + one SEO page per area (`/areas/calgary`, `/areas/airdrie`, …) with:
  - LocalBusiness JSON-LD per area
  - Trade-specific H1 ("Drywall in Airdrie")
  - Internal links to 5 nearby areas + 5 sister sites (from backlink-network.ts)
- Dropped into every remixed site automatically via routing in `App.tsx`.

### Phase 6 — Backlink network
- `src/master/seo/backlink-network.ts` is a flat list: `{ trade, url, anchor, blurb }`.
- A `<SisterSites />` component picks 5 most-relevant entries (by trade adjacency rules in code) and renders in the footer + on every service-area page.
- When you add a new remix, append one line — every other site picks it up on next deploy.

### Phase 7 — Booking → shared master email
- `trade.config.ts` defaults `contact.email` to `MASTER.email` from `src/master/brand/identity.ts`.
- The existing `send-transactional-email` flow stays; we just centralize the inbox + add the trade name to the subject line so you can triage 100 sites from one inbox.

### Phase 8 — `/remix` dashboard (internal page)
A non-public route (`/remix`, gated by a simple env-flag check) that shows:
- **Checklist** (typed in `src/master/checklist.ts`) with items: wireframe matches, palette swapped, copy unique, brand audit passed, AI images generated (no faces / no people / ultra-real), perf budget green, navigation lean, service is bespoke, sister-site backlinks present.
- **Live diffs**: scans the codebase for any leftover "Cochrane Drywall" / "drywall" / old palette HSL values not present in `master/` and lists them as warnings. (Pure client-side regex over imported config — no DB.)
- **One-click logo regenerate** (Phase 3 button).
- **Style-guide preview** (re-uses `/style-guide`).

### Phase 9 — Playbooks (markdown, in repo)
`src/master/playbooks/` holds:
- `REMIX_PLAYBOOK.md` — exact steps to remix in <30 min
- `BRAND_AUDIT.md` — how to verify CMB feel
- `AI_IMAGE_RULES.md` — no faces, no people, ultra-realistic, prompt patterns, model recommendations
- `COPY_GUIDE.md` — voice, story rules, words to avoid (inherits from `master/brand/identity.ts`)
- `SEO_PLAYBOOK.md` — per-page SEO checklist + how the area network ranks
- `PERFORMANCE_PLAYBOOK.md` — image sizes, lazy-load rules, Lighthouse budget

These are linked from the `/remix` dashboard so you read them in-app.

---

## Things I noticed missing from your list (item 10 and beyond)

Things worth adding now while we're designing the system:

10. **Per-trade Google Business Profile + schema config** — every site should ship with `LocalBusiness` JSON-LD that auto-generates from `trade.config.ts` (name, area, phone). Already partly there; we formalize.
11. **Robots.txt + sitemap.xml generators** that read from the service-area list so every remix has a complete sitemap on day one.
12. **Open Graph image auto-generation** (same edge function as the logo, different prompt) so every remix has a unique branded OG image.
13. **Analytics + lead-source tagging** — the booking payload should carry `siteSlug` so when 100 sites hit one inbox, you know which one converted.
14. **Honeypot + rate-limiting on the booking form** — when you have 100 public sites, spam multiplies. Easy add.
15. **A "trade taxonomy"** in `master/` (`trades.ts`) — defines all 100+ planned trades with slug, parent category, adjacent trades. The backlink-network and "related services" widgets read from this. One source of truth for what sites exist.
16. **Favicon + PWA icons auto-generated** from the trade logo PNG (same generator).
17. **Versioning the master** — `src/master/VERSION.ts` holds a semver. Each remix records which master version it was forked from in `trade.config.ts`, so you can see which sites are stale when CMB branding evolves.
18. **A `master/migrations/` folder** with markdown notes per master-version bump ("v2.0: new tagline, swap any site still on v1").
19. **Image-content guardrail** in `/remix` — scans `src/assets/` filenames + alt text for words like "person", "face", "team", "smiling" and flags them, enforcing your AI image rules.
20. **Reviews abstraction** — `master/brand/reviews.ts` holds the parent CMB Google reviews; each site can show parent-brand reviews + its own trade-specific ones for instant social proof on day one.

---

## What you do, what I do

**You upload (Phase 2):** brand docs, business plan, master logo, style guide, persona prompts, service area list, SEO doc, audit checklist.

**I do everything else:** parse them, embed into `master/`, build the generator, wire the `/remix` dashboard, write the playbooks, slim `trade.config.ts`, set up service-area routing, backlink network, shared booking inbox.

**Per-remix going forward (~15–30 min):** edit `trade.config.ts`, click "Generate logo" in `/remix`, run through the checklist, deploy.

---

## Order of execution once approved

1. Confirm Phase 1 scaffold and architecture
2. You upload all the docs (Phase 2)
3. I parse + embed everything into `src/master/`
4. Build trade-logo edge function + `/remix` dashboard
5. Slim `trade.config.ts` and migrate personas/style-guide to inherit from `master/`
6. Build service-area SEO module + sitemap/robots generators
7. Build backlink network + sister-sites component
8. Wire shared booking inbox + lead-source tagging
9. Write the playbooks
10. Run a full pass on this site as the "drywall remix" to prove the template works

Ready to start with Phase 1 scaffolding when you approve. Then upload your docs and I'll embed them.