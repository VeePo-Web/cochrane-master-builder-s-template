## What you uploaded — fourth asset family: MB monogram

A handwritten **MB** signature mark — flowing script with the `M` and `B` interlocked. Two colorways uploaded together (black + navy), 5 sizes each. White will land later; until then it aliases to black, same pattern as before.

| Colorway | Sizes | Files |
|---|---|---|
| Black ✅ | 64, 128, 256, 512, 1024 | `cmb-mb-monogram-black-{64,128,256,512,1024}.png` |
| Navy ✅  | 64, 128, 256, 512, 1024 | `cmb-mb-monogram-navy-{64,128,256,512,1024}.png` |
| White ⏳ | aliased to black until uploaded |

Different size ladder than emblem/tiles (no 2400) because the monogram is **never** a hero asset — it's a signature, used small. Capping at 1024 keeps the registry honest.

## Why it's its own family (not just another emblem variant)

Three families already have clear personalities:

- **Lockup** = first impression / formal identity
- **Emblem** = solid crest / repeat appearance
- **Tiles** = kinetic / built-from-pieces

The **monogram** adds a fourth voice the other three can't carry: **the human hand**. It says "signed personally by the master builder." That's a different rhetorical job — perfect for closing moments, signatures, certificates, intimate contexts. Wrong for nav, wrong for hero, wrong for splash. This is why it gets its own slot map.

## Slot map — where it goes when

| Slot key            | Default size | Use case                                                                     | Surface | Loading |
|---------------------|--------------|------------------------------------------------------------------------------|---------|---------|
| `monogramFavicon`   | 64           | Alt favicon for "founder mode" / personal pages                              | any     | eager   |
| `monogramSignature` | 128          | Email signature footer, quote letter, contract sign-off (`— Master Builder`) | light   | lazy    |
| `monogramSealAccent`| 256          | About-page founder card, story-section seal, testimonial quote attribution   | light   | lazy    |
| `monogramCertificate`| 512         | Warranty / completion certificate seal, project handoff documents            | light   | lazy    |
| `monogramWatermark` | 1024         | Premium project case-study watermark (low opacity, signed-work aesthetic)    | image   | lazy    |

Surface logic stays as-is: `dark` and `image` slots auto-pick white (which currently aliases to black until that package arrives), so `monogramWatermark` will pop correctly the moment the white binaries land — no code change needed.

## Files I'll create / edit

### Create (10 binaries)
`src/master/assets/logo/cmb-mb-monogram-{black,navy}-{64,128,256,512,1024}.png`

### Edit `src/master/brand/logo-registry.ts`
- 10 monogram imports (5 black + 5 navy).
- New `MonogramSize = 64 | 128 | 256 | 512 | 1024` type (own ladder, no 2400).
- `MONOGRAM_BLACK`, `MONOGRAM_NAVY` real maps; `MONOGRAM_WHITE = MONOGRAM_BLACK` alias.
- Add `monogram: MONOGRAM_*` to each colorway in `MASTER_LOGOS`.
- Add `MONOGRAM_STATUS: Record<LogoColorway, "ready" | "aliased">` → black ready, navy ready, white aliased.
- Add `MONOGRAM_SIZES` export.
- Add 5 `monogram*` slot entries to `LOGO_USAGE_MAP` with surface tones from the table.

### Edit `src/master/brand/MasterLogo.tsx`
- Add `"monogram"` to `MasterLogoSlot` union.
- Add `MonogramSize` to the `size` prop type union.
- Add `monogram: "h-auto w-auto"` to `SLOT_HEIGHT`.
- Add a `slot === "monogram"` branch — same srcset 1x/2x/3x ladder pattern as emblem and tiles, walking the monogram size ladder.

### Edit `src/master/brand/LOGO_SLOT_MAP.md`
- Append a "Monogram family (handwritten signature)" section: when-to-use blurb, sizes table, colorway readiness matrix, render API examples, and the updated 4-family decision rule (lockup vs emblem vs tiles vs monogram).

### Edit `src/master/checklist.ts`
- Add `master-monogram-binaries-embedded` check ID and entry.

### Validation
- `tsc --noEmit` clean.

## Result

`<MasterLogo slot="monogram" size={128} />` works anywhere after this. Trade colorway routing applies automatically — black/navy serve real files, white silently routes to black until that package arrives, and the founder/signature/certificate/watermark surfaces have a dedicated mark with the right voice.