## What you uploaded

The **navy emblem package** — same 6-size ladder as the black emblems, in the navy colorway:

| Upload | Pixel size | Maps to |
|---|---|---|
| `cmb-emblem-navy-100.png` | 100×100 | `emblemFavicon` (navy) |
| `cmb-emblem-navy-200.png` | 200×200 | `emblemAvatar` (navy) |
| `cmb-emblem-navy-400.png` | 400×400 | `emblemInline` (navy) |
| `cmb-emblem-navy-800.png` | 800×800 | `emblemAccent` (navy) |
| `cmb-emblem-navy-1200.png` | 1200×1200 | `emblemWatermark` (navy) |
| `cmb-emblem-navy-2400.png` | 2400×2400 | `emblemPrint` (navy) |

The slot map for the emblem family is already finalized — these 6 files just **fill in the navy column** that's currently aliased to black. Same as the lockup rollout: alias-then-flip pattern.

## What I'll do once approved

### 1. Embed the 6 navy emblem binaries

Copy each upload to `src/master/assets/logo/`:
- `cmb-emblem-navy-{100,200,400,800,1200,2400}.png`

### 2. Flip the navy alias to real imports

In `src/master/brand/logo-registry.ts`:
- Add 6 imports: `cmbEmblemNavy100` … `cmbEmblemNavy2400`.
- Build an `EMBLEM_NAVY` map mirroring `EMBLEM_BLACK`.
- Replace `MASTER_LOGOS.navy.emblem = EMBLEM_BLACK` with `EMBLEM_NAVY`.
- Update `EMBLEM_STATUS.navy` from `"aliased"` → `"ready"`.
- White emblem stays aliased to black until that package arrives.

### 3. Refresh the slot map

In `src/master/brand/LOGO_SLOT_MAP.md`, update the **Colorway readiness** table for the emblem family — navy column now shows real `cmb-emblem-navy-*.png` filenames with ✅; white stays aliased.

### 4. Type-check

Run `tsc --noEmit` to confirm the build is clean.

## Where the navy emblem will appear

Anywhere already calling `<MasterLogo slot="emblem" size={…} />` while the trade is on the navy colorway, or any explicit per-instance `colorway="navy"` override. No component code changes — the swap happens entirely through the registry.

Specifically, the navy emblem will surface on **light/cream backgrounds** when `TRADE.identity.logoColorway = "navy"` — softer than black on warm paper, same architectural read.

## Files touched

- **Created (6):** `src/master/assets/logo/cmb-emblem-navy-{100,200,400,800,1200,2400}.png`
- **Edited (2):** `src/master/brand/logo-registry.ts`, `src/master/brand/LOGO_SLOT_MAP.md`
- **Untouched:** components, trade.config, MasterLogo.tsx — zero risk to existing surfaces.

## Asks for next round

When ready, upload the **emblem white** package (same 6 sizes) and I'll finish the colorway matrix.