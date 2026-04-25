## Goal

Embed the 10 uploaded Cochrane Master Builders logo files into the master template so every remix automatically renders the correct logo variant at the correct size in the correct slot — without per-remix asset work.

## Asset placement

All files copy into `src/master/assets/logo/` (travels with every remix; bundled, optimized, hashed by Vite):

```text
src/master/assets/logo/
  cmb-hero.png           ← cmb-full-logo-black-hero.png            (~1900px, hero / splash)
  cmb-large.png          ← cmb-full-logo-black-large.png           (~1200px, marketing modules)
  cmb-medium.png         ← cmb-full-logo-black-medium.png          (~800px,  about / mid sections)
  cmb-small.png          ← cmb-full-logo-black-small.png           (~400px,  loading screen, og fallback)
  cmb-footer-large.png   ← cmb-full-logo-black-footer-large.png    (~1000px, desktop footer)
  cmb-footer-medium.png  ← cmb-full-logo-black-footer-medium.png   (~600px,  tablet footer)
  cmb-footer-small.png   ← cmb-full-logo-black-footer-small.png    (~360px,  mobile footer)
  cmb-nav-large.png      ← cmb-full-logo-black-nav-large.png       (~280px,  desktop nav)
  cmb-nav-medium.png     ← cmb-full-logo-black-nav-medium.png      (~200px,  tablet nav)
  cmb-nav-small.png      ← cmb-full-logo-black-nav-small.png       (~140px,  mobile nav)
```

Also copy `cmb-small.png` to `public/og-image-cmb.png` and `public/favicon-cmb.png` for crawler-accessible meta tags.

## Logo registry — single source of truth

New file `src/master/brand/logo-registry.ts` exports a typed map every component imports from:

```ts
export const MASTER_LOGOS = {
  nav:    { sm: cmbNavSm,    md: cmbNavMd,    lg: cmbNavLg },
  footer: { sm: cmbFooterSm, md: cmbFooterMd, lg: cmbFooterLg },
  hero:   cmbHero,
  large:  cmbLarge,
  medium: cmbMedium,
  small:  cmbSmall,
} as const;

export const LOGO_USAGE_MAP = { /* slot → which file → why → min/max px */ };
```

`LOGO_USAGE_MAP` is the documented contract referenced by the remix checklist and the brand-audit playbook.

## Slot-by-slot mapping (where each file is used)

| Slot | Variant chosen | Component touched |
|---|---|---|
| Desktop nav (≥1024px) | `nav-large` (h-10) | `Navigation.tsx` |
| Tablet nav (640–1023px) | `nav-medium` (h-9) | `Navigation.tsx` |
| Mobile nav (<640px) | `nav-small` (h-8) | `Navigation.tsx` |
| Footer desktop (≥1024px) | `footer-large` (h-24) | `Footer.tsx` |
| Footer tablet (768–1023px) | `footer-medium` (h-20) | `Footer.tsx` |
| Footer mobile (<768px) | `footer-small` (h-16) | `Footer.tsx` |
| Loading screen | `small` (centered, ~120px) | `LoadingScreen.tsx` |
| Hero badge / splash moments | `hero` (max-w-md) | `Hero.tsx` (optional watermark) |
| Booking modal brand stack | `medium` (h-28) | `BookingModal.tsx` left rail |
| About page brand monument | `large` | `About.tsx` |
| 404 page mark | `medium` | `NotFound.tsx` |
| Email templates header | `medium` (hosted via /public) | `booking-confirmation.tsx` |
| OG / social share | `public/og-image-cmb.png` | `SEOHead.tsx`, `index.html` |
| Favicon fallback | `public/favicon-cmb.png` | `index.html` |

## New `<MasterLogo>` component

`src/master/brand/MasterLogo.tsx` — the only logo primitive any page should use:

```tsx
<MasterLogo slot="nav" />      // auto-picks sm/md/lg by Tailwind breakpoint via <picture> + srcset
<MasterLogo slot="footer" />
<MasterLogo slot="hero" />
<MasterLogo slot="loading" />
```

Uses native `<picture>` with `srcset` + `sizes` so the browser downloads only the variant it needs (perf budget). `loading="eager"` for nav and loading screen, `loading="lazy"` for footer/hero. `decoding="async"`. `width`/`height` attrs set to prevent CLS. `alt="Cochrane Master Builders"` always.

## Wiring (light, surgical edits)

1. Replace `Logo` usage in `src/components/drywall/Navigation.tsx` with `<MasterLogo slot="nav" />`. Keep the existing `Logo.tsx` (TrowelMark) as a *trade sub-mark* available via `<MasterLogo slot="nav" subMark />` if a remix wants both lockups.
2. Same swap in `src/components/drywall/Footer.tsx` (`slot="footer"`).
3. Add `<MasterLogo slot="loading" />` to `LoadingScreen.tsx`.
4. Update `SEOHead.tsx` defaults + `index.html` `<meta property="og:image">` and `<link rel="icon">` to point at the new public files.
5. Update `src/master/index.ts` barrel to export `MasterLogo`, `MASTER_LOGOS`, `LOGO_USAGE_MAP`.

## Per-trade override (kept simple)

`trade.config.ts` gets one optional field: `identity.logoOverride?: { nav?, footer?, hero? }`. If unset (default), every site renders the master CMB logos. If set (e.g. a trade wants its own AI-generated wordmark), `MasterLogo` falls back to the override. This preserves the "edit one file to remix" promise.

## Documentation

- `src/master/brand/LOGO_USAGE.md` — the visual map (table above), do/don't list, clear-space rules (1× the M-bar around the mark), and "never recolor / never stretch / never add effects" hard rules.
- Add a checklist row to `src/master/checklist.ts`: "Confirm `<MasterLogo>` renders in nav, footer, loading, and OG image".

## Out of scope (explicit)

- No SVG conversion of the PNGs (you uploaded PNGs and asked to embed *these* assets).
- No AI logo generation in this pass — the per-trade AI logo system from the prior plan stays separate; this pass is purely the master-brand asset embed.
- No backend/database storage — logos ship in the bundle per the approved "in the codebase" architecture.

## Deliverables

- 10 logos copied into `src/master/assets/logo/` + 2 into `/public`
- New `MasterLogo` component + `logo-registry.ts` + `LOGO_USAGE.md`
- Navigation, Footer, LoadingScreen, SEOHead, index.html switched over
- Barrel exports + checklist updated
