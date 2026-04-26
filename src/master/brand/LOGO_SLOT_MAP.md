# Master Logo Slot Map

**Single source of truth** for every place the Cochrane Master Builders logo
appears across any remixed trade site. If you're adding a new surface that
needs a logo, add the slot here first, then to `LOGO_USAGE_MAP` in
`logo-registry.ts`, then render it through `<MasterLogo slot="..." />`.

> **Rule:** never `<img src="/.../cmb-...png">` directly in a component.
> Always go through `<MasterLogo>` so colorway, sizing, perf, and CLS are
> handled centrally and remixers can swap the colorway in one config flag.

---

## Per-slot map

| Slot              | File served                          | Component / Surface                     | When it shows                              | Surface tone       | Default colorway          | Loading | CLS box (w×h) |
|-------------------|--------------------------------------|-----------------------------------------|--------------------------------------------|--------------------|---------------------------|---------|---------------|
| `nav` mobile      | `cmb-nav-small.png` (9 KB)           | `Navigation.tsx` top bar                | viewport `<640px`, sticky                  | light (paper)      | trade colorway (CMB=black)| eager   | 280×224       |
| `nav` tablet      | `cmb-nav-medium.png` (15 KB)         | `Navigation.tsx`                        | `640–1023px`                               | light              | trade colorway            | eager   | 280×224       |
| `nav` desktop     | `cmb-nav-large.png` (29 KB)          | `Navigation.tsx`                        | `≥1024px`                                  | light              | trade colorway            | eager   | 280×224       |
| `footer` mobile   | `cmb-footer-small.png` (13 KB)       | `Footer.tsx` brand monument             | `<768px`                                   | light              | trade colorway            | lazy    | 400×320       |
| `footer` tablet   | `cmb-footer-medium.png` (21 KB)      | `Footer.tsx`                            | `768–1023px`                               | light              | trade colorway            | lazy    | 400×320       |
| `footer` desktop  | `cmb-footer-large.png` (47 KB)       | `Footer.tsx`                            | `≥1024px`                                  | light              | trade colorway            | lazy    | 400×320       |
| `hero`            | `cmb-hero.png` (490 KB — pre-cached) | Hero watermark / brand reveal           | first paint, above the fold                | image (photo bg)   | **white** (forced)        | eager   | full-bleed    |
| `loading`         | `cmb-small.png` (47 KB)              | 5-phase entry sequence (`loading-sequence`) | app boot, splash phases enter→exit     | dark (asphalt)     | **white** (forced)        | eager   | auto, w-28    |
| `bookingModal`    | `cmb-medium.png` (158 KB)            | Booking modal left rail                 | when modal opens (lg+)                     | light (bone)       | trade colorway            | lazy    | auto, max-w-sm|
| `about`           | `cmb-large.png` (323 KB)             | About-page brand monument               | `/about` route                             | light              | trade colorway            | lazy    | auto, max-w-lg|
| `notFound`        | `cmb-medium.png` (158 KB)            | 404 page                                | router fallback                            | light              | trade colorway            | lazy    | auto          |
| `email`           | `/og-image-cmb.png` (323 KB)         | Transactional email header              | quote/booking confirmations                | light              | trade colorway            | n/a     | 280 max-w     |
| `og`              | `/og-image-cmb.png` (323 KB)         | `<meta property="og:image">`            | social share crawler fetch                 | image              | (baked into og file)      | n/a     | 1200×630      |
| `favicon`         | `/favicon-cmb.png` (9 KB)            | `<link rel="icon">`                     | browser tab, bookmarks                     | any (browser-chrome)| (baked into favicon)     | n/a     | 32×32 → 256×256|

---

## Colorway file inventory

Per-colorway file paths the registry imports from. **All three colorways
are now fully embedded and live.**

