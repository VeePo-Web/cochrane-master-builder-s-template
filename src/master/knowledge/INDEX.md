# Knowledge Index — Master Registry of Embedded Documents

This is the master index of every document embedded into the backend knowledge system.
AI assistants should consult this index first to find which source documents are relevant
to the current request, then read those source documents in full before making decisions.

**Status legend**
- `source-only` — embedded verbatim; partner interpretation document not yet written.
- `partnered`   — both source document and partner interpretation document exist.

---

## Governance (read first) (`governance/`)

Top-level meta documents that govern how every other source + partner document
is embedded, stored, and consulted. P0 — foundational.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/governance/knowledge-system-charter.source.md` | Markdown (verbatim DOCX) | partnered | Master charter: dual-layer rule, folder taxonomy, immutability, partner template, conflict rule, fantasy.co quality bar |

---

## Experience Prompts — Cross-Brand Personas (`experience-prompts/`)

Cross-brand expertise personas. Methodology brains that get applied through
the brand-specific layers below. P0 within their topical area.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/experience-prompts/seo-virtuoso-persona.source.md` | Markdown (verbatim DOCX) | partnered | 50-year SEO virtuoso persona + 15 core principles + "what not to do" checklist + GEO/AI-search methodology + 5-step working process |
| `source-documents/experience-prompts/seo-faq-optimization-persona.source.md` | Markdown (verbatim DOCX) | partnered | World-class SEO FAQ optimization playbook (8 principles + 10-section process + intent buckets + FAQPage JSON-LD rules + voice/local + performance + monitoring) |
| `source-documents/experience-prompts/master-design-persona-fantasy.source.md` | Markdown (verbatim DOCX) | partnered | Fantasy.co-level master design persona |
| ↳ `source-documents/experience-prompts/master-design-persona-fantasy.v2.source.md` | Markdown (verbatim DOCX) | partnered | v2 snapshot of `General_Design_Prompt-2.docx` — adds 3-pillar mission filter (Elevate Human Experience / Embody Brand Truth / Innovate Responsibly), 8-phase methodology, and 15-section "What Not To Do" boundaries report. Canonical v1 remains primary; v2 consulted in addition for methodology, ethics, and quality-bar QA. |
| ↳ `source-documents/experience-prompts/master-design-persona-fantasy.v3.source.md` | Markdown (verbatim DOCX) | provenance-only | v3 snapshot of `General_Design_Prompt-3.docx` — substantively identical to v2. Routing stays on v1 + v2 partners; this entry exists for audit trail only. |
| `source-documents/experience-prompts/anti-gravity-opening-engineer.source.md` | Markdown (verbatim DOCX) | partnered | Anti-gravity opening / cinematic intro engineer persona |
| ↳ `source-documents/experience-prompts/anti-gravity-opening-engineer.v2.source.md` | Markdown (verbatim DOCX) | partnered | v2 expanded snapshot from `GENERAL_ANTI_GRAVITY_OPENING_PROMPT-2.docx` — adds 3-pillar mission filter (Elevate / Embody / Innovate), 10-belief value system, 8-phase methodology, 15-section "What Not To Do" boundaries, hard React/Vite/TS/Tailwind frontend constraints, and the mandatory Strategic Input Phase + 6-step pre-code analysis with an Approval Gate. v1 partner remains primary for cinematic-opening choreography; v2 partner is consulted **in addition** for methodology, hygiene, anti-patterns, and pre-code intake. Masters / VeePo translation rules + firewalls (Hero Section Lock, Motion Philosophy, brand tokens, mobile constraints) live in the partner doc. |
| `source-documents/experience-prompts/mermaid-systems-mapping-mode.source.md` | Markdown (verbatim DOCX) | partnered | Mermaid Diagram + Systems Mapping Mode — Mapper agent in the 3-mode OS (Architect / Auditor / Mapper). Verbatim embed of `General_3._OS_and_Backend-Processes_Mermaid_Diagram_Systems_Mapping_Mode_PROMPT-2.docx`. Governs when to externalize systems as Mermaid (flowchart / sequenceDiagram / stateDiagram-v2 / erDiagram / journey / gantt), diagram-pack composition (Workflow / State / Portal / Admin Ops / Full System), naming discipline, exception + bug-revelation rules, paired-diagram comparison, 9-section output standard, and Architect↔Mapper↔Auditor handoff protocol. Backend-only intelligence layer; never renders in live UI by default. Masters / VeePo firewall (strip non-automotive vocabulary, honor locked memories: Booking Funnel / Modal Lifecycle / Loading Sequence / Hero Section Lock / Booking Submission Animation) lives in the partner doc. **Keywords:** mermaid, diagram, systems mapping, flowchart, state diagram, ER, sequence, journey, workflow, audit, architecture visualization, lifecycle, handoff, exception map. |

