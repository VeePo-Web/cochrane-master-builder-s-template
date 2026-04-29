# Embed the Premium Scroll Animation Persona (Lenis + GSAP playbook)

## What this document is

A 14-page persona + technical playbook for **fantasy.co / igloo.inc-grade smooth-scroll experiences** built on Lenis + GSAP ScrollTrigger. Contents:

- **Master craftsperson persona** with formative years at Fantasy.co, Igloo Inc, Pentagram, IDEO, AKQA, Huge, Wolff Olins, B-Reel, MetaDesign, Work & Co
- **Why premium scrolling matters** + scroll-fade research (Nielsen Norman, Designmodo)
- **Performance principles** — 60fps / 16.7ms budget, transform/opacity only, rAF discipline
- **Lenis library deep-dive** — install, basic setup, GSAP ScrollTrigger integration code, full configuration option list (wrapper, content, smoothWheel, lerp, duration, easing, orientation, syncTouch, wheelMultiplier, touchMultiplier, infinite, autoResize, prevent, virtualScroll, overscroll, autoRaf, anchors, autoToggle, allowNestedScroll, naiveDimensions, stopInertiaOnNavigate), methods (raf, scrollTo, on, stop/start, resize, destroy), nested-scroll handling, anchor links, limitations, Next.js provider example
- **Scroll-driven animations API** (CSS-native scroll timelines on the compositor)
- **Igloo Inc case study** — procedural ice blocks, WebGL UI, particle simulations, Three.js + GSAP + Svelte stack
- **Best principles** — narrative & hierarchy, motion & restraint, orientation & navigation, input normalization & accessibility, performance & optimization
- **What not to do** (scrolljacking, mobile motion overload, blocking main thread, ignoring SEO, poor contrast)
- **5-phase Lovable.dev implementation plan** (Discovery → Prototyping → Design → Development → Polishing)
- **Tools & frameworks** list
- **Mindset & Tone** section
- Trailing **Final Directive** with the per-step operational hook

This is **the canonical reference for any scroll-motion work** in the codebase.

## Where it goes

This is the first **animation/motion** persona embedded. Create a new top-level category `animations/` under both source and partner trees (the original folder taxonomy in `governance/knowledge-system-charter` already lists `/animations/`). File it there — *not* under `experience-prompts/` — because it's a function-scoped technical playbook, not a generic experience persona.

```text
src/master/knowledge/
├── source-documents/
│   └── animations/
│       └── premium-scroll-animation-persona.source.md   ← NEW (verbatim)
└── partner-documents/
    └── animations/
        └── premium-scroll-animation-persona.partner.md  ← NEW (interpretation)
```

## Files to create (2)

### 1. `premium-scroll-animation-persona.source.md`

- Standard immutability frontmatter (`status: IMMUTABLE`, `do-not-edit: true`, `verbatim: true`, `origin-file: GENERAL_SCROLL_ANIMATION_PROMPT-2.docx`, `source-format: docx`, `embedded-on: 2026-04-28`, `layer: source`, `category: animations`, `cross-cuts: motion, scroll, performance, ux`).
- Standard DO-NOT-EDIT banner.
- Full verbatim text of all 14 pages preserved exactly, including:
  - The persona's full agency lineage (Fantasy.co, Igloo.inc, Pentagram, IDEO, AKQA, Huge, Wolff Olins, B-Reel, MetaDesign, Work & Co)
  - The "Lovable.dev" brand reference
  - Code blocks (Lenis basic init, custom rAF loop, GSAP ScrollTrigger integration) preserved as-is — not wrapped or re-formatted
  - All `<mark>...</mark>` tags around config keys (`window`, `vertical`, `horizontal`, `both`, `true`, `prefers-reduced-motion`, `scroll`, `ALL`, etc.)
  - All paste artefacts: duplicated section headings ("Performance principles for scroll animations" appears twice), "GSAP GSAP & ScrollTrigger", " Example: Next.js provider for Lenis" (leading space), " Scroll-driven animation API" (leading space), " Igloo Inc case study" (leading space)
  - The mixed bullet glyphs (`-`, `*`, `1.`, indented sub-bullets) and smart quotes / em-dashes
  - The trailing **Final Directive** with the `<u>...</u>` HTML and the empty operational step

### 2. `premium-scroll-animation-persona.partner.md`