| Slot variant   | Black ✅                  | Navy ✅                        | White ✅                       |
|----------------|---------------------------|--------------------------------|--------------------------------|
| nav small      | `cmb-nav-small.png`       | `cmb-navy-nav-small.png`       | `cmb-white-nav-small.png`      |
| nav medium     | `cmb-nav-medium.png`      | `cmb-navy-nav-medium.png`      | `cmb-white-nav-medium.png`     |
| nav large      | `cmb-nav-large.png`       | `cmb-navy-nav-large.png`       | `cmb-white-nav-large.png`      |
| footer small   | `cmb-footer-small.png`    | `cmb-navy-footer-small.png`    | `cmb-white-footer-small.png`   |
| footer medium  | `cmb-footer-medium.png`   | `cmb-navy-footer-medium.png`   | `cmb-white-footer-medium.png`  |
| footer large   | `cmb-footer-large.png`    | `cmb-navy-footer-large.png`    | `cmb-white-footer-large.png`   |
| hero           | `cmb-hero.png`            | `cmb-navy-hero.png`            | `cmb-white-hero.png`           |
| large          | `cmb-large.png`           | `cmb-navy-large.png`           | `cmb-white-large.png`          |
| medium         | `cmb-medium.png`          | `cmb-navy-medium.png`          | `cmb-white-medium.png`         |
| small          | `cmb-small.png`           | `cmb-navy-small.png`           | `cmb-white-small.png`          |

To switch the trade's primary colorway: set
`TRADE.identity.logoColorway = "black" | "navy" | "white"` in
`src/config/trade.config.ts`. Every slot (nav, footer, hero, loading, modal,
about, 404, email) flips in one shot via `<MasterLogo>`.

The `recommendedColorwayForSlot()` function still overrides per-surface:
**dark** and **image** surfaces (hero, loading splash) always force `white`
regardless of the trade's primary, ensuring contrast.

---

## Colorway decision tree

```text
                ┌─ slot surface? ─┐
                │                 │
            light/any            dark/image
                │                 │
       trade colorway       force "white"
       (white→black fallback)
                │
       per-instance override?
       (<MasterLogo colorway="..."/>)
                │
            final pick
```

Implemented in `recommendedColorwayForSlot(slot, tradeColorway)` —
`MasterLogo.tsx` calls it automatically. Override only when the surface
context is unusual (e.g. a hero photo that's unexpectedly bright and needs
the `black` lockup).

---

## Per-trade switch (the only knob remixers touch)

```ts
// src/config/trade.config.ts
export const TRADE = {
  identity: {
    // ...
    logoColorway: "black", // "black" | "navy" | "white"
  },
  // ...
};
```

Setting this one flag swaps every slot above to the matching colorway.
Navy + white are wired but currently alias to black until those PNG sets
are uploaded — see `COLORWAY_STATUS` in `logo-registry.ts`.

---

## Emblem family (square 1:1, no wordmark)

The **emblem** is a separate asset family from the full lockup. Where the
lockup says *who we are*, the emblem is the **repeat-appearance crest** —
favicons, avatars, watermarks, scroll-back buttons, print headers.

> **Rule of thumb:** lockup = first impression. Emblem = every time after.

### Sizes & recommended use

| Size (px) | Slot key          | Use case                                                  | Surface | Loading |
|-----------|-------------------|-----------------------------------------------------------|---------|---------|
| 100       | `emblemFavicon`   | Browser tab, list bullets, chat avatar (32–48px display)  | any     | eager   |
| 200       | `emblemAvatar`    | Nav-collapsed mark, mobile avatar, retina favicon         | any     | eager   |
| 400       | `emblemInline`    | Inline body badges, card crests, OG icon                  | light   | lazy    |
| 800       | `emblemAccent`    | Hero accent, section divider monogram, scroll-back-to-top | any     | lazy    |
| 1200      | `emblemWatermark` | Full-page watermark, splash crest, og-square (1200×1200)  | image   | lazy    |
| 2400      | `emblemPrint`     | Print master, billboard, 5K hero crest                    | any     | lazy    |

### Colorway readiness

