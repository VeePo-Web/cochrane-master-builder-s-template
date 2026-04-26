# Logo package integration — round 7

A new wordmark **variant** has arrived: the **"ground" wordmark** — the same MASTER BUILDERS / COCHRANE typography, but framed by a vertical plumb-line on the left and a horizontal base rule beneath ("grounded" by drafting/architect marks). This reads as **architectural / specification-grade** where the plain wordmark reads as **editorial type**.

Two packages this round:
1. **Wordmark Ground — black** (5 sizes: 200 / 400 / 800 / 1200 / 2400)
2. **Wordmark Ground — navy** (5 sizes: 200 / 400 / 800 / 1200 / 2400)

White ground variant is not yet provided — will alias to black until it lands (same staging pattern as previous rounds).

---

## Why a separate variant (not a replacement)

The plain wordmark and the ground wordmark are **siblings**, not versions of the same thing:

| Variant | Voice | Aspect | Use when |
|---|---|---|---|
| `wordmark` (plain) | Editorial / typographic | ~5:1 | Inline body, breadcrumbs, eyebrows above an H2, document mastheads. Sits *with* surrounding text. |
| `wordmarkGround` (this round) | Architectural / spec-grade / drafted | ~3.5:1 (plumb line adds height) | **Standalone** brand statements where the mark needs to feel anchored and authored — chapter openers, hero brand bands, certificate headers, project plate, capability deck cover. |

If the plain wordmark is the brand's **printed name**, the ground wordmark is the brand's **drafted signature on a blueprint title block**. They live side-by-side; the slot determines which one the page calls.

---

## Wordmark Ground slot map (new)

Five dedicated slots, mirroring the plain-wordmark size ladder so consumers can swap variants 1:1 by changing the slot key:

| Size (px) | Slot key                  | Use case                                                               | Surface | Loading |
|-----------|---------------------------|------------------------------------------------------------------------|---------|---------|
| 200       | `wordmarkGroundInline`    | Specification stamp inline in a spec sheet, drawing-set legend         | light   | lazy    |
| 400       | `wordmarkGroundChapter`   | Chapter / case-study opener title block (above a long-form section)    | light   | lazy    |
| 800       | `wordmarkGroundPlate`     | Project nameplate, "stamped by" plate on warranty/handoff documents    | light   | lazy    |
| 1200      | `wordmarkGroundBand`      | Hero brand band on About / Capabilities — anchors a wide section       | any     | lazy    |
| 2400      | `wordmarkGroundCover`     | Capabilities deck / proposal PDF cover, large-format presentation      | any     | lazy    |

The plumb + base rule are part of the artwork — consumers must not crop them, so the component sets a slightly taller CLS box than the plain wordmark (~3.5:1 instead of ~5:1).

---

## Technical changes

### Asset embedding (10 new files)
Copy uploads into `src/master/assets/logo/`:
- `cmb-wordmark-ground-black-{200,400,800,1200,2400}.png`
- `cmb-wordmark-ground-navy-{200,400,800,1200,2400}.png`

### `src/master/brand/logo-registry.ts`
- Import the 10 new ground wordmark PNGs.
- Add `WORDMARK_GROUND_BLACK` and `WORDMARK_GROUND_NAVY` maps. `WORDMARK_GROUND_WHITE` aliases to black until provided.
- Reuse the existing `WordmarkSize` type (same ladder) — keeps the size contract aligned between plain and ground variants.
- Add `wordmarkGround` key to all three colorways inside `MASTER_LOGOS`.
- Add `WORDMARK_GROUND_STATUS` (`black: ready`, `navy: ready`, `white: aliased`).
- Append five `wordmarkGround*` entries to `LOGO_USAGE_MAP` per the table above.

### `src/master/brand/MasterLogo.tsx`
- Extend `MasterLogoSlot` union with `"wordmarkGround"`.
- Add `SLOT_HEIGHT.wordmarkGround = "h-auto w-auto"`.
- Add a `wordmarkGround` render branch mirroring the plain-wordmark srcset ladder. CLS box uses `width={size}` and `height={Math.round(size / 3.5)}` to reserve the taller drafted aspect ratio.

### `src/master/brand/LOGO_SLOT_MAP.md`
- Append a new **"Wordmark Ground variant"** subsection under the wordmark family. Includes the slot table, colorway readiness, when-to-pick-which decision rule (plain vs ground), and render API.

### `src/master/checklist.ts`
- Add `"master-wordmark-ground-binaries-embedded"` to the `CheckId` union and as a `REMIX_CHECKLIST` item (group `setup`, automated, references `WORDMARK_GROUND_STATUS`).

### Verification
- `npx tsc --noEmit` clean.
- Spot-check `MASTER_LOGOS.navy.wordmarkGround[1200]` resolves to the navy ground file.

---

## Out of scope (intentionally deferred)
- White ground variant — aliased to black until uploaded.
- Surface adoption — actually placing `<MasterLogo slot="wordmarkGround">` into pages (chapter openers, project plates, deck cover). This round only embeds and maps, same as previous rounds.