---

## Animations & Motion (`animations/`)

Function-scoped technical playbooks for motion, scroll mechanics, and performance-disciplined
animation. Brand-agnostic; brand personality is layered on via brand-specific motion memories
and partner docs.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/animations/premium-scroll-animation-persona.source.md` | Markdown (verbatim DOCX) | partnered | Master scroll-craftsperson persona + Lenis + GSAP playbook (config, ScrollTrigger integration triad, Igloo case study, 5-phase implementation plan, performance + accessibility rules) |

---

## Brand Identity — Cross-Brand Foundations (`brand-identity/`)

Cross-brand brand-identity / experience-philosophy methodology. Cochrane Master
Builders (and any brand-specific identity docs under `brands/<slug>/brand-identity/`)
always wins on aesthetics, palette, voice, and iconography. These cross-brand
sources govern *how* identity work is reasoned about (manifesto + behaviours,
recurring motif systems, narrative flow, scannable hierarchy, motion timing,
8-phase delivery cadence). Subject-matter content from any source whose primary
context is unrelated to the active brand is FIREWALLED — see partner docs.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brand-identity/brand-identity-architect.source.md` | Markdown (verbatim DOCX) | partnered | Brand Identity Architect persona — cross-brand identity-system authoring methodology |
| ↳ `source-documents/brand-identity/brand-identity-architect.v2.source.md` | Markdown (verbatim DOCX) | partnered | v2 expanded operating-system snapshot from `GENERAL_BRAND_IDENTITY_PROMPT-2.docx` — adds Brand Spine, Brand Truth Table, defensible-premium "proof mechanics", conflict-resolution hierarchy, taboo-language + visual anti-pattern guardrails, and the required 12-section "Brand Identity North Star — [Company]" deliverable format. v1 partner remains primary routing; v2 partner is consulted **in addition** for these deeper mechanics. Masters / VeePo translation rules + firewalls live in the partner doc. |
| `source-documents/brand-identity/colours-and-shapes-experience-philosophy.source.md` | Markdown (verbatim DOCX) | partnered | Colours & Shapes experience philosophy (v1) — cross-brand canonical reference for narrative-driven, story-led experience design |
| ↳ `source-documents/brand-identity/colours-and-shapes-experience-philosophy.v2.source.md` | Markdown (verbatim DOCX) | partnered (firewalled) | v2 — Christian-centered UI/UX playbook from `General_CHRISTIAN_Colours_and_shapes_PROMPT-2.docx`. **BACKEND-ONLY.** Partner doc extracts the transferable craft layer (manifesto + behaviours, recurring motif, narrative flow, 8-phase delivery, motion under 300 ms, accessibility/performance/security as trust) and **firewalls** all liturgical / scripture / iconography / persona content from front-end output. v1 remains primary routing; v2 consulted in addition for craft-layer prompts only. |
| ↳ `source-documents/brand-identity/colours-and-shapes-experience-philosophy.v3.source.md` | Markdown (verbatim DOCX) | partnered (provenance-only) | v3 — audit/provenance snapshot from `General_CHRISTIAN_Colours_and_shapes_PROMPT-3.docx`. **Substantively identical to v2.** Embedded for audit trail only. v3 partner explicitly forbids routing decisions here — all design/UX/brand prompts continue to route to v1 + v2. Same firewall as v2 applies. |

---

## Messaging — Copy, Narrative, Voice (`messaging/`)

Methodology brains for copywriting and brand storytelling. Govern wording only —
never visual design. Always paired with the active brand's voice/identity layer.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/messaging/round-two-copywrite-storytelling-persona.source.md` | Markdown (verbatim DOCX) | partnered | Master storyteller / brand strategist persona for page-by-page, section-by-section copy refinement (narrative backbone, voice & tone, emotional resonance, inclusive storytelling, advanced techniques, governance) — design strictly untouched |

---