| Variant | Black ✅                       | Navy ✅                       | White ✅                       |
|---------|--------------------------------|-------------------------------|--------------------------------|
| 100     | `cmb-emblem-black-100.png`     | `cmb-emblem-navy-100.png`     | `cmb-emblem-white-100.png`     |
| 200     | `cmb-emblem-black-200.png`     | `cmb-emblem-navy-200.png`     | `cmb-emblem-white-200.png`     |
| 400     | `cmb-emblem-black-400.png`     | `cmb-emblem-navy-400.png`     | `cmb-emblem-white-400.png`     |
| 800     | `cmb-emblem-black-800.png`     | `cmb-emblem-navy-800.png`     | `cmb-emblem-white-800.png`     |
| 1200    | `cmb-emblem-black-1200.png`    | `cmb-emblem-navy-1200.png`    | `cmb-emblem-white-1200.png`    |
| 2400    | `cmb-emblem-black-2400.png`    | `cmb-emblem-navy-2400.png`    | `cmb-emblem-white-2400.png`    |

All three colorways × six sizes are now embedded. `EMBLEM_STATUS` reports
`ready` for every colorway and `MASTER_LOGOS` contains zero aliases.

### Render API

```tsx
import MasterLogo from "@/master/brand/MasterLogo";

// Browser auto-picks DPR via srcset; size is the 1x base file
<MasterLogo slot="emblem" size={100}  />          // favicon-style
<MasterLogo slot="emblem" size={400}  />          // inline crest
<MasterLogo slot="emblem" size={1200} colorway="white" /> // dark watermark
```

The `size` prop selects the 1x source; the next two ladder steps are
attached as `2x` / `3x` srcset descriptors so retina screens stay sharp
without downloading the 2400 master on every device.

---

## Tiles family (exploded / deconstructed mark)

The **tiles** are the third asset family — three separated diamond panels
(top-left, top-right, bottom V-notch) with a glossy ribbed metallic
texture. Where the lockup says *who we are* and the emblem is the
*repeat-appearance crest*, the tiles are the **kinetic identity** —
the mark in motion, the mark assembling itself, the mark as architecture.

> **When to use which:**
> - **Lockup** → first impression, nav, footer, marketing hero
> - **Emblem** → favicon, avatar, watermark, scroll-back, repeat appearances
> - **Tiles** → motion sequences, process storytelling, splash reveals,
>   premium watermarks where the kinetic look beats the solid crest

### Sizes & recommended use

| Size (px) | Slot key            | Use case                                                            | Surface | Loading |
|-----------|---------------------|---------------------------------------------------------------------|---------|---------|
| 100       | `tilesFavicon`      | Alt favicon for staging / construction-mode environments            | any     | eager   |
| 200       | `tilesAvatar`       | Team / social avatar where the kinetic look beats the solid crest   | any     | eager   |
| 400       | `tilesAccent`       | Section divider mark — three panels can animate in sequence         | any     | lazy    |
| 800       | `tilesProcess`      | Process / craft pages — one tile per step, animated assembly        | light   | lazy    |
| 1200      | `tilesLoadingHero`  | Loading splash final reveal — tiles fly in and lock into position   | dark    | eager   |
| 2400      | `tilesWatermark`    | Full-page background watermark on premium pages at 6–10% opacity    | image   | lazy    |

### Colorway readiness

| Variant | Black ✅                       | Navy ✅                        | White ✅                       |
|---------|--------------------------------|--------------------------------|--------------------------------|
| 100     | `cmb-tiles-black-100.png`      | `cmb-tiles-navy-100.png`       | `cmb-tiles-white-100.png`      |
| 200     | `cmb-tiles-black-200.png`      | `cmb-tiles-navy-200.png`       | `cmb-tiles-white-200.png`      |
| 400     | `cmb-tiles-black-400.png`      | `cmb-tiles-navy-400.png`       | `cmb-tiles-white-400.png`      |
| 800     | `cmb-tiles-black-800.png`      | `cmb-tiles-navy-800.png`       | `cmb-tiles-white-800.png`      |
| 1200    | `cmb-tiles-black-1200.png`     | `cmb-tiles-navy-1200.png`      | `cmb-tiles-white-1200.png`     |
| 2400    | `cmb-tiles-black-2400.png`     | `cmb-tiles-navy-2400.png`      | `cmb-tiles-white-2400.png`     |

All three colorways × six sizes are now embedded. `TILES_STATUS` reports
`ready` for every colorway and `MASTER_LOGOS` contains zero aliases.
The kinetic identity reveal on the dark splash and any image-surface
watermark now serves the correct white file for contrast.

### Render API