12-section partner template tailored to motion/scroll work:

1. **Title** — Premium Scroll Animation Persona & Lenis + GSAP Implementation Playbook
2. **Category** — `animations/` (new shelf), cross-cuts `motion`, `scroll`, `performance`, `ux`, `ui-components` (when scroll-triggered components are involved)
3. **Main purpose** — install fantasy.co / igloo.inc-grade scroll-experience methodology and the Lenis + GSAP technical stack as the default approach for any scroll-driven work.
4. **What it influences** —
   - Whether to add Lenis at all (default yes, with `prefers-reduced-motion` fallback)
   - Lenis configuration (lerp, duration, wheelMultiplier, touchMultiplier, syncTouch, anchors, autoRaf)
   - GSAP ScrollTrigger integration pattern (the `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(...)` + `gsap.ticker.lagSmoothing(0)` triad)
   - Animation property choice (transform + opacity only — never width/height/margin)
   - Fade-in durations (100–400ms band)
   - Stagger discipline (one element type at a time; don't fade text + images simultaneously)
   - Section pacing (alternate long and short scrolls; let upcoming sections peek)
   - Sticky nav + anchor + scroll-progress conventions
   - Mobile behaviour (minimize/disable scroll-fades on small screens)
   - `prefers-reduced-motion` handling (mandatory)
   - Nested-scroll handling (`data-lenis-prevent` on modals/carousels)
   - When to consider WebGL (igloo-style heavy effects) vs DOM-only
   - When to consider scroll-driven CSS animation API vs Lenis
5. **Trigger prompts** — extensive list:
   - "smooth scroll", "Lenis", "scroll feel", "scroll feels janky"
   - "scroll-triggered animation", "scroll fade", "fade in on scroll"
   - "parallax", "scroll parallax", "scroll-driven"
   - "scrolljacking", "scroll hijack"
   - "GSAP ScrollTrigger", "scroll timeline"
   - "scroll-snap", "snap to section"
   - "scroll progress indicator", "scroll progress bar"
   - "scroll cinema", "scroll storytelling"
   - "fix the modal scroll", "modal scroll wrong" (→ `data-lenis-prevent`)
   - "anchor links jumping wrong", "scroll-to with offset"
   - "reduce motion", "respect prefers-reduced-motion"
   - "performance", "60fps", "frame rate", "jank", "CLS"
   - "horizontal scroll section", "pinned section"
   - "WebGL hero", "Three.js hero", "ice block", "particle hero"
6. **Scope of application** —
   - Global app-shell scroll smoothing
   - Per-section reveal animations (hero curtain, divider taper, image clip-path)
   - Pinned / horizontal sections
   - Cinematic intro choreography (overlaps with `experience-prompts/anti-gravity-opening-engineer`)
   - Cloth-wipe / asphalt-wipe page transitions (already in `mem://design/cloth-wipe-transition`)
   - Modals & overlays (`data-lenis-prevent`, plus `mem://tech/modal-lifecycle-management`)
   - Booking-funnel panel auto-advance (verify it doesn't fight Lenis)
   - **Out of scope:** raw 3D modeling decisions (use the case study as inspiration only), audio engineering specifics
7. **Output-quality direction** —
   - **fantasy.co / igloo.inc bar.** Scroll must feel weighted, intentional, and silent — never twitchy.
   - **60fps non-negotiable.** Drop a non-critical animation before letting frame rate slip.
   - **Restraint over spectacle.** "One effect at a time" beats stacked effects every time.
   - **Brand-coupled easing.** For Calem Wood the easing personality is heavy / luxurious — slow lerp (≈0.06–0.08), gentle cubic-bezier with long out-curve, never bouncy.
   - **Persistence.** Once content has appeared, it stays. No fading back out on reverse scroll.
   - **Accessibility on equal footing with polish.** Every Lenis instance needs a reduced-motion branch.
8. **Brand & ICP relationship (Calem Wood Detailing — current active brand)** —
   - **Easing** matches the existing motion philosophy: cinematic reveals, bottom-to-top clip-path curtains, Ken Burns scaling (`mem://design/motion-philosophy`).
   - **Lenis lerp** lands around `0.06–0.08` for Calem Wood — heavier than the 0.05 in the source's Next.js example because the brand is luxury/automotive, not light/playful. `wheelMultiplier ~1.1`, `touchMultiplier ~1.0`, `syncTouch: false` for now to avoid iOS<16 unpredictability.
   - **Hero choreography** must coexist with the locked hero (`mem://design/hero-section-lock`) and the loading sequence (`mem://features/loading-sequence`) — Lenis should be initialised *after* the loading sequence resolves so it doesn't fight the curtain.
   - **Modal singleton rule** (`mem://tech/modal-lifecycle-management`): the booking modal must apply `data-lenis-prevent` to its scrollable form panel; Lenis must `stop()` on modal-open and `start()` on modal-close.
   - **Cloth-wipe transition** (`mem://design/cloth-wipe-transition`): the wipe runs on the compositor (transform + opacity), so it stays compatible with Lenis.
   - **Editorial divider tapers** (`mem://design/editorial-divider-specs`) and parallax coverage (`mem://tech/parallax-coverage-specs`) are scroll-driven candidates — drive them via ScrollTrigger feeding off Lenis.
   - **No human imagery, no rounded cards** (`mem://constraints/image-content-restrictions`, `mem://design/component-styling`) — applies to any 3D/WebGL hero we'd build inspired by the Igloo case study.
   - **Mobile rule** (`mem://constraints/mobile-optimization`, 390px target): prefer native scroll over scroll-fades on mobile per source's "Avoid scroll fading on mobile" guideline. Lenis stays on for momentum, scroll-fade reveals get downgraded.
9. **Global vs specific** —
   - **Wins over** ad-hoc per-component scroll animation choices on technical method (always Lenis + GSAP ScrollTrigger, always transform/opacity, always 100–400ms fade band).
   - **Inherits from** `governance/knowledge-system-charter` (always) and the `experience-prompts/master-design-persona-fantasy` for visual taste.
   - **Loses to** brand-identity / motion-philosophy partner docs and existing memories on **personality** of the easing (e.g., for Calem Wood the brand says "heavy / luxurious" and that overrides the source's lighter `lerp: 0.05` example).
   - **Loses to** existing locked components: hero (`mem://design/hero-section-lock`), brand-logo parallax (`mem://design/micro-interactions/brand-logo-parallax`), loading sequence (`mem://features/loading-sequence`).
10. **Adaptation notes (conflict rule applied — source preserved verbatim)** —
    | In source | Apply as |
    |-----------|----------|
    | `Lovable.dev` | The active brand for the prompt (default: Calem Wood Detailing in this codebase; Cochrane Master Builders when CMB is the active brand). |
    | `lerp: 0.05` (Next.js provider example) | Use as a starting point for light brands. For Calem Wood / luxury brands, prefer `0.06–0.08` for more weight. Document the per-brand lerp in the brand's motion partner doc. |
    | `wheelMultiplier: 1.5`, `touchMultiplier: 1.1` (example) | Treat as one valid preset. For Calem Wood prefer `1.1` / `1.0` so input feels deliberate, not snappy. |
    | `syncTouch: true` warning for iOS<16 | Default `false` until iOS<16 share is negligible. |
    | "Igloo Inc procedural ice blocks / WebGL UI / particle simulations" | **Inspiration only**, not a blueprint. Calem Wood does not currently use Three.js/WebGL — adopt only if a brand explicitly invests in a 3D hero. |
    | Tool list mentioning Svelte / Vue / SvelteKit | This codebase is **React 18 + Vite**. Translate patterns into a React `LenisProvider` component (the `useEffect` + rAF lifecycle pattern in source §"Next.js provider for Lenis" maps cleanly to React). |
    | Scroll-driven CSS animations API | Browser support still limited. Continue using Lenis + GSAP as primary; revisit annually. |
    | Trailing **Final Directive** with the empty operational step | **Knowledge-only.** Does NOT authorise a frontend scroll-overhaul pass. Implementing Lenis + GSAP across the site is a separate, deliberately-scoped request. |
    | Duplicated headings ("Performance principles…" twice, "GSAP GSAP &…", leading-space headings) | Paste artefacts. Read past them. |
    | `<mark>` tags | Treat as code identifiers / inline highlights. |
11. **Dependencies / related documents** —
    - **Always inherit:** `partner-documents/governance/knowledge-system-charter`
    - **Style + taste partner:** `partner-documents/experience-prompts/master-design-persona-fantasy`
    - **Cinematic intro partner:** `partner-documents/experience-prompts/anti-gravity-opening-engineer` (the opening choreography sits *before* Lenis takes over the page)
    - **Brand motion memories (Calem Wood):**
      - `mem://design/motion-philosophy` — cinematic reveals, clip-path curtains, Ken Burns
      - `mem://design/cloth-wipe-transition` — transform/opacity-only, Lenis-safe
      - `mem://features/loading-sequence` — Lenis must start *after* this resolves
      - `mem://design/hero-section-lock` — hero choreography is locked; Lenis works around it
      - `mem://design/editorial-divider-specs` — scroll-driven taper reveals
      - `mem://tech/parallax-coverage-specs` — 130% / -15% offset rule for full-bleed parallax
      - `mem://design/hero-interactive-shine` — cursor-driven, not scroll-driven, but lives in the same frame budget
      - `mem://design/micro-interactions/brand-logo-parallax` — desktop-only, mouse-parallax (compositor-only)
      - `mem://tech/modal-lifecycle-management` — Lenis stop/start hooks
      - `mem://constraints/mobile-optimization` — downgrade scroll-fades on 390px viewport
    - **Future:** when CMB activates as the live brand, mirror motion memories there.
12. **Practical examples** —
    **A. "The site feels twitchy on Mac trackpads."** → install Lenis at the App root with `lerp: 0.07`, `wheelMultiplier: 1.1`, `touchMultiplier: 1.0`, `autoRaf: true`. Wire `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t*1000))` + `gsap.ticker.lagSmoothing(0)`. Add `prefers-reduced-motion` branch that skips Lenis entirely.
    **B. "Add a scroll-fade reveal to the section heading."** → `gsap.from(el, { opacity: 0, y: 24, duration: 0.32, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 80%' } })`. Duration sits inside the 100–400ms band. Persist (no fade-out on reverse). Skip on mobile per source guideline.
    **C. "The booking modal scrolls weird inside Lenis."** → add `data-lenis-prevent` to the inner scrollable form panel; on modal `onOpenChange(true)` call `lenis.stop()`, on close call `lenis.start()`. Combine with the modal singleton rule from `mem://tech/modal-lifecycle-management`.
    **D. "Anchor link to `#services` lands behind the sticky nav."** → enable `anchors: { offset: -80 }` (matching the 80px navbar from `mem://design/navigation-specs`).
    **E. "Build an Igloo-style WebGL hero for Cochrane Master Builders."** → flag as a bigger investment. Confirm with brand decision-makers; if approved, scaffold Three.js + R3F, follow §Igloo case study (procedural variation, GPU-side effects, browser-iterated shader work, real-time intro). Otherwise stay DOM-only and lean on motion-philosophy reveals.

## Index update

Add a new top-level **Animations** section in `INDEX.md` between Experience Prompts and the Cochrane brand block, with this row:

```
| `source-documents/animations/premium-scroll-animation-persona.source.md` | Markdown (verbatim DOCX) | partnered | Master scroll-craftsperson persona + Lenis + GSAP playbook (config, integration, Igloo case study, 5-phase implementation plan, performance & accessibility rules) |
```

## Deliberately NOT changing

- **No frontend touched.** Trailing Final Directive is knowledge-only.
- **No Lenis installed in `package.json`** — installation happens only when a real scroll request comes in.
- **No router/decision-index changes.** Animations are brand-agnostic; surfaced through `INDEX.md`.
- **No edits to existing source/partner files** including the previous SEO + governance + design embeds.
- **No Supabase, no edge functions, no UI components.**

## After this turn

When you (or any agent) asks anything about scroll feel, scroll-triggered animation, parallax, scroll-fade, jank, GSAP ScrollTrigger, smooth scroll, anchor offsets, modal-vs-scroll conflicts, or "make this feel like fantasy.co / igloo.inc," the system reads:

1. `governance/knowledge-system-charter` (how to use knowledge)
2. `experience-prompts/master-design-persona-fantasy` (taste)
3. `experience-prompts/anti-gravity-opening-engineer` (intro choreography)
4. `animations/premium-scroll-animation-persona` (scroll mechanics) ← **this embed**
5. The brand's motion memories / partner docs (personality of the easing)

Result: every scroll interaction in this codebase will be Lenis-grade smooth, GSAP-precise, performance-budgeted at 60fps, accessibility-respecting, and bespoke to the active brand's motion personality.
