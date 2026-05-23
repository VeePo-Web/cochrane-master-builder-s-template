
# Slogan Saturation Plan — "Building Strong Foundations For Those Who Come After Us"

Goal: make the slogan an inescapable, brand-consistent presence across the template — hero, headers, CTAs, footer, and every page section — without turning it into visual noise. Use the existing `SloganHeartbeat` bespoke component as the single source of truth so typography, copper bullet, and motion stay consistent.

## Source of truth

- Copy lives in `MASTER_REMIX.SLOGAN` / `TEMPLATE_COPY.brand.slogan` (already present).
- Render via `@/components/template/bespoke` → `SloganHeartbeat` (variants: `hero`, `section`, `footer`, `monument`, plus a new `inline` + `micro` variant for tight spots).
- Zero hard-coded slogan strings in pages — always pull from config.

## Placement matrix

Chrome (global, edit once):
1. `TemplateNavigation` — add a `SloganHeartbeat variant="micro"` ticker beneath the top bar on `/` only (desktop), and as the first item inside the mobile drawer.
2. `TemplateFooter` — already has `footer` + `monument` variants. Add a `section` variant inside the Tier-1 brand column under the logo (replaces the current promise paragraph spacing) and confirm the `GenerationalMarquee` is the slogan.
3. `BookingModal` — add `variant="inline"` under the left-side brand-identity stack, and on the Thank-You step as the closing inscription.
4. `StickyBookingBar` (mobile) — slogan as the eyebrow above the CTA at `micro` size.

Pages (one slogan beat per page, placed where it reinforces the section's intent — never two in a row):
5. `Home.tsx` — Hero eyebrow (`hero` variant), Trust strip closer (`inline`), Founder/Finale section monument (`monument`).
6. `Services.tsx` — section header eyebrow + closing band.
7. `ServiceDetail.tsx` — hero eyebrow + above-CTA inline beat.
8. `WhyWeLoveService.tsx` — opening eyebrow + cornerstone monument near the bottom.
9. `Pricing.tsx` — eyebrow above the ladder + inline between tiers and guarantee.
10. `Guarantee.tsx` — monument variant as the seal caption.
11. `BrandStory.tsx` — recurring `section` beat between chapters (max 3, rhythmic).
12. `About.tsx` — eyebrow + founder-quote monument.
13. `Gallery.tsx` — eyebrow above grid + inline footer band.
14. `Reviews.tsx` — eyebrow + closing inscription.
15. `AreasWeServe.tsx` — eyebrow + monument under the map.
16. `Contact.tsx` — eyebrow + inline above form + monument after submit success.
17. `FAQ.tsx` — eyebrow + closing inscription.
18. `ThankYou.tsx` — full `monument` variant as the page sign-off.
19. `NotFound.tsx` — `section` variant under the 404 message.

## Component work

- Extend `SloganHeartbeat` with two new variants:
  - `inline` — single-line, 14–16px, copper square bullet, used inside body sections.
  - `micro` — 11–12px tracked uppercase, for nav/sticky bar.
- Add an `as` prop (default `p`, allow `span`/`h2`) so it can serve as a section eyebrow without breaking semantics.
- Add an optional `aria-hidden` when the slogan repeats within a short distance of another instance, so screen readers hear it once per page (count instances via a lightweight context or simple prop).

## Rhythm & guardrails (so it doesn't feel spammy)

- Max 3 visible slogan beats per page body (plus chrome).
- Never place two beats inside the same viewport at desktop 1440×900.
- Alternate variants down the page: `hero → section → inline → monument`.
- All beats use copper bullet + Space Grotesk display weight 300; only `monument` and `hero` get the breathing animation, others are static.
- No color/copy/font changes outside what `SloganHeartbeat` already defines.

## Out of scope

- No copy edits to other headings, no new sections, no route changes, no backend/email changes.
- No edits to the legacy `src/components/drywall/*` or `src/components/detailing/*` trees — template only.

## Technical notes

- Files touched: `src/components/template/bespoke/SloganHeartbeat.tsx` (variant extension), `TemplateNavigation.tsx`, `TemplateFooter.tsx` (minor), `BookingModal` template, `StickyBookingBar` (template version), and each page under `src/pages/template/*`.
- All copy via `MASTER_REMIX.SLOGAN` — confirm the constant, otherwise read `TEMPLATE_COPY.brand.slogan`.
- Verify with a build + a quick visual pass on `/`, `/services`, `/pricing`, `/thank-you`.
