## Navy tiles package received

Six PNGs of the exploded mark in **navy** — same three-panel composition as the black tiles, in the brand navy ink. Completes 2 of 3 colorways for the tiles family.

| Upload | Size |
|---|---|
| `cmb-tiles-navy-100.png` | 100×100 |
| `cmb-tiles-navy-200.png` | 200×200 |
| `cmb-tiles-navy-400.png` | 400×400 |
| `cmb-tiles-navy-800.png` | 800×800 |
| `cmb-tiles-navy-1200.png` | 1200×1200 |
| `cmb-tiles-navy-2400.png` | 2400×2400 |

## Slot map (no new slots — colorway routing only)

The tiles slot map is already defined (`tilesFavicon`, `tilesAvatar`, `tilesAccent`, `tilesProcess`, `tilesLoadingHero`, `tilesWatermark`). Adding navy doesn't introduce new slots — it activates the navy branch of the routing matrix:

| Slot              | Surface | When trade `logoColorway = "navy"` | When forced `colorway="navy"` |
|-------------------|---------|------------------------------------|-------------------------------|
| `tilesFavicon`    | any     | navy ✅ (now real)                 | navy ✅                       |
| `tilesAvatar`     | any     | navy ✅                            | navy ✅                       |
| `tilesAccent`     | any     | navy ✅                            | navy ✅                       |
| `tilesProcess`    | light   | navy ✅                            | navy ✅                       |
| `tilesLoadingHero`| dark    | white (forced — surface rule)      | navy ✅                       |
| `tilesWatermark`  | image   | white (forced — surface rule)      | navy ✅                       |

Surface logic stays as-is: dark / image surfaces still force white for contrast (white still aliased to black until the white tile package lands). When the trade picks navy, every "any" / "light" tile slot now serves the real navy file.

## Steps

1. **Embed binaries** — copy 6 PNGs to `src/master/assets/logo/cmb-tiles-navy-{100,200,400,800,1200,2400}.png`.
2. **Registry** (`src/master/brand/logo-registry.ts`):
   - Add 6 navy tile imports.
   - Build `TILES_NAVY` map (real, replacing the `= TILES_BLACK` alias).
   - Flip `TILES_STATUS.navy` from `"aliased"` to `"ready"`.
3. **Doc** (`src/master/brand/LOGO_SLOT_MAP.md`) — update the tile colorway readiness table: navy column flips from "→ black" aliases to real filenames with ✅.
4. **Verify** — `tsc --noEmit` green.

No `MasterLogo.tsx` changes — colorway resolution is data-driven; it just picks up the new map.

## Files touched

- **Created (6):** `src/master/assets/logo/cmb-tiles-navy-{100,200,400,800,1200,2400}.png`
- **Edited (2):** `src/master/brand/logo-registry.ts`, `src/master/brand/LOGO_SLOT_MAP.md`

## Result

After this lands: `<MasterLogo slot="tiles" colorway="navy" />` and `TRADE.identity.logoColorway = "navy"` both serve the real navy tile assets. Only the white tiles package remains before the tiles matrix is fully complete.