## Goal

Turn `src/master/checklist.ts` into the **definitive remix roadmap** for every Masters sub-service site (Drywall, Roofing, Plumbing, Electrical, …). Each item is a *plan-able task* — descriptive enough that Lovable / Claude can read the item and generate a deep, in-depth implementation plan from it. No automated runners; this is a guided source-of-truth.

Outcome: when a remix is finished, walking this list end-to-end guarantees a fully bespoke, SEO-strong, conversion-tuned, legally-clean Masters site — never a re-skinned template.

## Structure

The checklist becomes **9 phases**, executed in order. Each item is tagged:
- **Tier**: `P0` (must ship), `P1` (should ship), `P2` (polish)
- **Owner**: `human` (taste, content, legal) or `ai-plan` (Lovable/Claude generates the plan & executes)
- **Playbook**: link to the deep-dive doc (existing or new) that the AI consults when generating the plan
- **Inputs needed**: the specific assets/info the operator must hand over before the AI can plan this item

### Phase 1 — Intake & Trade Foundation (P0)
Capture everything bespoke about THIS trade before touching code.
- Trade master brief uploaded (name, slug, category, founding story, USPs, pricing model, scope of work, what they refuse to do)
- Service catalogue uploaded (every service, sub-service, scope, typical price band, lead time, materials)
- Service-area master spreadsheet uploaded (every city/town/neighborhood served, with priority ranking)
- Sister-site backlink map confirmed (which other Masters sites link here, anchor-text plan)
- Trade-specific compliance docs collected (license #, WCB/insurance, certifications, warranty terms)
- Founder bio + real photos of *work* (no people) collected
- Competitor audit: 3 best-in-class sites for this trade, screenshots + what they do well
- Color/theme direction chosen (accent HSL, hero mood, photography palette) — overrides master defaults only where justified

### Phase 2 — Brand & Identity Bespoking (P0)
Every visible brand decision matched to THIS trade — no leftover drywall fingerprints.
- `trade.config.ts` fully edited (identity, contact, services, palette accent, SEO title/desc, voice arrays)
- Logo colorway chosen against this trade's hero/nav surfaces and verified at `/brand`
- Per-trade logo override generated *if* the master CMB lockup needs trade-specific sub-wordmark (e.g. "Cochrane Roofing")
- Favicon + PWA pack regenerated/verified for the chosen colorway
- Share pack (OG, Twitter, LinkedIn, IG, Profile) regenerated with trade name in the card
- Voice & tone document written for this trade (5 do's, 5 don'ts, sample paragraph)
- Zero leftover references scan: rg the repo for the previous trade's name, services, pricing, and city-specific quirks → all 0
- `/style-guide` walked: contrast matrix all-green on every accent

### Phase 3 — Information Architecture & Wireframes (P0)
Pages and structure designed for THIS trade before any copy is written.
- Sitemap drafted (home, services index, one page per service, areas index, one page per area cluster, about, story, process, gallery, FAQ, contact, legal pages)
- Wireframe per page approved (sketch or low-fi) — section order, hero pattern, trust block, CTA placement
- Navigation IA finalized (≤6 top items, mobile drawer order, footer columns)
- Booking funnel entry-point map (every CTA on every page → booking modal, pre-filled service if applicable)
- URL/slug map locked (clean, keyword-aware, no /page-2 patterns)

### Phase 4 — Copy & Storytelling (P0 / P1)
Every word bespoke. Zero paraphrasing between sister sites — Google penalizes it.
- Founder/origin story written from scratch (≥250 words, this trade's pain points, this trade's wins)
- Home hero copy (headline, sub, primary CTA) — bespoke, not template-mad-libs
- "Problems we solve" block (5–8 trade-specific homeowner pain points)
- "Why us" block (3–5 differentiators that are TRUE for this trade, with proof)
- Process/method copy (3–6 stage walkthrough specific to this trade's workflow)
- Per-service page copy: scope, what's included, what's not, materials, timeline, price band, FAQ × 5, CTA
- About page copy (team, values, license/insurance, warranty)
- FAQ master list (≥20 Q&A) — sourced from real customer questions for this trade
- Service-area page copy template + per-cluster intro paragraphs (no duplicate content across areas)
- Microcopy pass (form labels, button text, empty states, success states, 404)
- Legal copy: privacy policy, terms of service, cookie notice (if analytics), warranty terms
- Sales-copy pass (P1): every CTA scored against AIDA, every section against "so what?"

### Phase 5 — Visual Craft & AI Imagery (P0)
- Hero image set generated (3–5 candidates, picked one) — ultra-realistic, no faces, no people, trade-specific subject matter
- Service-page hero per service (one each)
- Process/method imagery (one per stage)
- Before/after pair per service (real if possible; AI if not, clearly marked)
- Ambient backdrop / parallax dividers per major section
- Gallery: ≥12 finished-work shots
- OG card hero swapped to trade-specific imagery
- Image weight audit: every image <300KB, served as WebP/AVIF where possible
- Alt-text pass: every image has descriptive alt, no `alt=""` except decorative
- Filename audit: no `image1.png` / `hero-final-FINAL.jpg` — all kebab-case descriptive

### Phase 6 — SEO Depth (P0 — this is the section that needs the most depth)
Plans generated here must be exhaustive — search is the moat.
- **Keyword research**: top 10 head terms + 30 long-tails per service, mapped to pages
- **Per-page SEO**: unique `<title>` (≤60 char), unique meta description (≤155 char), single H1, semantic H2/H3 outline
- **Canonical URLs** set on every page; trailing-slash policy consistent
- **JSON-LD schema** per page type:
  - Home: `Organization` + `LocalBusiness` + `WebSite` + `BreadcrumbList`
  - Service pages: `Service` + `BreadcrumbList` + `FAQPage`
  - Area pages: `LocalBusiness` (with `areaServed`) + `BreadcrumbList`
  - About: `AboutPage`
  - FAQ: `FAQPage`
- **Service-area pages**: every area from the master spreadsheet has its own page, unique intro, local landmarks/neighborhoods, embedded map, LocalBusiness schema with correct `areaServed`
- **Internal linking plan**: every service ↔ every relevant area, cross-link every service to 2 sibling services
- **Sister-site cross-linking**: footer + body widget per the master spreadsheet plan — agreed anchor text, not "click here"
- **External backlink targets**: 10 local directories (Yelp, Google Business, BBB, HomeStars, trade-specific dirs) — submission checklist
- **Sitemap.xml**: every page + every area page included, lastmod accurate, submitted to Google Search Console
- **robots.txt**: sane defaults, sitemap referenced
- **OG / Twitter cards** verified per-page (not just home)
- **Local SEO**: NAP (Name/Address/Phone) consistent across site + every directory; embedded Google Map on contact + area pages
- **Google Business Profile** claimed/verified with category, services, photos, hours
- **Search Console** + **Bing Webmaster** verified
- **Page-speed-as-SEO**: LCP <2.5s, INP <200ms, CLS <0.1 on mobile (this is also P0 for ranking)
- **E-E-A-T signals**: license #, insurance #, years in business, real address, real phone, founder bio with photo of WORK (not face), warranty page

### Phase 7 — Conversion, Forms & Booking (P0)
- Booking modal opens from every documented CTA (audit list)
- Form fields minimized to true must-haves; service pre-fills when launched from a service page
- Phone link (`tel:`) on every page, large tap target on mobile
- Email submission lands in master inbox tagged with `siteSlug`
- Success state copy bespoke and reassuring
- Spam protection (honeypot or hCaptcha) live
- Form analytics events fire on open / start / submit / success
- "Book in 60 seconds" promise honored (time the flow on real mobile)

### Phase 8 — Legal, Trust & Compliance (P0)
- Privacy policy reflects actual data collected and processors used (Lovable Cloud, analytics, email)
- Terms of service drafted for this trade's scope (warranty, change orders, payment terms)
- Cookie notice (if analytics or marketing pixels)
- License #, insurance #, WCB # rendered in footer + about page
- Real business address, real local phone (no virtual numbers if avoidable), business hours
- Warranty page with specifics (years, what's covered, what's not, claim process)
- Accessibility statement (WCAG AA target, contact for issues)

### Phase 9 — Quality Gate, Analytics & Launch (P0 / P1)
- WCAG AA pass: contrast, focus rings, alt text, keyboard nav, modal ARIA, `prefers-reduced-motion` respected
- Performance budget green on mobile + desktop (Lighthouse run + Real User Monitoring plan)
- Cross-browser smoke test (Safari iOS, Chrome Android, Safari macOS, Chrome desktop, Firefox desktop)
- 404 + 500 pages branded
- Analytics installed (events: page_view, cta_click, modal_open, form_submit, phone_tap)
- Conversion goal configured in analytics
- VeePo agency credit present (per existing memory)
- Master version pinned in `VERSION.ts`; this remix records what it forked from
- Add this site to `src/master/trades.ts` with live URL once deployed
- Sister-site widgets re-rendered across the network so backlinks go live everywhere
- Pre-launch human walkthrough: every page on real mobile, every CTA tapped, every form submitted
- Post-launch: submit sitemap to Search Console, request indexing on top 5 pages, monitor Core Web Vitals for 7 days

## Technical Implementation

Files to change:

1. **`src/master/checklist.ts`** — extend `CheckItem` with `tier`, `owner`, `phase`, `inputsNeeded`, `playbook` (already exists, expand enum). Bump `CheckId` enum to ~100+ ids. Add `CHECKLIST_PHASES` constant in execution order. Keep existing 30 ids so nothing in the codebase breaks.
2. **`src/master/checklist.ts`** — export helper `getChecklistByPhase()` and `getChecklistByTier()` so future UI / planner can consume.
3. **`src/master/playbooks/`** — add three new playbooks the new checklist points to:
   - `INTAKE_BRIEF.md` — what to collect from the trade owner before remix starts
   - `IA_WIREFRAME_GUIDE.md` — site IA patterns, page templates, navigation rules
   - `LEGAL_TRUST_GUIDE.md` — privacy, terms, warranty, license/insurance display rules
4. **`src/master/playbooks/SEO_PLAYBOOK.md`** — expand with the Phase-6 depth above (keyword research worksheet, per-page schema templates, area-page template, NAP audit checklist, GBP setup steps, internal linking matrix template).
5. **`src/master/playbooks/COPY_GUIDE.md`** — expand with the Phase-4 depth (origin-story prompt, FAQ-mining method, anti-paraphrase rule with examples).
6. **`src/master/README.md`** — add a "How the remix checklist works" section pointing to phases.
7. **`src/master/checklist.ts`** — add a header doc-comment explaining: "Each item is a plan-able task. Hand it to Lovable/Claude with the inputs listed and the linked playbook; the AI will produce an in-depth, executable plan."

No new routes, no dashboards, no runners. Pure typed source + markdown playbooks.

## What I will ask you mid-build (only if needed)

I'll only stop to ask if a specific phase needs a decision that isn't in the master spreadsheet you'll upload (e.g. "Do you want a separate `/process` page or fold it into `/about`?"). Otherwise I'll plan and embed.
