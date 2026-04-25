## What you uploaded vs what's already in place

You re-uploaded the **black colorway** (10 PNGs). The registry, `<MasterLogo>` component, trade config flag, and 3-colorway architecture are already wired from the previous turns — black is marked `ready`, navy + white are `pending` and currently alias to black so the build stays green.

What still needs to happen for the black set to be **fully** embedded (vs partially placeholdered):

| File on disk | Status today | Action |
|---|---|---|
| `cmb-hero.png` (471 KB) | real | keep |
| `cmb-large.png` (310 KB) | real | keep |
| `cmb-medium.png` (152 KB) | real | keep |
| `cmb-nav-{lg,md,sm}.png` | real | keep |
| `cmb-footer-{lg,md}.png` | real | keep |
| `cmb-footer-small.png` | placeholder (44 KB shared hash) | **overwrite from upload** |
| `cmb-small.png` | placeholder (same 44 KB hash as footer-large) | **overwrite from upload** |
| `public/favicon-cmb.png` | placeholder (44 KB) | **overwrite from `cmb-nav-small`** (square crop) |
| `public/og-image-cmb.png` | placeholder (44 KB) | **overwrite from `cmb-large`** (1200×630-ish hero card) |

Navy + white binaries are not in this upload, so they stay aliased to black and `COLORWAY_STATUS` keeps `pending` for those two — no code changes needed for them this round.

## The slot map (what goes where, when)

This is the new document you asked for — `src/master/brand/LOGO_SLOT_MAP.md` — a single canonical reference for every place a logo appears across any remixed trade site:

| Slot | File served | Component / Surface | Trigger / When | Surface tone | Default colorway |
|---|---|---|---|---|---|
| `nav` (mobile) | `cmb-nav-small.png` | `Navigation.tsx` top bar | viewport `<640px`, always visible | light (paper) | trade colorway (black for CMB) |
| `nav` (tablet) | `cmb-nav-medium.png` | `Navigation.tsx` | `640–1023px` | light | trade colorway |
| `nav` (desktop) | `cmb-nav-large.png` | `Navigation.tsx` | `≥1024px` | light | trade colorway |
| `footer` (mobile) | `cmb-footer-small.png` | `Footer.tsx` brand monument | `<768px` | light | trade colorway |
| `footer` (tablet) | `cmb-footer-medium.png` | `Footer.tsx` | `768–1023px` | light | trade colorway |
| `footer` (desktop) | `cmb-footer-large.png` | `Footer.tsx` | `≥1024px` | light | trade colorway |
| `hero` | `cmb-hero.png` | Hero watermark / brand reveal | first paint, eager-loaded | image (photo bg) | white (forced) |
| `loading` | `cmb-small.png` | 5-phase entry sequence | app boot, splash | dark | white (forced) |
| `bookingModal` | `cmb-medium.png` | Booking modal left rail | when modal opens (lg+) | light (bone) | trade colorway |
| `about` | `cmb-large.png` | About page brand monument | About route | light | trade colorway |
| `notFound` | `cmb-medium.png` | 404 page | router fallback | light | trade colorway |
| `email` | `/og-image-cmb.png` | Transactional email header | quote/booking confirmations | light | trade colorway |
| `og` | `/og-image-cmb.png` | `<meta property="og:image">` | social share | image | (whichever is baked into og file) |
| `favicon` | `/favicon-cmb.png` | `<link rel="icon">` | browser tab, bookmarks | any | (whichever is baked into favicon) |

Plus a "decision tree" diagram inside the doc for picking colorway from surface tone.

## Files to change

1. **Overwrite 4 placeholder binaries** with the real uploaded artwork:
   - `src/master/assets/logo/cmb-small.png` ← `cmb-full-logo-ground-black-small.png`
   - `src/master/assets/logo/cmb-footer-small.png` ← `cmb-full-logo-ground-black-footer-small.png`
   - `public/favicon-cmb.png` ← `cmb-full-logo-ground-black-nav-small.png` (square crop reads best at 32px)
   - `public/og-image-cmb.png` ← `cmb-full-logo-ground-black-large.png` (1200-ish wide, white bg, social-safe)

2. **Re-copy the 6 already-on-disk files** from the upload to guarantee they match the canonical master (the current bytes on disk came from the same earlier upload, but doing a clean overwrite removes any drift):
   - `cmb-hero.png`, `cmb-large.png`, `cmb-medium.png`, `cmb-nav-{lg,md,sm}.png`, `cmb-footer-{lg,md}.png`

3. **Create `src/master/brand/LOGO_SLOT_MAP.md`** — the canonical slot-by-slot map above, with the colorway decision tree and per-slot perf notes (eager vs lazy, width/height for CLS, max bytes budget).

4. **Update `src/master/checklist.ts`** — flip the "embed real black PNGs" checklist row to ✅ and add a new row that points at `LOGO_SLOT_MAP.md` as the single reference for new remixes.

5. **Update `src/master/index.ts`** — re-export `LOGO_USAGE_MAP`, `LogoSlot`, and `recommendedColorwayForSlot` so remixers can consume the map programmatically (e.g. for a debug/inventory screen) without reaching into `brand/`.

6. **No changes to** `logo-registry.ts`, `MasterLogo.tsx`, `trade.config.ts`, `Navigation.tsx`, `Footer.tsx`, `index.html`, `seo.ts` — they already reference the right slots; swapping the binaries is enough for them to pick up the real artwork automatically.

## After this lands

- Black colorway is 100% real artwork end-to-end — nav, footer, hero, loading, modal, about, 404, email, OG, favicon.
- Navy + white colorways stay aliased to black (`COLORWAY_STATUS.pending`) and will swap in instantly when you re-upload them — no other file changes needed.
- Every future remix has one document (`LOGO_SLOT_MAP.md`) that tells them exactly which file shows up where, when, and in which colorway.