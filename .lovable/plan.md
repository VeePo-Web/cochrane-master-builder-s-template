# UI/UX Audit & De-Templating Plan
## "Cochrane Drywall & Insulation — from polished template to signature site"

I navigated the live preview at 1440px and 390px across `/`, `/drywall-repair`, `/gallery`, plus reviewed the source for `Hero`, `HeroImage`, `ServiceCard`, `ProcessSteps`, `SectionTitle`, `CTABand`, `BeforeAfterPair`, `Logo`, `TrustBar`, `Navigation`, and `Index.tsx`. Below is what reads as **template-grade** today, followed by a phased rebuild plan.

---

## 🔍 Part 1 — Audit: 15 things that make the site feel cheap / template-y

### A. The hero is the biggest tell (4 issues stacked)
1. **The hero image is invisible on mobile.** `HeroImage.tsx` uses a `from-bone via-bone/85 to-bone/40` gradient at `opacity={38}` with no responsive override. On a 390px viewport the 8-col copy area covers 100% of the image, so the photo is completely washed out — the hero looks like a white wall. **Tell**: phones see a stock-template body of text on cream.
2. **Two competing headlines** in the hero. The left says *"Finally get that wall handled."* and the right column repeats *"Finally Get That Wall Handled."* in title-case as a sidebar quote. It's not a system — it's the same line twice in two different cases. **Tell**: feels auto-generated.
3. **Eyebrow is meaningless.** `COCHRANE, ALBERTA` sits above every hero. It's a location stamp, not an eyebrow. Real editorial eyebrows answer "what category am I about to read?" (e.g., *Repair · Cochrane · 24h photo-quote*). **Tell**: vacuous tracker text.
4. **No visual anchor / no proof.** Hero has zero numbers, zero logos, zero before/after teaser, zero photo of actual work, zero motion. It's all text and a single CTA. World-class tradesman sites (e.g., agency-built finishing brands) show a tile of recent work *inside* the hero so the reader sees "they actually do this" within 1.5 seconds.

### B. Components are wireframes painted cream (5 issues)
5. **ServiceCard is a generic outlined rectangle.** `border border-seam bg-paper p-8` + bold heading + lead + arrow link. There are 4 of these in a row. They could be on any contractor, SaaS, or law-firm template. No image preview, no scope chip, no price band, no signature mark.
6. **ProcessSteps is the canonical "4 numbered cards in a row" pattern.** A muted `01 02 03 04` with a paragraph each. Every Lovable / Webflow / Squarespace template uses this exact composition. There is no spatial story (no arrow, no connector line, no progressive imagery, no horizontal scroll on mobile, no per-step illustration).
7. **CTABand is a flat forest rectangle.** Single bg color, headline, body, two buttons. The pattern shows up identically on at least three sections. It needs differentiation by depth/role: in-context CTA vs. final CTA vs. service-specific CTA.
8. **BeforeAfterPair is two side-by-side photos with corner pills.** This is the most common template in the trades. Real proof systems use a *slider* (drag handle), or a *crossfade on hover*, or a *staged reveal*. As built, it's two thumbnails with little "Before"/"After" tags — generic.
9. **TrustBar is `Check · text · Check · text` ad infinitum.** Lucide check + grey label, four times, centered, on a paper strip between sections. Every Bootstrap/Tailwind starter has this exact bar.

