## White tiles package received — completes the matrix

Six PNGs of the exploded mark in **white** (white-on-transparent — they appear as blank thumbnails on light surfaces, which is correct; they're meant for dark/image backgrounds). With this drop the tiles family hits the same fully-embedded state as the lockup and emblem families.

| Upload | Size |
|---|---|
| `cmb-tiles-white-100.png` | 100×100 |
| `cmb-tiles-white-200.png` | 200×200 |
| `cmb-tiles-white-400.png` | 400×400 |
| `cmb-tiles-white-800.png` | 800×800 |
| `cmb-tiles-white-1200.png` | 1200×1200 |
| `cmb-tiles-white-2400.png` | 2400×2400 |

## Slot map activation (no new slots — just the white branch goes live)

The slot keys (`tilesFavicon`, `tilesAvatar`, `tilesAccent`, `tilesProcess`, `tilesLoadingHero`, `tilesWatermark`) are unchanged. White was the surface-rule fallback that mattered most — these are the slots that immediately benefit:

| Slot                | Surface  | Before this drop          | After this drop       |
|---------------------|----------|---------------------------|-----------------------|
| `tilesLoadingHero`  | dark     | white → aliased to black  | **real white** ✅     |
| `tilesWatermark`    | image    | white → aliased to black  | **real white** ✅     |
| any slot, white trade | n/a    | aliased to black          | **real white** ✅     |
| any slot, explicit `colorway="white"` | n/a | aliased to black | **real white** ✅ |

This is the most important colorway for tiles because the **kinetic identity reveal** lives on the dark splash, where black tiles would have been invisible. Now the splash and watermark surfaces serve the correct contrast file.

## Steps

1. **Embed binaries** — copy 6 PNGs to `src/master/assets/logo/cmb-tiles-white-{100,200,400,800,1200,2400}.png`.
2. **Registry** (`src/master/brand/logo-registry.ts`):
   - Add 6 white tile imports.
   - Build real `TILES_WHITE` map (replacing the `= TILES_BLACK` alias).
   - Flip `TILES_STATUS.white` from `"aliased"` to `"ready"`.
3. **Doc** (`src/master/brand/LOGO_SLOT_MAP.md`) — readiness table: white column flips from "→ black" to real filenames with ✅. Update the trailing copy.
4. **Verify** — `tsc --noEmit` green.

No `MasterLogo.tsx` changes — the registry is data-driven.

## Files touched

- **Created (6):** `src/master/assets/logo/cmb-tiles-white-{100,200,400,800,1200,2400}.png`
- **Edited (2):** `src/master/brand/logo-registry.ts`, `src/master/brand/LOGO_SLOT_MAP.md`

## Result

Tiles family fully embedded across all 3 colorways × 6 sizes. `MASTER_LOGOS` contains zero aliases for any family. The dark splash reveal can now use real white tiles for the kinetic loading sequence — the most impactful slot in the whole tiles set.