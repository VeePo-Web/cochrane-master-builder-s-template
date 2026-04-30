# Embed the Navigation Architect Persona

## What this document is

11-page master persona for a half-century navigation systems architect (Fantasy / R/GA / Frog / ustwo / Huge lineage). Covers: philosophy, 8-step process (Discovery → IA → Responsive → Visual/Interaction → Accessibility → Personalization → Testing → Documentation), core principles & patterns (Hick's, Fitts's, Serial Position; mega menus, dropdowns, hamburger, bottom nav, full-screen, sidebars, search), 10-step implementation plan, 7 "what-if" concepts (story-driven mega menu, personalized quick-access, AR overlay, voice navigator, themed sidebar, gamification, accessibility wizard), tone/voice guidance, and final thoughts.

Original source contains wedding/piano context (and one stray `<mark>FANTASY.CO</mark>`), aspirational what-ifs (AR, voice nav, gamification), and a final operational hook authorizing a one-by-one element redesign. **Per user note**: "delete wedding stuff" only applies to the partner doc's adaptation — the source itself stays verbatim.

## Where it goes

A new `navigation/` shelf under both `source-documents/` and `partner-documents/`. Navigation is a function-scoped domain (like `messaging/`, `animations/`, `seo/`) — graduate it now since this is the first nav doc and more will follow.

```text
src/master/knowledge/
├── source-documents/
│   └── navigation/
│       └── navigation-architect-persona.source.md   ← NEW (verbatim)
└── partner-documents/
    └── navigation/
        └── navigation-architect-persona.partner.md  ← NEW (interpretation)
```

## Files to create (2) + 1 INDEX update

### 1. Source (verbatim)

- Frontmatter: `status: IMMUTABLE`, `verbatim: true`, `origin-file: GENERAL_PROMPT_for_NAV_BARS_AND_NAV_PAGES-2.docx`, `category: navigation`, `cross-cuts: ui-ux, accessibility, motion, footer, brand-identity, mobile`.
- DO-NOT-EDIT banner.
- Full 11 pages preserved, including: wedding/piano framing in opening paragraph, "VeePo"-irrelevant wedding callouts, citation tokens like `【365922652820293†L247-L333】`, `<mark>FANTASY.CO</mark>` artefact, mixed bullet styles (`*`, `-`, `1.`, `○`), trailing operational hook.

### 2. Partner doc (12-section template, fully Calem-Wood-mapped)

1. **Title** — Navigation Architect Persona — Bespoke Nav Systems & Sitewide Wayfinding.
2. **Category** — `navigation/`. Cross-cuts: `ui-ux`, `accessibility`, `motion`, `footer` (nav + footer must coincide), `brand-identity`, `messaging` (labels), `mobile`.
3. **Main purpose** — install a 50-year nav-systems architect as the **default brain** for every wayfinding decision: nav bar, mega menus, dropdowns, mobile nav, footer-nav coherence, breadcrumbs, in-page anchors, skip-links, scroll-driven nav behaviour, and the "Easter egg" coherence between nav and footer that the source explicitly calls for.
4. **What it influences** —
   - The 80px navbar (`mem://design/navigation-specs`) — items, ordering, hover shimmer, scroll behaviour, condensed state.
   - The footer (`mem://brand/footer-architecture`) — must echo nav so top + bottom feel like one composed page.
   - Mobile nav — drawer/full-screen panel choice, 92dvh height, safe-area, 48px touch targets (`mem://constraints/mobile-optimization`).
   - Booking-modal trigger placement and CTA wording in nav (singleton modal lifecycle — `mem://tech/modal-lifecycle-management`).
   - Active-state, hover shimmer (copper), focus ring, keyboard order, ARIA roles.
   - Mega menu / dropdown choice — for Calem Wood the IA is shallow (5–7 items max), so **default to no mega menu**; reserve for future service expansion.
   - Scroll-driven nav: hide-on-down / reveal-on-up, condensed state after first viewport, transparent → solid asphalt at scrollY > 80.
   - Breadcrumbs (only on deep service pages; never on home).
   - Skip-link, `<nav aria-label>`, focus management when modal opens.
   - Page-transition coherence with `mem://design/cloth-wipe-transition`.
   - Footer–nav "Easter egg" coherence: identical link sequence, mirrored typography, copper accents at matching positions, footer sign-off (`clamp(4-10rem)`) reads as the closing chord to the nav's opening note.
