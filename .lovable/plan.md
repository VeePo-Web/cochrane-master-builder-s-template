## What you uploaded

The full **white colorway** package — 10 PNGs matching the black + navy sets 1:1:

- `cmb-full-logo-ground-white-{hero, large, medium, small}.png`
- `cmb-full-logo-ground-white-nav-{small, medium, large}.png`
- `cmb-full-logo-ground-white-footer-{small, medium, large}.png`

Note: previews look blank because these are white-on-transparent — the alpha channel carries the artwork. They'll render correctly on dark surfaces (asphalt, hero photos, loading splash).

I'm in plan mode this turn (read-only), so binaries can't be copied yet. Approving switches to build mode and I'll execute in one pass — same flow that worked for the navy set.

## What I'll do once approved

### 1. Embed the 10 white binaries

| Upload | → Destination |
|---|---|
| `cmb-full-logo-ground-white-hero.png` | `src/master/assets/logo/cmb-white-hero.png` |
| `cmb-full-logo-ground-white-large.png` | `src/master/assets/logo/cmb-white-large.png` |
| `cmb-full-logo-ground-white-medium.png` | `src/master/assets/logo/cmb-white-medium.png` |
| `cmb-full-logo-ground-white-small.png` | `src/master/assets/logo/cmb-white-small.png` |
| `cmb-full-logo-ground-white-nav-large.png` | `src/master/assets/logo/cmb-white-nav-large.png` |
| `cmb-full-logo-ground-white-nav-medium.png` | `src/master/assets/logo/cmb-white-nav-medium.png` |
| `cmb-full-logo-ground-white-nav-small.png` | `src/master/assets/logo/cmb-white-nav-small.png` |
| `cmb-full-logo-ground-white-footer-large.png` | `src/master/assets/logo/cmb-white-footer-large.png` |
| `cmb-full-logo-ground-white-footer-medium.png` | `src/master/assets/logo/cmb-white-footer-medium.png` |
| `cmb-full-logo-ground-white-footer-small.png` | `src/master/assets/logo/cmb-white-footer-small.png` |

### 2. Flip white aliases → real imports

In `src/master/brand/logo-registry.ts`, replace the 10 `const cmbWhite* = cmbBlack*` aliases (lines 52–64) with real Vite imports. `MASTER_LOGOS.white` already references the right variable names — only the imports change.

### 3. Mark white as `ready`

Set `COLORWAY_STATUS.white = "ready"`. All three colorways (`black`, `navy`, `white`) will then be live.

### 4. Refresh slot map doc

Update `LOGO_SLOT_MAP.md`'s "Colorway file inventory" — flip the White column from ⏳ to ✅ and remove the "aliased to black" note.

### 5. Type-check

Run `tsc --noEmit` to confirm clean build.

## What this unlocks

With white live, `recommendedColorwayForSlot()` finally serves the **correct** asset for dark/image surfaces:

- **Hero** (image surface) → real white logo (was: black logo on photo, low contrast)
- **Loading splash** (asphalt dark) → real white logo (was: black on dark, near-invisible)
- **Any future dark section** (testimonials on graphite, footer-on-asphalt variants) → real white

This is the colorway that fixes the most actual rendering bugs, since hero + loading have been forcing `colorway="white"` but receiving a black-aliased file.

## Files touched

- **Created (10):** `src/master/assets/logo/cmb-white-*.png`
- **Edited (2):** `src/master/brand/logo-registry.ts`, `src/master/brand/LOGO_SLOT_MAP.md`
- **Untouched:** components, trade.config, checklist — already wired correctly.