### C. Page rhythm is a metronome (3 issues)
10. **Section pattern repeats 9 times.** Every section is: `eyebrow → display headline → optional lede → grid of equal cards`. There is no variation in alignment (everything is left-aligned), no asymmetry, no full-bleed editorial moment, no inset narrative block, no number-led big-stat moment. Scrolling feels like the same beat played 9 times.
11. **All paragraphs are the same width and weight.** `text-graphite` body + `text-body-lg` lede across the entire site. No drop cap (the CSS for `.drop-cap` exists in `index.css` but isn't applied anywhere). No editorial pull-quote that *isn't* on a blurred backdrop. No hierarchy of paragraph styles.
12. **Vertical rhythm has no breathing room differential.** Every section is `section-y` (`clamp(3rem, 9vw, 7.5rem)`). World-class editorial sites *modulate* — a hero gets 12rem, a fact strip gets 3rem, the closing CTA gets 16rem. As built, the page is a stack of equal slabs.

### D. Motion, micro-interactions & navigation (3 issues)
13. **No signature interaction.** The brand promise is "damaged → smooth/clean," but nothing on the site demonstrates that gesture. There is no seam-disappearing reveal, no trowel-arc cursor, no "before paint → after paint" hover on a service card, no animated trowel mark in the logo on first load. The motion philosophy doc describes all of this; none of it ships.
14. **Desktop nav wraps.** At 1440px, "Drywall Repair", "Pricing & Process", "Favourite Things" all wrap to two lines. The nav looks like it's having a stress test. With 9 visible top-level items + a CTA, that's too many for the column. Either reduce items, group under a Services dropdown, or shrink the type — but a wrapping nav is the #1 template tell on any contractor site.
15. **The "Back to top" button teleports to the footer.** I clicked it from the gallery and the page jumped past the grid straight to the footer. It's a real bug — `BackToTop` likely scrolls to a `#bottom` anchor or the wrong target, possibly because Lenis is intercepting `window.scrollTo({ top: 0 })`. This single bug undoes all the polish.

### E. Brand identity micro-issues (bonus)
- **Logo cuts off "& Insulation" below sm.** On every phone, the brand reads *"Cochrane Drywall · Masters"*. The legal name is missing from the visible mark on the most-used viewport.
- **The CTA *button* says "Get a Quote" in the navbar but "Send Photos for a Quote" everywhere else.** Three different phrasings exist for the same action: *Get a Quote · Send Photos for a Quote · Request Repair Pricing*. Pick one and let it be the brand verb.
- **Navigation underline is `story-link` with no actual underline visible** — the hover is so subtle it disappears against the bone backdrop.
- **Footer sign-off "Damage out. Comfort in." is huge but shrinks to nothing at 1440px** because it's not using `clamp()` — looks tiny at desktop.
- **Bottom-of-CTA vs. footer have no separator** — the green CTA band runs straight into the cream footer with no breathing room. The handoff feels glued together.

---

## 🛠 Part 2 — The 6-Phase Rebuild

The principle: **stop using the brand color as the only differentiator.** Every cheap template is a palette change away from another cheap template. Premium comes from **system, signature, asymmetry, and proof.**

---

### **Phase 1 — Hero rebuild ("the 1.5 second test")** — `Hero.tsx`, `HeroImage.tsx`, `Index.tsx`

**Goal:** A reader on any device should see *the wall, the work, and the next step* before the second second.

1. **Replace flat 60/40 grid** with a 3-zone editorial layout:
   - Left (60%): eyebrow → headline → lede → CTAs.
   - Right (40%): a stacked **proof column** with one real before/after thumbnail (drag-revealable on desktop, tap-to-flip on mobile), a tiny scope chip ("Repair · Cochrane · 1 visit"), and a 3-line micro-testimonial ("Patched in an afternoon. Couldn't find the seam after." — *Lisa, Cochrane*).
2. **Mobile rule for the hero photo:** the bone overlay is currently the same on every viewport. Switch the gradient to `from-bone via-bone/95 to-bone/65` on `<md` AND clip the photo to a 4:5 frame *below* the headline so the image actually appears on phones. Above-the-fold should always show *some* of the wall.
3. **Replace location-stamp eyebrow** with a contextual eyebrow per page. Home: `Cochrane · 24-hour photo-quote`. Repair: `Drywall Repair · Single-visit jobs welcome`. Etc.
4. **Kill the duplicate sidebar quote.** Replace it with the proof column from #1.
5. **Add a single signature motion:** a 1.2s seam-line that draws across under the headline on mount (`animate-line-grow-center` already exists in `index.css` — wire it).
6. **Remove the `paper-grain` overlay on the hero** at mobile widths — at 5% opacity over a bone wash it's invisible noise that just costs paint time.

---

### **Phase 2 — Replace the four template components with signature ones**

#### 2a. `ServiceCard` → `ServicePanel`
- Make it a **horizontal editorial slat** on desktop (image left 40%, copy right 60%) and a vertical card on mobile.
- Add a tiny inline image (we have the asset library — pull `editorial-mud-bucket`, `editorial-corner-bead`, `editorial-paint-swatch`, `editorial-vapor-barrier` for the four services).
- On hover (desktop), the image **sharpens** from a 4px blur to 0px in 600ms — literal "out-of-focus → in-focus" motion that mirrors the brand promise.
- Add a `scope chip` ("Half-day · Single visit · One coat") under the title — the same data as `planningRanges` but treated as a typographic tag.

#### 2b. `ProcessSteps` → `ProcessLadder`
- Drop the 4-equal-cards grid. Replace with a **vertical ladder** on desktop where each step has its own row: large numeral on the left (90px Cormorant, forest at 30%), title + description center, small editorial photo on the right (we have all 6 `editorial-*` assets).
- Connect the steps with a **1px forest line** that animates draw-in as you scroll.
- On mobile: convert to a snap-x carousel (one step per swipe) — touch-first interaction, not a tall stack.

#### 2c. `CTABand` → 3 differentiated CTA roles
- `CTAWhisper` — inline thin band with a single underlined link, used between mid-page sections.
- `CTABand` (kept) — green slab, used only **once** per page, near the end.
- `CTAFinale` — full-bleed dark forest with a **giant pull-quote**, eyebrow, two CTAs, and a subtle parallax of `bg-blur-basement-progression`. Used as the page closer instead of repeating the green band.

#### 2d. `BeforeAfterPair` → `BeforeAfterReveal`
- Add a **drag-handle slider** (use `@radix-ui/react-slider` or a simple pointer-event implementation). The handle is a 1px hairline + a tiny forest dot at the seam — mirrors the logo's "mastery dot" mark.
- Mobile: tap the image to swap before↔after with a 400ms crossfade.
- Add a "scope tag" beneath each pair (`Knob hole · 1 hour · Single visit · Cochrane SW`) so the proof reads as a case study, not a thumbnail.

#### 2e. `TrustBar` → `TrustLedger`
- Replace check-marks-in-a-row with a **3-column ledger** style: each column has a small numeral (`24h`, `100%`, `~1`) above an eyebrow (`Photo-quote turnaround`, `Cochrane homes`, `Visit per repair`) above a one-line context. Same trust signals, but reads like a stat sheet, not a footer pill row.

---

### **Phase 3 — Page rhythm: break the metronome**

1. **Vary section padding by *role*** instead of using `section-y` everywhere:
   - `section-hero` → `pt-clamp(6rem, 18vw, 14rem) pb-clamp(4rem, 12vw, 9rem)`
   - `section-narrative` → `py-clamp(5rem, 12vw, 10rem)`
   - `section-fact` → `py-clamp(2.5rem, 6vw, 4.5rem)` (tight, factual)
   - `section-finale` → `pt-clamp(6rem, 14vw, 11rem) pb-clamp(8rem, 18vw, 14rem)` (big arrival)
   Add these as utility classes in `index.css`.

2. **Introduce 3 new layout primitives** alongside the existing `container mx-auto px-6`:
   - **`<EditorialSpread>`** — asymmetric 12-col with a 5-col offset block (image-left, copy-right or vice versa). Used 1–2 times per page, never side-by-side.
   - **`<NarrativeColumn>`** — single 60ch column with optional `.drop-cap` on the first paragraph. Used for the "Why us" / "About" sections so the reader gets a moment of *reading* instead of *scanning*.
   - **`<StatRow>`** — 3 large numerals across the page width with hairline rules between them. Used for "in last 12 months" type claims.

3. **Apply `.drop-cap`** to the first paragraph of `About.tsx` and the "Why us" block on `Index.tsx`. The CSS is already there; it's never applied.

4. **Add page transitions specific to the brand:** instead of `PageTransition`'s opacity-fade, use a 600ms **horizontal seam wipe** (a 1px forest line that sweeps from left to right then dissolves the new page in beneath it). Reuses the seam-as-signature motif.

---

### **Phase 4 — Signature interactions (the "only this brand does this" moments)**

1. **Trowel-arc cursor on `/` and `/drywall-repair`** (desktop only): a tiny SVG arc that follows the cursor with a 120ms lag. Disappears over text/buttons. Echoes the logo and feels like a master's hand near the wall.
2. **Service-card "smooth on hover":** card image starts at `filter: blur(4px) contrast(0.9)` and resolves to `blur(0)` over 600ms on hover. Literal "rough → finished" demonstration — embodies the brand promise.
3. **Hero seam-draw:** 1px forest line draws under the headline on mount (already have keyframes — wire it).
4. **FAQ open animation:** when a FAQ item opens, the answer paragraph reveals top-to-bottom *behind* a thin clip-path mask (200ms) instead of the default Radix accordion height transition. Subtle but mirrors "mud feathering out."
5. **Scroll-progress hairline** at the very top of the viewport (1px, forest, 12% opacity) instead of `BackToTop`'s round button. Uses `useScroll` from framer-motion and feels like the seam being drawn as you read.
6. **"Mastery dot" on the logo:** the small forest dot in the trowel mark gets a `breathe` animation (2.4s, opacity 1 → 0.6 → 1). Already have `animate-pulse-dot` keyframes.

---

### **Phase 5 — Navigation, brand mark, and chrome**

1. **Reduce desktop nav from 9 items to 6**. Group all four services under a single `Services ▾` flyout. Final desktop nav: `Services ▾ · Pricing & Process · Gallery · Reviews · About · [Get a Quote]`.
2. **Fix the wrapping items:** even after grouping, set the nav row to `flex-nowrap` and use a smaller type scale (13px) at 1024–1280px so nothing wraps.
3. **Logo mobile rule:** show "Cochrane Drywall & Insulation" stacked on two lines on mobile (small type, two-line lockup) so the legal name is never truncated. Right now the brand name disappears below `sm`.
4. **Unify the CTA verb sitewide.** Pick one — recommend `Send Photos for a Quote` (matches the actual flow). Replace `Get a Quote` and `Request Repair Pricing` everywhere.
5. **Add a 1px seam between `<CTABand>` and `<Footer>`** — currently they're glued. Use the existing `.seam-rule-fade` utility.
6. **Fix `BackToTop`** to use Lenis's `lenis.scrollTo(0, { duration: 1.2 })` instead of `window.scrollTo`. Today's bug: it teleports to the footer.
7. **Footer sign-off "Damage out. Comfort in."** → wrap with `clamp(2.25rem, 6vw, 5.5rem)` so it scales with the viewport instead of looking tiny on desktop.

---

### **Phase 6 — Proof system & content density**

A drywall brand has to *prove* the work. Right now the proof is buried.

1. **Hero proof tile** (covered in Phase 1): one before/after preview lives *in* the hero on desktop.
2. **`/gallery` filter row → editorial chip strip.** Today it's a row of pill buttons. Treat each filter as an italic Cormorant word with a hairline underline on the active one (`Repair · Patch + Paint · Garage · Basement`). More magazine, less SaaS.
3. **Add `<CaseStudyStrip>` to home and each service page** — a single horizontal scroll-snap row of 3 micro case studies (60-word story + small after photo + 1 stat). Pulls from a new `src/config/case-studies.ts` data file.
4. **Replace the `BRAND_IDENTITY.pillars.cleanRepairs` pseudo-quote** on the home page (currently in a centered blockquote) with a real-attribution testimonial. If we don't have one yet, structure the data file (`src/config/reviews.ts` already exists) and pull from it instead of brand copy talking to itself.
5. **Add a `<NumberFact>` row** on the home page between "Why us" and the final CTA: `~1 visit · 24h reply · 0% upsell pressure`. Editorial numerals (Cormorant, 96px), thin forest rules between, no boxes.

---

## 📐 Implementation order & estimated impact

| Phase | What lands | Tells removed | Suggested order |
|---|---|---|---|
| 1 | Hero rebuild + proof tile + mobile photo fix | #1, #2, #3, #4 | **First — biggest visible delta** |
| 5 | Nav fix + logo fix + CTA verb + back-to-top fix | #14, #15, brand micro-issues | **Second — fixes obvious bugs** |
| 2 | Signature components (ServicePanel, ProcessLadder, CTAFinale, BeforeAfterReveal, TrustLedger) | #5, #6, #7, #8, #9 | Third — highest craft uplift |
| 3 | Page rhythm primitives + drop-cap + section roles | #10, #11, #12 | Fourth |
| 4 | Signature motion (cursor arc, service smooth-on-hover, scroll hairline) | #13 | Fifth |
| 6 | Proof system (case studies, real reviews, number facts) | trust deficit | Sixth |

Total deliverables: **3 new layout primitives**, **6 rebuilt or new components**, **5 signature motions**, **1 nav restructure**, **1 hero rebuild**, **1 page-rhythm utility set**, **1 case-study data layer**, **3 critical bug fixes**.

Once approved, I will begin with **Phase 1 (Hero) + the three critical bugs from Phase 5** (back-to-top teleport, logo truncation, nav wrapping) so the first commit lands the most visible improvement and removes the most embarrassing tells in a single pass.