5. **Trigger prompts** —
   - "nav bar", "navbar", "navigation", "menu", "header"
   - "footer nav", "site map", "wayfinding"
   - "mega menu", "dropdown", "hamburger", "drawer", "mobile menu", "bottom nav"
   - "breadcrumbs", "active state", "hover state on nav"
   - "scroll behaviour for nav", "sticky nav", "condensed nav"
   - "nav accessibility", "skip link", "ARIA nav"
   - "nav labels", "nav copy", "rename nav items"
   - "nav CTA", "Book a detail in nav", "booking trigger"
   - "logo placement", "CW monogram in nav"
   - "site coherence top to bottom", "nav and footer relationship"
6. **Scope** —
   - **In scope**: navbar structure, item set, ordering, labels, hover/active/focus states, scroll behaviour, sticky/condensed transitions, mobile drawer/sheet, footer nav block, breadcrumbs, skip-link, ARIA, keyboard map, motion timing for nav transitions, nav-modal handoff.
   - **Out of scope**: hero animation, page content, booking funnel internals, brand monogram artwork (locked), the cloth-wipe transition (owned by its own memory).
7. **Output-quality direction** —
   - Use the source's structured 8-step + 10-step process when proposing a full nav rework.
   - For micro-edits: still apply Hick's / Fitts's / Serial Position checks.
   - **The user explicitly forbids "no changes needed" plans** (per source's trailing instruction). If asked to audit nav, always propose at least one bespoke refinement.
   - Sitewide consistency is a hard rule — any nav decision must apply to every page.
   - Nav and footer must read as one composition (see Easter-egg note).
   - Press-quality polish: copper shimmer (`mem://design/navigation-specs`), Space Grotesk display weight 300, 13–15px nav labels, 200ms ease-out transitions, no rounded shapes (`Core` rule).
8. **Brand & ICP relationship** —

   ### Calem Wood Detailing (current active brand)
   - **Style anchor**: dark luxury editorial (asphalt + copper), Space Grotesk light, no rounded cards (Core memory).
   - **Item sequence** (per `mem://design/navigation-specs`): strict, locked. Don't reorder without explicit approval.
   - **CTA**: filled copper "Book a detail" (no ghost buttons). Right-aligned. Triggers the singleton booking modal.
   - **Logo**: CW monogram (`mem://brand/identity`) — left-aligned, 8s rotation cycle preserved, `mem://design/micro-interactions/brand-logo-parallax` on desktop.
   - **Hover state**: copper shimmer left-to-right, 600ms ease, never underline, never colour-flip.
   - **Mobile**: full-screen panel (92dvh) with safe-area bottom padding, sticky-booking-bar clearance, 48px min touch targets. Hamburger top-right; CW monogram top-left.
   - **No mega menu** — Calem Wood IA is shallow (Home / Services / About / Booking). Reserve mega menu for future Cochrane Master Builders activation where IA depth justifies it.
   - **Footer coincidence (Easter egg)**: nav links mirrored at footer top tier. Footer sign-off "CALEM WOOD" in massive `clamp(4-10rem)` reads as closing chord. Copper hairline divider at footer top mirrors the navbar's bottom hairline at scroll. Same hover shimmer in footer link list.
   - **Scroll behaviour**: 80px tall always; asphalt opacity 0 at top, 0.92 at scrollY > 80, 200ms transition. No hide-on-scroll for Calem Wood (luxury brands don't disappear — the brand-mark must always be present).
   - **Page transitions**: nav stays mounted across the cloth wipe; only content swaps.
   - **Modal handoff** (`mem://tech/modal-lifecycle-management`): when booking modal opens from nav CTA, focus is trapped in modal; nav remains visible behind backdrop but `inert`.

   ### Cochrane Master Builders (when activated)
   - Different IA depth: Home / Custom Homes / Communities / Process / About / Journal / Contact → mega menu under "Custom Homes" and "Communities" justified.
   - Brand voice rotates from "automotive reverence" to "family legacy" — nav micro-copy ("Our Story" instead of "About"; "Where We Build" instead of "Communities").

9. **Global vs specific** —
   - **Global (methodology)** — 8-step process, 10-step implementation, principles (Hick's, Fitts's, Serial Position), accessibility, performance, micro-interaction discipline. Apply across every brand.
   - **Specific (content)** — item set, label voice, hover micro-interaction, CTA wording, footer-nav coherence, scroll behaviour, mega-menu use. Set by active brand memories.
   - **Hard floors**: (a) sitewide nav consistency; (b) no "no changes needed" plans; (c) for Calem Wood, never break `mem://design/navigation-specs` or `mem://brand/footer-architecture` without explicit user instruction; (d) booking modal must remain singleton.

10. **Adaptation notes (conflict rule applied — source preserved verbatim)** —

    | In source | Apply as |
    |-----------|----------|
    | Wedding / piano framing in opening paragraph | Methodology only — mood (bespoke, weighty, intentional) carries; subject (wedding, piano) does not. Calem Wood mood = automotive reverence + dark luxury editorial. |
    | "VeePo" / wedding-brand references in trailing instruction | Translate to active brand (currently Calem Wood). The "Easter egg coincidence between nav and footer" carries over and is the highest-value insight. |
    | `<mark>FANTASY.CO</mark>` artefact | Quality bar reference. Already governed by `experience-prompts/master-design-persona-fantasy`. |
    | Citation tokens `【...†L...】` | Paste artefacts. Do not "fix" the source. |
    | What-if #3 — Mixed Reality / AR navigation | Aspirational. Out of scope unless the user asks for an AR easter-egg. |
    | What-if #4 — Voice navigator | Out of scope; would conflict with quiet-luxury voice. |
    | What-if #5 — User-customisable themes | Out of scope; brand has one locked dark-editorial theme. |
    | What-if #6 — Gamification (badges, progress bars) | Out of scope; cheapens the brand. |
    | What-if #7 — Accessibility Wizard | Methodology valid (offer in-page accessibility prefs); execution would need careful integration without breaking quiet-luxury composition. Reserve for a deliberate request. |
    | What-if #1 — Story-driven mega menu | Aspirational; can be revisited if Cochrane Master Builders' Communities section justifies it. |
    | What-if #2 — Personalised quick-access bar | Out of scope for a brand-marketing site. |
    | "Hide on downward scroll, reveal on upward scroll" | **Overridden** for Calem Wood — luxury brand mark stays present. Methodology valid for app/utility contexts. |
    | "Bottom navigation bar with 3–5 destinations" | **Overridden** for Calem Wood — would clash with the sticky booking bar (`mem://constraints/mobile-optimization`). Mobile uses hamburger → full-screen panel instead. |
    | Trailing operational hook ("WORK ON THE DESIGN FOR THE TEACHING PIANO… NEVER ALLOWED TO MAKE A PLAN THAT SAYS NO CHANGES NEED TO BE MADE…") | **Knowledge-only** for the wedding/piano subject. The "always-propose-a-refinement" rule is preserved for Calem Wood: any nav audit must surface at least one bespoke improvement, scoped to one element at a time. |

11. **Dependencies / related documents** —

    **Always inherit**
    - `partner-documents/governance/knowledge-system-charter`

    **Co-consult (cross-domain)**
    - `partner-documents/experience-prompts/master-design-persona-fantasy` — taste check.
    - `partner-documents/experience-prompts/anti-gravity-opening-engineer` — first-paint choreography includes nav arrival.
    - `partner-documents/animations/premium-scroll-animation-persona` — sticky-nav + scroll-condense behaviour.
    - `partner-documents/messaging/round-two-copywrite-storytelling-persona` — nav label voice.
    - `partner-documents/seo/image-seo-local-visibility-persona` — logo SVG accessibility, nav image alts.

    **Calem Wood brand memories**
    - `mem://design/navigation-specs` — 80px navbar, copper shimmer, item sequence.
    - `mem://brand/footer-architecture` — 3-tier footer with `clamp(4-10rem)` sign-off.
    - `mem://design/component-styling` — filled copper CTA rule.
    - `mem://constraints/mobile-optimization` — 92dvh, safe-area, 48px touch targets.
    - `mem://brand/identity` — CW monogram.
    - `mem://design/micro-interactions/brand-logo-parallax` — desktop logo behaviour.
    - `mem://tech/modal-lifecycle-management` — nav CTA → singleton booking modal handoff.
    - `mem://design/cloth-wipe-transition` — page transition coherence.
    - `mem://design/aesthetic-direction` — overall taste.
    - `mem://constraints/typography-legibility` — 13–15px nav labels.
    - Core: no rounded cards, no ghost buttons, no human imagery.

    **Cochrane Master Builders** — when activated, brand-identity v1.2.x and ICP v1.4.x docs reshape nav micro-copy and mega-menu justification.

12. **Practical examples** —

    **A. "Audit the nav bar."** → Apply 8-step process. Output: list every nav element (logo, item set, hover state, active state, scroll state, mobile drawer, CTA, footer mirror). Propose at least one bespoke refinement (per the "never no-changes" rule). Honour `mem://design/navigation-specs`.

    **B. "Make nav and footer feel like one composition."** → Mirror item sequence + hover shimmer + copper hairline. Footer-top hairline echoes navbar-bottom hairline at scroll. Massive footer sign-off reads as the closing chord. Cite `mem://brand/footer-architecture` + `mem://design/navigation-specs` together.

    **C. "Add a Services dropdown."** → Calem Wood IA is shallow — push back on a dropdown unless service depth justifies it. If approved: dropdown opens on click (not hover, per source); 200ms ease-out; copper shimmer on each item; keyboard navigable; `aria-expanded` toggled; closes on Esc, outside-click, and route change.

    **D. "Mobile nav redesign."** → Hamburger top-right → full-screen panel at 92dvh with safe-area bottom padding. Item list left-aligned, Space Grotesk 19px, copper shimmer on tap. CTA "Book a detail" filled copper at bottom, above safe-area. CW monogram retained at top-left. Close icon top-right. Background: asphalt at 96% opacity with subtle copper hairline at top.

    **E. "Nav micro-interactions."** → Hover: copper shimmer left-to-right 600ms ease (`mem://design/navigation-specs`). Focus: 2px copper outline, 4px offset. Active: copper hairline under label, 1px, full width, 200ms ease-out. Scroll: navbar bg 0 → 0.92 asphalt at scrollY > 80, 200ms. Page transition: nav stays mounted (`mem://design/cloth-wipe-transition`).

    **F. "Voice search in nav."** → Push back. Conflicts with quiet-luxury voice. Document as future-aspirational only.

---

## Index update

Add a new top-level **Navigation** section in `INDEX.md` after **SEO**, with this row:

```
| `source-documents/navigation/navigation-architect-persona.source.md` | Markdown (verbatim DOCX) | partnered | Navigation Architect persona — 8-step process (Discovery→IA→Responsive→Visual→Accessibility→Personalization→Testing→Documentation) + 10-step implementation plan, principles (Hick's/Fitts's/Serial Position), patterns (mega/drop/hamburger/bottom/full-screen/sidebar/search), 7 what-if concepts, tone & voice. Always-propose-a-refinement rule. |
```

## Deliberately NOT changing

- **No frontend touched.**
- **No edits to existing source/partner files.**
- **No nav components edited, no `Nav.tsx` / `Footer.tsx` / `BookingModal.tsx` changes.**
- **No memories rewritten.**
- **No Supabase / package.json / config changes.**

## After this turn

Whenever any prompt asks about the navbar, mobile menu, dropdowns, footer-nav coherence, hover/active/scroll states for nav, breadcrumbs, ARIA for nav, the booking-CTA placement in nav, or sitewide wayfinding consistency, the system reads:

1. `governance/knowledge-system-charter`
2. `navigation/navigation-architect-persona` ← **this embed**
3. Calem Wood navigation + footer + modal-lifecycle memories
4. `experience-prompts/master-design-persona-fantasy` (taste check)
5. `messaging/round-two-copywrite-storytelling-persona` (label voice)

Result: every nav decision moves toward bespoke, weighty, sitewide-consistent, footer-coherent, accessibility-correct — and never a "no changes needed" verdict.
