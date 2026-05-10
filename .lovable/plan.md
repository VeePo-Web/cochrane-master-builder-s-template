## Goal

Strip the project down to the **Universal Template only**. Remove all drywall-specific pages and routes so `/` boots directly into the template and nothing non-template ships.

## Scope

### 1. Rewire `src/App.tsx`
- Delete all non-template lazy imports (Index, DrywallRepair, DrywallInstallation, Painting, GaragePackages, BasementPackages, PricingProcess, Gallery, Reviews, FavouriteThings, About, Contact, ThankYou, Privacy, Terms, Brand, StoryBrand, WhyWeLove, TheOffer, Knowledge, Preflight, NotFound).
- Delete all matching `<Route>` entries.
- Promote template routes to root: `/template` → `/`, `/template/brand-story` → `/brand-story`, `/template/why-we-love` → `/why-we-love`, `/template/services` → `/services`, `/template/services/:slug` → `/services/:slug`, `/template/pricing` → `/pricing`, `/template/gallery` → `/gallery`, `/template/reviews` → `/reviews`, `/template/about` → `/about`, `/template/contact` → `/contact`, `/template/privacy` → `/privacy`, `/template/terms` → `/terms`. Catch-all `*` → `TemplateNotFound`.
- Keep singleton `BookingModal`, `BackToTop`, `StickyCTA`, `SmoothScrollProvider`, `PageTransition`, `ScrollToTop` wiring (these are infra, not pages).

### 2. Update `TemplateNavigation` + `TemplateFooter` links
- Strip the `/template` prefix from every internal link so nav/footer point at the new root paths.

### 3. Delete obsolete page files in `src/pages/`
Remove: `Index.tsx`, `DrywallRepair.tsx`, `DrywallInstallation.tsx`, `Painting.tsx`, `GaragePackages.tsx`, `BasementPackages.tsx`, `PricingProcess.tsx`, `Gallery.tsx`, `Reviews.tsx`, `FavouriteThings.tsx`, `About.tsx`, `Contact.tsx`, `ThankYou.tsx`, `Privacy.tsx`, `Terms.tsx`, `Brand.tsx`, `StoryBrand.tsx`, `WhyWeLove.tsx`, `TheOffer.tsx`, `Knowledge.tsx`, `Preflight.tsx`, `NotFound.tsx`, `FAQ.tsx`, `Results.tsx`, `ServiceArea.tsx`, `Services.tsx`, `Unsubscribe.tsx`.

Keep: `src/pages/template/*` (the template itself).

### 4. Out of scope (intentionally untouched)
- `src/components/drywall/*` — used by the template as infra (BookingModal, PageTransition, SmoothScrollProvider, etc.). Leaving them avoids breaking the template; they can be renamed later.
- `src/components/master/*`, `src/components/detailing/*` — reused by template sections.
- `src/config/*` — booking config types are still imported by `App.tsx`.
- Knowledge / brand-identity / playbook docs in `src/master/` — those are reference material for the 150 remixes, not shipped pages.
- `src/index.css`, `tailwind.config.ts`, design tokens — unchanged.

## Result

Visiting `/` lands on the master template homepage. Every link in nav and footer resolves cleanly. No drywall page code remains in the bundle. Template structure, copy library, remix variables, and components are preserved exactly as built.
