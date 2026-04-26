## What you uploaded — a brand-new asset family

Six PNGs of the **deconstructed/exploded emblem**: three separated diamond panels (top-left, top-right, bottom V-notch) rendered with a glossy ribbed metallic texture against transparent background. This is **not** the solid emblem — it's the **tiled/exploded** treatment.

| Upload | Size |
|---|---|
| `cmb-tiles-black-100.png` | 100×100 |
| `cmb-tiles-black-200.png` | 200×200 |
| `cmb-tiles-black-400.png` | 400×400 |
| `cmb-tiles-black-800.png` | 800×800 |
| `cmb-tiles-black-1200.png` | 1200×1200 |
| `cmb-tiles-black-2400.png` | 2400×2400 |

This is a **third asset family** alongside lockup (full wordmark) and emblem (solid mark). Naming it "tiles" because the three pieces read like architectural tiles / structural panels — fitting for Master Builders.

## What "tiles" is for (slot map)

The exploded form has different storytelling than the solid emblem. Each tile reads as a separate construction unit, so it's strongest where the brand wants to convey **structure / craft / assembly**, especially with motion.

| Slot key | Default size | Use case | Surface |
|---|---|---|---|
| `tilesAccent` | 400 | Section divider mark — sits between editorial blocks; can animate the three panels in sequence | light/any |
| `tilesProcess` | 800 | "Our process" / craft pages — one tile per step, animated assembly | light |
| `tilesLoadingHero` | 1200 | Loading splash final reveal — tiles fly in and lock into position (kinetic identity moment) | dark |
| `tilesWatermark` | 2400 | Full-page background watermark on premium pages (about, project case studies) at 6–10% opacity | image/any |
| `tilesFavicon` | 100 | Optional alt favicon for "construction mode" / staging environments — distinguishes from prod | any |
| `tilesAvatar` | 200 | Team/social avatar where the trade wants the kinetic look over the solid crest | any |

The colorway story for tiles parallels the emblem: black is master, navy + white will follow when uploaded. Until they do, those colorways alias to black (same pattern as before, fully wired so swapping is a one-line flip).

## What I'll do once approved

### 1. Embed the 6 black tile binaries

Copy each to `src/master/assets/logo/cmb-tiles-black-{100,200,400,800,1200,2400}.png`.

### 2. Extend the registry (`src/master/brand/logo-registry.ts`)

- Add 6 tile imports.
- Build a `TILES_BLACK` map keyed by px size (100–2400), shape mirroring `EMBLEM_BLACK`.
- Reuse the existing `EmblemSize` type as `TileSize` (same ladder) — single source of truth for the size ladder.
- Add `tiles` to each colorway in `MASTER_LOGOS`. Black = real, navy + white alias to `TILES_BLACK`.
- Add `TILES_STATUS: Record<LogoColorway, "ready" | "aliased">` → black ready, navy/white aliased.
- Add 6 `tiles*` slots to `LOGO_USAGE_MAP` with the surface tones from the table above.
- Extend `recommendedColorwayForSlot` — no changes needed, the existing surface logic already routes correctly.

### 3. Extend `<MasterLogo>` (`src/master/brand/MasterLogo.tsx`)

- Add `"tiles"` to `MasterLogoSlot` union.
- Add `tiles` height entry to `SLOT_HEIGHT` (`h-auto w-auto`, contained).
- Add a `slot === "tiles"` branch mirroring the emblem srcset ladder — accepts the same `size` prop, builds 1x/2x/3x descriptors.
- Single component, single API: `<MasterLogo slot="tiles" size={400} />`.

### 4. Document in `LOGO_SLOT_MAP.md`

Add a new "Tiles family (exploded mark)" section with:
- The slot table above (use case, surface, default size).
- Colorway readiness matrix (black ✅, navy/white aliased).
- Render API examples.
- A "When to use tiles vs emblem vs lockup" decision blurb so remixers don't pick the wrong one.

### 5. Validation

- Add `master-tiles-binaries-embedded` check to `src/master/checklist.ts`.
- Run `tsc --noEmit` for a clean typecheck.

## Files touched

- **Created (6):** `src/master/assets/logo/cmb-tiles-black-{100,200,400,800,1200,2400}.png`
- **Edited (4):** `src/master/brand/logo-registry.ts`, `src/master/brand/MasterLogo.tsx`, `src/master/brand/LOGO_SLOT_MAP.md`, `src/master/checklist.ts`
- **No component-level usage added yet** — this lands the tiles in the backend so they're available to render. Wiring them into a specific page (loading splash, about-page watermark, etc.) is a separate creative call you'll want to make per-trade.

## Result

After this lands: `<MasterLogo slot="tiles" size={400} />` works anywhere in the app, picks the trade colorway automatically (black for now across all three until navy/white tile packages arrive), and serves a retina-aware srcset.