```tsx
import MasterLogo from "@/master/brand/MasterLogo";

<MasterLogo slot="tiles" size={400}  />                       // accent / divider
<MasterLogo slot="tiles" size={800}  />                       // process step
<MasterLogo slot="tiles" size={1200} colorway="white" />      // splash / dark
<MasterLogo slot="tiles" size={2400} className="opacity-10" />// watermark
```

The `size` prop selects the 1x source; the registry attaches the next
two ladder steps as `2x` / `3x` srcset descriptors. Same DPR strategy
as the emblem family.

---

## Monogram family (handwritten "MB" signature)

The fourth asset family. Where the lockup is the formal identity, the
emblem is the repeat-appearance crest, and the tiles are the kinetic
identity, the **monogram is the human hand** — "signed personally by
the master builder." Use for closing moments, signatures, certificates,
intimate contexts. Never for nav, hero, or splash.

> **Five-family decision rule:**
> - **Lockup**   → first impression / formal identity (nav, footer, hero)
> - **Emblem**   → repeat-appearance crest (favicon, avatar, watermark)
> - **Tiles**    → kinetic / built-from-pieces (motion, splash, process)
> - **Monogram** → the human hand (signatures, certificates, founder)
> - **Wordmark** → editorial type voice (eyebrows, doc headers, horizontal rails)

### Sizes & recommended use

| Size (px) | Slot key              | Use case                                                            | Surface | Loading |
|-----------|-----------------------|---------------------------------------------------------------------|---------|---------|
| 64        | `monogramFavicon`     | Alt favicon for founder-mode / personal pages                       | any     | eager   |
| 128       | `monogramSignature`   | Email signature footer, quote letter, contract sign-off             | light   | lazy    |
| 256       | `monogramSealAccent`  | About-page founder card, story seal, testimonial attribution        | light   | lazy    |
| 512       | `monogramCertificate` | Warranty / completion certificate seal, project handoff             | light   | lazy    |
| 1024      | `monogramWatermark`   | Premium project case-study watermark (low opacity, signed-work)     | image   | lazy    |

### Colorway readiness

| Variant | Black ✅                          | Navy ✅                          | White ✅                          |
|---------|-----------------------------------|----------------------------------|-----------------------------------|
| 64      | `cmb-mb-monogram-black-64.png`    | `cmb-mb-monogram-navy-64.png`    | `cmb-mb-monogram-white-64.png`    |
| 128     | `cmb-mb-monogram-black-128.png`   | `cmb-mb-monogram-navy-128.png`   | `cmb-mb-monogram-white-128.png`   |
| 256     | `cmb-mb-monogram-black-256.png`   | `cmb-mb-monogram-navy-256.png`   | `cmb-mb-monogram-white-256.png`   |
| 512     | `cmb-mb-monogram-black-512.png`   | `cmb-mb-monogram-navy-512.png`   | `cmb-mb-monogram-white-512.png`   |
| 1024    | `cmb-mb-monogram-black-1024.png`  | `cmb-mb-monogram-navy-1024.png`  | `cmb-mb-monogram-white-1024.png`  |

`MONOGRAM_STATUS` reports `ready` for all three colorways. The monogram
has its own size ladder (no 2400) — it is never a hero asset. The white
monogram is the dark-surface variant for image / dark watermarks.

### Render API

```tsx
import MasterLogo from "@/master/brand/MasterLogo";

<MasterLogo slot="monogram" size={64}   />                    // founder favicon
<MasterLogo slot="monogram" size={128}  />                    // email signature
<MasterLogo slot="monogram" size={256}  />                    // about-page seal
<MasterLogo slot="monogram" size={512}  />                    // certificate seal
<MasterLogo slot="monogram" size={1024} className="opacity-10" /> // watermark
```

---

## Wordmark family (pure typography, no emblem)

The fifth and final asset family. Pure type — "MASTER BUILDERS" stacked
above "— COCHRANE —" with hairline rule. Where the **lockup** stacks the
emblem above this same wordmark, the **wordmark alone** strips the crest
so it can sit in horizontal rails (≥3:1 aspect) without the emblem
dominating. The editorial type voice.

