# Logo package integration — round 5

Two packages in this drop:

1. **White MB monogram** (5 sizes: 64 / 128 / 256 / 512 / 1024) — completes the monogram colorway matrix. Removes the last alias in the registry.
2. **Wordmark — black** (5 sizes: 200 / 400 / 800 / 1200 / 2400) — a brand-new **fifth asset family**: pure typography ("MASTER BUILDERS / COCHRANE" with hairline rule). Distinct role from lockup (lockup = wordmark + emblem stacked); the wordmark alone is for editorial / horizontal contexts where the emblem would crowd or compete.

After this round the brand system has five families:
**Lockup · Emblem · Tiles · Monogram · Wordmark.**

---

## The five-family decision rule (final)

| Family | Voice | When |
|---|---|---|
| Lockup | Formal first impression | Nav, footer, hero, marketing |
| Emblem | Repeat-appearance crest | Favicon, avatar, watermark, scroll-back |
| Tiles | Kinetic / built-from-pieces | Splash reveals, process motion, premium watermarks |
| Monogram | The human hand | Signatures, certificates, founder moments |
| **Wordmark** | **Editorial type voice** | **Section eyebrows, doc headers, press kit, horizontal rails, where the emblem would crowd** |

---

## Wordmark slot map (new)

Five dedicated slots, each tied to the size that prints sharpest at its display height:

| Size (px) | Slot key | Use case | Surface | Loading |
|---|---|---|---|---|
| 200  | `wordmarkInline`     | Inline body wordmark, byline strip, breadcrumb brand chip | light | lazy |
| 400  | `wordmarkSection`    | Section eyebrow above an H2, editorial divider label, modal header | light | lazy |
| 800  | `wordmarkDocument`   | Document/PDF header, quote letter masthead, press kit page header | light | lazy |
| 1200 | `wordmarkBanner`     | Wide hero strip alternative, cinema-bar caption, full-width brand band | any | lazy |
| 2400 | `wordmarkPrint`      | Print master, large-format banner, billboard wordmark | any | lazy |

Why a separate family (not just `large`/`medium` of the lockup): the existing `large` / `medium` / `hero` files are the **stacked lockup** (emblem above wordmark). The wordmark-only file removes the emblem so it can sit in horizontal rails (≥3:1 aspect) without dominating. Different shape, different role.

---

## Monogram update

`MONOGRAM_STATUS.white` flips from `"aliased"` → `"ready"`. White monogram is wired to its own files instead of pointing at black. `MASTER_LOGOS` reaches **zero aliases** across all five families.

---

## Technical changes

### Asset embedding (10 new files)
Copy uploads into `src/master/assets/logo/`:
- `cmb-mb-monogram-white-{64,128,256,512,1024}.png` — 5 files
- `cmb-wordmark-black-{200,400,800,1200,2400}.png` — 5 files

### `src/master/brand/logo-registry.ts`
- Import 5 white monogram PNGs; replace `MONOGRAM_WHITE = MONOGRAM_BLACK` alias with a real map.
- Import 5 black wordmark PNGs.
- Add `WordmarkSize` type (`200 | 400 | 800 | 1200 | 2400`) and `WORDMARK_SIZES` export.
- Add `WORDMARK_BLACK` map; `WORDMARK_NAVY` and `WORDMARK_WHITE` alias to black until those packages land.
- Add `wordmark` key to all three colorways inside `MASTER_LOGOS`.
- Add `WORDMARK_STATUS` (`black: ready`, `navy: aliased`, `white: aliased`).
- Set `MONOGRAM_STATUS.white = "ready"`.
- Append five `wordmark*` entries to `LOGO_USAGE_MAP` per the table above.

### `src/master/brand/MasterLogo.tsx`
- Extend `MasterLogoSlot` union with `"wordmark"`.
- Extend the `size` prop type with `WordmarkSize`.
- Add `SLOT_HEIGHT.wordmark = "h-auto w-auto"` (consumers control width).
- Add a `wordmark` branch mirroring the emblem/tiles srcset ladder (1x/2x/3x descriptors). `width` / `height` attributes use the file's natural ~5:1 aspect (size × size/5 rounded) to prevent CLS — actual computed via the bundled file's intrinsic ratio: set `width={size}` and `height={Math.round(size / 5)}`.

### `src/master/brand/LOGO_SLOT_MAP.md`
- Flip the white monogram column from ⏳ aliased → ✅ ready in the monogram table.
- Append a new **"Wordmark family"** section with the slot table, render API, and decision-rule callouts. Update the top-of-file decision rule to list five families.

### `src/master/checklist.ts`
- Add `"master-wordmark-binaries-embedded"` to the `CheckId` union.
- Append the matching `CheckItem` to `REMIX_CHECKLIST` (group `setup`, automated, references `WORDMARK_STATUS`).
- Update the `master-monogram-binaries-embedded` description: white now ✅ alongside black + navy.

### Verification
- TypeScript build green (`npx tsc -b --noEmit` via the existing build path).
- Spot-check that `MASTER_LOGOS.white.monogram[1024]` resolves to the white file and that `MASTER_LOGOS.black.wordmark[800]` resolves.

---

## Out of scope (intentionally deferred)
- Navy + white wordmark binaries — will alias to black until those packages land, identical pattern to how navy/white tiles were staged.
- Adopting `<MasterLogo slot="wordmark">` inside existing pages. This round only embeds and maps; surface adoption (e.g. dropping `wordmarkSection` into the About page eyebrow or `wordmarkDocument` into the booking confirmation PDF) is a follow-up so we can review placements deliberately.