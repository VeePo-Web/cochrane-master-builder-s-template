## Plan — Embed "Mobile Wrapping & Responsive Design Visionary" persona

New function-scoped category: **Mobile & Responsive Wrapping**. Source is a Fantasy/R-GA/Frog/ustwo/Huge 50-year responsive-design persona (One Web, content prioritization, mobile nav patterns, fluid type, art direction, 4G perf budget, breakpoints, container queries, WCAG, QA). Closing directive is binding: **desktop design frozen — mobile is page-by-page, section-by-section.**

### Files to create

1. **`src/master/knowledge/source-documents/mobile/mobile-wrapping-responsive-persona.source.md`** — verbatim DOCX content + closing all-caps directive, frontmatter only.

2. **`src/master/knowledge/partner-documents/mobile/mobile-wrapping-responsive-persona.partner.md`** — Calem Wood interpretation layer:
   - **Hard binding rules**: desktop frozen (any shared component must be forked via responsive prefix or `useIsMobile`), One Web parity, page-by-page plans first, 48 px touch minimums, 4G perf default.
   - **Brand-specific guards** mapped to memories:
     - 390 px target, safe-area, 92 dvh full-screen panels, sticky booking-bar clearance.
     - Booking modal: singleton stays; mobile collapses to 540 px paper-form panel only (bone brand stack is `lg+` only); native camera trigger for photo step; auto-advance + dot indicator + seam preserved.
     - Hero: portrait `<picture>` swap under `(max-width: 768px)`; loading sequence, CW monogram, Ken Burns, interactive shine all preserved on mobile; parallax 130%/-15% retained with `prefers-reduced-motion` fallback.
     - Motion: cloth wipe full-bleed on mobile; logo parallax desktop-only; reduced-motion *simplifies, never removes*.
     - Typography: 13 px floor, 14–16 px body @ 1.7 line-height, `clamp()` for displays; footer sign-off `clamp(4rem, 12vw, 10rem)` curve preserved.
     - Navigation: 80 px desktop bar untouched; 64 px mobile bar + hamburger → 92 dvh full-screen panel; copper-fill active states; sticky thumb-zone Book CTA; no bottom nav.
     - Imagery: macro detailing crops re-tightened for mobile, no human imagery, no stock substitutions.
     - Visual rhythm: `py-48` → `py-24/28` mobile only; dividers 40–55vh → 24–32vh.
   - **Decision triggers**: mobile, tablet, responsive, breakpoint, viewport, hamburger, touch target, iPhone/Android, 390, safe area, thumb zone, art direction, container queries, fluid type, "looks bad on phone", "overflows on mobile".
   - **Conflict ladder**: binding rules → brand guards/memories → Performance Engineer partner → governance → generic persona. Generic suggestions that violate Hero Section Lock, Loading Sequence, Motion Philosophy, Booking Modal Architecture, or Mobile Optimization memories lose.
   - **Output discipline**: page→section inventory, per-section mobile spec, breakpoint table (≤390 / 391–600 / 601–1024 / 1025+), explicit desktop-impact audit, perf+accessibility checklist, QA matrix (390/430/iPad portrait+landscape).
   - **Practical examples** (4): hero on mobile, booking modal cramped, mobile nav build, sections too tall.
   - **Related docs**: Performance, Navigation, Animations, SEO Image, Master Design Persona, Governance.

3. **`src/master/knowledge/INDEX.md`** — append a new top-level category **Mobile & Responsive Wrapping** above the brand section, with one row pointing to the new source file and a one-line label summarizing the persona + binding rule.

### What will NOT change
- Front-end code (zero React/CSS/component edits).
- Any existing knowledge files (other than the INDEX append).
- `mem://index.md` — no new core rules; existing memories already cover the guardrails the partner doc references.
- Build/Vite/tooling config.

### Decision-routing after embed
Any future mobile/tablet/responsive prompt → consult this partner doc, which routes through the design memories and pairs with the Performance Engineer partner doc before any code is proposed. Desktop changes triggered by mobile work are forbidden.