> **When to reach for the wordmark vs. the lockup:**
> - **Lockup** → vertical/square containers, first impression, marketing
> - **Wordmark** → horizontal/inline contexts where the emblem would crowd:
>   section eyebrows, document headers, breadcrumb chips, press kit pages,
>   cinema-bar captions, full-width brand bands.

### Sizes & recommended use

| Size (px) | Slot key            | Use case                                                            | Surface | Loading |
|-----------|---------------------|---------------------------------------------------------------------|---------|---------|
| 200       | `wordmarkInline`    | Inline body wordmark, byline strip, breadcrumb brand chip           | light   | lazy    |
| 400       | `wordmarkSection`   | Section eyebrow above an H2, editorial divider label, modal header  | light   | lazy    |
| 800       | `wordmarkDocument`  | Document/PDF header, quote letter masthead, press kit page header   | light   | lazy    |
| 1200      | `wordmarkBanner`    | Wide hero strip alternative, cinema-bar caption, full-width band    | any     | lazy    |
| 2400      | `wordmarkPrint`     | Print master, large-format banner, billboard wordmark               | any     | lazy    |

### Colorway readiness

| Variant | Black ✅                          | Navy ⏳ (aliased) | White ⏳ (aliased) |
|---------|-----------------------------------|--------------------|---------------------|
| 200     | `cmb-wordmark-black-200.png`      | → black            | → black             |
| 400     | `cmb-wordmark-black-400.png`      | → black            | → black             |
| 800     | `cmb-wordmark-black-800.png`      | → black            | → black             |
| 1200    | `cmb-wordmark-black-1200.png`     | → black            | → black             |
| 2400    | `cmb-wordmark-black-2400.png`     | → black            | → black             |

`WORDMARK_STATUS` reports `ready` for black; navy + white alias to black
until those packages land — same staging pattern used for the tile family.

### Render API

```tsx
import MasterLogo from "@/master/brand/MasterLogo";

<MasterLogo slot="wordmark" size={200}  />                    // breadcrumb chip
<MasterLogo slot="wordmark" size={400}  />                    // section eyebrow
<MasterLogo slot="wordmark" size={800}  />                    // document header
<MasterLogo slot="wordmark" size={1200} className="w-full" /> // brand band
<MasterLogo slot="wordmark" size={2400} />                    // print master
```

The component sets `width={size}` and `height={Math.round(size/5)}` on
the `<img>` so the ~5:1 aspect ratio of the file is reserved before
the bytes arrive — zero CLS.

---

## Perf budget per slot

| Slot          | Max bytes | Why                                         |
|---------------|-----------|---------------------------------------------|
| `nav` mobile  | < 15 KB   | Above the fold on every page, every device. |
| `nav` desktop | < 35 KB   | Same — eager load.                          |
| `footer` *    | < 50 KB   | Below the fold, lazy-loaded.                |
| `hero`        | < 600 KB  | LCP candidate — keep tight.                 |
| `loading`     | < 50 KB   | Splash phase, must be inline-fast.          |
| `og`          | < 400 KB  | Social crawler limits.                      |
| `favicon`     | < 12 KB   | Sent on every cold request.                 |

If a slot exceeds budget, re-export from the master Figma at the recommended
size before adding compression — never just compress harder.

---

## How to add a new slot

1. Add the slot key + metadata to `LOGO_USAGE_MAP` in
   `src/master/brand/logo-registry.ts` (declare its `surface`).
2. Add the slot key to `MasterLogoSlot` union and `SLOT_HEIGHT` in
   `src/master/brand/MasterLogo.tsx`.
3. Add a row to the table above with the file, trigger, surface, and CLS box.
4. Render via `<MasterLogo slot="yourSlot" />` — never an `<img>` direct.
5. Tick `master-logo-rendering` in the remix checklist after verifying.

---

## Cross-references

- Component: [`MasterLogo.tsx`](./MasterLogo.tsx)
- Registry: [`logo-registry.ts`](./logo-registry.ts)
- Usage rules: [`LOGO_USAGE.md`](./LOGO_USAGE.md)
- Brand identity: [`identity.ts`](./identity.ts)
- Remix checklist: [`../checklist.ts`](../checklist.ts)