## SEO — Image, Local & Sub-Specialty Personas (`seo/`)

Function-scoped SEO sub-specialty playbooks. The general SEO virtuoso and FAQ
SEO personas remain canonical under `experience-prompts/`; this shelf holds
deeper sub-specialty embeds (image SEO, local visibility, future: technical
SEO, programmatic SEO, etc.). All entries enforce the source's hard rule:
**do not change desktop design, layout, or visual hierarchy.**

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/seo/image-seo-local-visibility-persona.source.md` | Markdown (verbatim DOCX) | partnered | Image SEO + Local Visibility Specialist persona — page→section→image audit format, alt-text rules, filenames, formats/compression, responsive + lazy, ImageObject + image sitemap, CDN/caching, local schema + GBP, OG/Twitter, pitfalls, tooling, future trends, 14-step implementation framework |

---

## Navigation — Wayfinding & Sitewide Nav Systems (`navigation/`)

Function-scoped playbooks for navbars, footer-nav coherence, mobile menus,
dropdowns, breadcrumbs, ARIA, keyboard maps, and scroll-driven nav behaviour.
Binding rules from the source: **never write a "no changes needed" nav
plan**, **navigation must be sitewide consistent**, and **nav + footer must
read as one composition** (the "Easter egg" coincidence).

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/navigation/navigation-architect-persona.source.md` | Markdown (verbatim DOCX) | partnered | Navigation Architect persona — 8-step process (Discovery→IA→Responsive→Visual→Accessibility→Personalization→Testing→Documentation) + 10-step implementation plan + principles (Hick's/Fitts's/Serial Position) + patterns (mega/drop/hamburger/bottom/full-screen/sidebar/search) + 7 what-if concepts + tone & voice. Always-propose-a-refinement rule. Nav↔footer Easter-egg coherence. |
| ↳ `source-documents/navigation/navigation-architect-persona.v3.source.md` | Markdown (verbatim DOCX) | provenance-only | v3 snapshot of `-3.docx` upload — substantively identical to canonical v2. Routing stays on the v2 partner; this entry exists for audit trail only. |

---

## Footer — End-of-Scroll Surface & Nav Coherence (`footer/`)

Function-scoped playbooks for footer IA, signature brand moments, footer-only
SEO + LocalBusiness schema, governance/QA, and the binding "footer ↔ scrolled
navbar must read as one composition" mandate. Hard binding rule from the
source: **never alter anything outside the footer as a side-effect of footer
work** (no nav, copy, layout, tokens, or motion changes). Brand-specific
Cochrane Master Builders docs win on aesthetics/voice; these footer sources
win on structure, governance, and anti-pattern discipline.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/footer/footer-architect.source.md` | Markdown (verbatim DOCX) | partnered | Footer Architect persona (canonical v2) — bespoke footer craft, 4-discipline framing (brand / UX / perf / SEO), Lovable.dev workflow, jobs-to-be-done IA, signature brand moment, governance. Primary routing target. |
| ↳ `source-documents/footer/footer-architect.v3.source.md` | Markdown (verbatim DOCX) | partnered | v3 snapshot of `General_FOOTER_Prompt-3.docx`. Adds: Required 9-section Output (Objective Map → IA → Layout → Bespoke Brand Layer → Trust & Compliance → Footer-only SEO → Perf+a11y hardening → 15+ anti-patterns → QA Plan), Absolute Constraints, full "World-Class Custom Footers" reference report (sections 1–12 + future trends + 13 anti-patterns), and Final Directive scoping footer-first then nav-second as one bespoke composition. Consulted alongside v2 for structured deliverables, governance/QA gating, brand-moment scaffolding, and the footer↔scrolled-nav coherence mandate. |

---

## Performance & Speed (`performance/`)

Function-scoped technical playbooks for Core Web Vitals, asset/bundle/network
optimization, React 18 concurrency, and Vite-specific tuning. Hard binding
rule from the source: **never alter design, layout, motion, copy, or
hierarchy as a side-effect of performance work.** All perf moves must route
through the project's design memories (Hero Section Lock, Motion Philosophy,
Loading Sequence, Cloth Wipe, Parallax Coverage Specs, Booking Modal
Architecture, etc.) before shipping.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/performance/react-vite-performance-engineer-persona.source.md` | Markdown (verbatim DOCX) | partnered | World-class React 18 + Vite performance engineer persona — 11-section playbook (perf-first mindset, asset optimization, minify/compress/bundle, critical render path, network/protocols, caching, React concurrency + memoization + SSR/RSC, Vite-specific tuning, third-party hygiene, monitor/iterate, emerging trends) + binding "no design changes" rule. LCP ≤ 2.5s / INP ≤ 200ms / CLS < 0.1 targets. |

