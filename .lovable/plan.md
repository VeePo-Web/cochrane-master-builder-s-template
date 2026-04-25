## What you uploaded

The **white emblem package** — final 6 sizes that complete the colorway matrix:

| Upload | Pixel size | Maps to (white) |
|---|---|---|
| `cmb-emblem-white-100.png` | 100×100 | `emblemFavicon` |
| `cmb-emblem-white-200.png` | 200×200 | `emblemAvatar` |
| `cmb-emblem-white-400.png` | 400×400 | `emblemInline` |
| `cmb-emblem-white-800.png` | 800×800 | `emblemAccent` |
| `cmb-emblem-white-1200.png` | 1200×1200 | `emblemWatermark` |
| `cmb-emblem-white-2400.png` | 2400×2400 | `emblemPrint` |

These are white-on-transparent — they appear blank in chat preview because they're rendering against a white message background, but they're real assets with alpha. White emblems are the **forced default for dark and image surfaces** (loading splash, hero watermark) regardless of the trade's primary colorway, so this is the highest-impact piece of the matrix.

## What I'll do once approved

### 1. Embed the 6 white emblem binaries

Copy each to `src/master/assets/logo/cmb-emblem-white-{100,200,400,800,1200,2400}.png`.

### 2. Flip the white alias to real imports

In `src/master/brand/logo-registry.ts`:
- Add 6 imports: `cmbEmblemWhite100` … `cmbEmblemWhite2400`.
- Build an `EMBLEM_WHITE` map mirroring `EMBLEM_BLACK` / `EMBLEM_NAVY`.
- Replace `MASTER_LOGOS.white.emblem = EMBLEM_BLACK` (alias) with `EMBLEM_WHITE`.
- Update `EMBLEM_STATUS.white` from `"aliased"` → `"ready"`.

### 3. Refresh the slot map

In `src/master/brand/LOGO_SLOT_MAP.md`, update the emblem **Colorway readiness** table — white column shows real `cmb-emblem-white-*.png` filenames with ✅. Strip the "white aliased" callout below the table since the matrix is complete.

### 4. Type-check

Run `tsc --noEmit` to confirm clean build.

## Where the white emblem will appear

`recommendedColorwayForSlot()` already routes white automatically for:
- **dark** surface slots (loading splash)
- **image** surface slots (hero watermark, `emblemWatermark`)

…so any existing `<MasterLogo slot="emblem" size={…} />` rendered on those surfaces will pick up the real white asset the moment this lands. Plus any explicit `<MasterLogo … colorway="white" />` overrides.

## Files touched

- **Created (6):** `src/master/assets/logo/cmb-emblem-white-{100,200,400,800,1200,2400}.png`
- **Edited (2):** `src/master/brand/logo-registry.ts`, `src/master/brand/LOGO_SLOT_MAP.md`
- **Untouched:** components, MasterLogo, trade.config, checklist — zero risk.

## Result

After this lands, **all three colorways × both families (lockup + emblem) are fully embedded** with real PNGs — no aliases anywhere in `MASTER_LOGOS`. Brand backend is complete.