---

## Mobile & Responsive Wrapping (`mobile/`)

Function-scoped playbooks for mobile + tablet adaptation, breakpoints, touch
ergonomics, mobile navigation patterns, art-direction crops, and "One Web"
content prioritization. Hard binding rule from the source: **desktop design
is frozen — mobile work must never alter the desktop experience.** Every
mobile change is page-by-page, section-by-section, routes through the
project's design memories (Hero Section Lock, Booking Modal Architecture,
Mobile Optimization, Typography Legibility, Navigation Specs, etc.) and
pairs with the Performance Engineer partner doc.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/mobile/mobile-wrapping-responsive-persona.source.md` | Markdown (verbatim DOCX) | partnered | 50-year Fantasy/R-GA/Frog/ustwo/Huge responsive design visionary persona — One Web philosophy, content prioritization, mobile nav patterns, fluid type, art direction (srcset + sizes + AVIF/WebP), 4G perf budget, micro-interactions, breakpoint strategy (320–375 / 480–600 / 768–1024 / 1280+), container queries, WCAG, QA matrix + binding "desktop untouched" rule. |

---

## Cochrane Master Builders Corp. (`brands/cochrane-master-builders/`)

Brand slug: `cochrane-master-builders`
Brand context: Custom home builder / construction company. Cochrane, Alberta + Rocky View
County + Calgary CMA adjacency. Brand promise: *"Strong Foundations For Those Who Come
After Us."* Family-legacy / generational-craft positioning.

### Strategy

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/strategy/1.0_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report.pdf` | PDF | source-only | Top-level strategic business + SEO + UX report (v1.0) |
| `source-documents/brands/cochrane-master-builders/strategy/1.2_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report_1.pdf` | PDF | source-only | Strategic business + SEO + UX report (v1.2 iteration) |
| `source-documents/brands/cochrane-master-builders/strategy/1.3_Cochrane_Master_Builders_Backend_Strategy_Design_SEO_Legacy_Report_1.pdf` | PDF | source-only | Backend strategy / design / SEO / legacy report (v1.3) |

### SEO & Market Research

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/seo-research/1.1_Cochrane_Master_Builders_Market_Competitor_AI_SEO_Research_Report_1.md` | Markdown | source-only | Market + competitor + normal SEO + AI SEO research (v1.1) |

### Brand Identity

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/brand-identity/1.2.1_Cochrane_Master_Builders_Family_Legacy_Standard_1.pdf` | PDF | source-only | Family Legacy Standard (brand-identity v1.2.1) |
| `source-documents/brands/cochrane-master-builders/brand-identity/1.2.2_Cochrane_Master_Builders_Foundations_For_Generations_After_Us_Report.pdf` | PDF | source-only | "Foundations For Generations After Us" report (v1.2.2) |

### UX Design

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/ux-design/1.3.1_Cochrane_Master_Builders_Bespoke_Traditional_UX_Design_Phase_Report.docx` | DOCX | source-only | Bespoke / traditional UX design-phase report (v1.3.1) |

### Personas / ICP

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/personas-icp/1.4.1_Cochrane_Master_Builders_Subcontractor_ICP_UX_Report.docx` | DOCX | source-only | Subcontractor ICP + UX report (v1.4.1) |
| `source-documents/brands/cochrane-master-builders/personas-icp/1.4.2_Cochrane_Master_Builders_Mothers_ICP_UX_Report.docx` | DOCX | source-only | Mothers ICP + UX report (v1.4.2) |
| `source-documents/brands/cochrane-master-builders/personas-icp/1.4.3_Cochrane_Master_Builders_Grandfathers_ICP_UX_Report.pdf` | PDF | source-only | Grandfathers ICP + UX report (v1.4.3) |

---

## Cross-brand / Global

*(empty — placeholder category folders are ready under `source-documents/` for future
persona, experience-prompt, brand-identity, ui-ux, components, animations, navigation,
footer, forms, messaging, conversion, and strategy documents.)*
