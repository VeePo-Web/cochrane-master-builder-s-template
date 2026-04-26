# Cochrane Master Builders — Brand Bible

> **Single source of truth** for every brand decision: colors, marks, sizing, clear space, naming, and don'ts. If a rule is contested, this file wins.

---

## 1. The mark

**Cochrane Master Builders** ships as a family of seven coordinated marks:

| Family | What it is | Primary use |
|---|---|---|
| **Lockup** | Emblem + wordmark, stacked | Default brand mark. Nav, footer, hero, about, modal, 404. |
| **Lockup (with ground)** | Lockup framed by vertical plumb + horizontal base rule | Spec-grade contexts. Documents, certificates, project plates. |
| **Emblem** | The 3 navy diamond tiles + center "MB" script (no wordmark) | Square 1:1 surfaces. Favicon, profile pics, app icons, watermarks. |
| **Tiles** | The 3 diamond tiles only — no MB script (transparent center) | Kinetic identity. Pattern fills, animated assembly, decorative backdrop. |
| **MB monogram** | Just the handwritten "MB" letterform | Signature. Email footers, certificates, attribution, intimate contexts. |
| **Wordmark** | "MASTER BUILDERS / — COCHRANE —" type only | Editorial type voice. Section eyebrows, breadcrumbs, doc headers. |
| **Wordmark (with ground)** | Wordmark framed by drafting rule | Standalone brand statements. Chapter openers, deck covers, nameplates. |

> **Rule:** never `<img src="/.../cmb-...png">` directly. Always render through `<MasterLogo slot="..." />` so colorway, sizing, perf, and CLS are handled centrally and remixers can swap the colorway in one config flag.

---

## 2. Colors

The brand color is **navy `#1F2F4D`**. Three official colorways — pick one per trade in `trade.config.ts → identity.logoColorway`. Per-surface overrides allowed via the `colorway` prop on `<MasterLogo>`.

| Color | Hex | HSL | Use |
|---|---|---|---|
| **Navy (primary)** | `#1F2F4D` | `218° 43% 21%` | Default. White / light backgrounds. |
| **White** | `#FFFFFF` | `0° 0% 100%` | On navy, black, photographs, dark backgrounds. |
| **Black** | `#000000` | `0° 0% 0%` | Single-color print, embossing, blueprints. |

> **Rule of thumb:** navy on light, white on dark. Reserve black for single-color reproduction only (faxes, embossing, low-fidelity print).

The `recommendedColorwayForSlot()` helper in [`logo-registry.ts`](./logo-registry.ts) automates per-surface picks: dark + image surfaces always force `white`; light surfaces honor the trade's chosen colorway with a white→black fallback.

---

## 3. Size variants

### Lockup family (full logo)
`hero` (~2400px), `large` (~1200), `medium` (~800), `small` (~400),
`nav-large`, `nav-medium`, `nav-small`, `footer-large`, `footer-medium`, `footer-small`.

### Emblem & Tiles
`100, 200, 400, 800, 1200, 2400` px (square 1:1).

### MB monogram
`64, 128, 256, 512, 1024` px (height-based; never a hero asset).

### Wordmark & Wordmark-Ground
`200, 400, 800, 1200, 2400` px (width-based; ~5:1 aspect).

> **Why ladders matter:** every size in every family is a real PNG. We never CSS-resize a 2400px master down to a 32px favicon — that's a 70× scale-down that wastes bytes and looks soft. Vite bundles + tree-shakes the unused sizes per route.

---

## 4. File naming convention

```
cmb-{variation}-{color}-{size-label}.png
```

**Variation slugs:** `full-logo` (root family — no slug needed; just `cmb-{size}.png`), `emblem`, `tiles`, `mb-monogram`, `wordmark`, `wordmark-ground`.

**Color slugs:** `navy`, `white`, `black`.

**Examples:**
- `cmb-emblem-white-512.png`
- `cmb-tiles-black-200.png`
- `cmb-mb-monogram-navy-256.png`
- `cmb-wordmark-white-1200.png`
- `cmb-wordmark-ground-navy-800.png`

The legacy lockup family (no `{variation}` slug) was the first family embedded and kept its original naming for backward-compat: `cmb-nav-large.png`, `cmb-footer-medium.png`, `cmb-hero.png`, etc., with colorway prefixes for the navy/white variants (`cmb-navy-hero.png`, `cmb-white-footer-medium.png`).

---

## 5. Clear space & minimum size

- **Clear space:** maintain padding equal to the height of the "M" in MASTER on all sides of the full lockup. Never crop into this margin.
- **Minimum on-screen size:** full lockup ≥ **150 px wide**; emblem ≥ **32 px square**.
- **Minimum print size:** full lockup ≥ **0.75 in / 19 mm wide**.

---

## 6. Don'ts

- ❌ Don't recolor outside the navy / white / black palette.
- ❌ Don't apply drop shadows, gradients, strokes, or filters.
- ❌ Don't stretch, skew, or rotate.
- ❌ Don't reproduce on busy / photographic backgrounds without a navy or white panel behind the mark.
- ❌ Don't reconstruct or substitute fonts in the wordmark.
- ❌ Don't use the lockup smaller than 150 px wide — switch to the emblem.
- ❌ Don't use the monogram for nav, hero, or splash. It's a signature, not a brand mark.

---

## 7. Where things live in this repo

| Surface | Path | Read via |
|---|---|---|
| Bundled lockup + emblem + tiles + monogram + wordmark + wordmark-ground families | `src/master/assets/logo/` | `<MasterLogo slot="..." />` (never raw `<img>`) |
| Master source artwork (no-ground + with-ground originals) | `src/master/assets/logo/source/` | **Archive only** — never bundled to UI |
| In-context showcase boards | `src/master/assets/logo/boards/` | `MASTER_BOARDS` export in `logo-registry.ts`; rendered on `/brand` |
| Favicon ladder + PWA icons (navy + white reverse) | `public/favicon-*.png`, `public/android-chrome-*.png`, `public/apple-touch-icon.png` | `index.html` `<link rel="icon">` block + `prefers-color-scheme` media queries |
| PWA manifest | `public/site.webmanifest` | Browser auto-discovery |
| Social share + OG + profile pack | `public/share/` | `<meta property="og:image">` in `index.html` + `getShareAsset()` from `share-pack.ts` |
| Brand-kit page (boards + colors + rules + downloads) | `src/pages/Brand.tsx` → `/brand` | Direct URL only (not in nav) |

---

## 8. Code patterns — the only acceptable way to use the marks

### Nav / footer / hero / modal / about / 404
```tsx
import { MasterLogo } from "@/master/brand/MasterLogo";

<MasterLogo slot="nav" />          // resolves to size + colorway automatically
<MasterLogo slot="footer" />
<MasterLogo slot="hero" />
<MasterLogo slot="bookingModal" />
<MasterLogo slot="emblemFavicon" />
<MasterLogo slot="wordmarkSection" />
<MasterLogo slot="monogramSignature" />
```

### Per-surface colorway override
```tsx
<MasterLogo slot="footer" colorway="white" />   // force white on a dark footer
```

### Social share / OG / profile assets
```tsx
import { getShareAsset } from "@/master/brand/share-pack";

const ogUrl = getShareAsset("og");                       // → /share/og-1200x630-navybg.jpg
const profileUrl = getShareAsset("profile", "transparent"); // → /share/profile-400x400-transparent.png
```

### Showcase boards (brand-kit + press-kit only)
```tsx
import { MASTER_BOARDS } from "@/master/brand/logo-registry";

<img src={MASTER_BOARDS.lockupOnNavy} alt="Master Builders Cochrane lockup on navy" />
```

---

## 9. The full per-slot map

See [`LOGO_SLOT_MAP.md`](./LOGO_SLOT_MAP.md) for the complete table — every slot, every file, every component, every viewport breakpoint, every CLS box, every loading mode.

See [`LOGO_USAGE.md`](./LOGO_USAGE.md) for narrative usage rules and reasoning.

---

## 10. Master file → surface map (this brand bible's payload)

This section documents specifically where each file from the *uploaded master logo package* now lives in the repo and where it surfaces.

| Source file (uploaded) | Repo path | Surfaces / Consumers | When |
|---|---|---|---|
| `README.md` | `src/master/brand/BRAND_BIBLE.md` (this file) | `/brand` page (markdown render); referenced by every other brand doc | Single source of truth. Read first before any brand decision. |
| `MB_Master_Logo_1_cleaned.png` | `src/master/assets/logo/source/cmb-source-lockup-no-ground.png` | Archive only — never bundled to UI | Master file for re-deriving any future no-ground crop. |
| `MB_Master_Logo_2_original.png` | `src/master/assets/logo/source/cmb-source-lockup-with-ground.png` | Archive only — never bundled to UI | Master file for re-deriving any future with-ground crop. |
| `full-logo-on-white.png` | `src/master/assets/logo/boards/cmb-board-lockup-on-white.png` | `/brand` showcase grid; press-kit download | "Logo on light backgrounds" demonstration board. |
| `full-logo-on-black.png` | `src/master/assets/logo/boards/cmb-board-lockup-on-black.png` | `/brand` showcase grid; press-kit download | "Logo on dark backgrounds" demonstration board. |
| `full-logo-on-navy.png` | `src/master/assets/logo/boards/cmb-board-lockup-on-navy.png` | `/brand` showcase grid; press-kit download | "Logo on brand-navy backgrounds" demonstration board. |
| `emblem-on-black.png` | `src/master/assets/logo/boards/cmb-board-emblem-on-black.png` | `/brand` showcase grid; press-kit download | "Emblem on dark backgrounds" demonstration board. |
| `emblem-on-navy.png` | `src/master/assets/logo/boards/cmb-board-emblem-on-navy.png` | `/brand` showcase grid; press-kit download | "Emblem on brand-navy backgrounds" demonstration board. |

The remaining derivative assets the README describes (every size × every colorway across all 7 families) were embedded in earlier passes and live under `src/master/assets/logo/` (bundled), `public/` (favicon + PWA), and `public/share/` (social pack). See [`LOGO_SLOT_MAP.md`](./LOGO_SLOT_MAP.md) for the full inventory.

---

## 11. Cross-references

- Slot map: [`LOGO_SLOT_MAP.md`](./LOGO_SLOT_MAP.md)
- Usage rules: [`LOGO_USAGE.md`](./LOGO_USAGE.md)
- Component: [`MasterLogo.tsx`](./MasterLogo.tsx)
- Registry: [`logo-registry.ts`](./logo-registry.ts)
- Share pack: [`share-pack.ts`](./share-pack.ts)
- Brand identity tokens: [`identity.ts`](./identity.ts)
- Design-system style guide: [`style-guide.ts`](./style-guide.ts)
- Brand-kit page: [`/brand`](../../../pages/Brand.tsx)
- Source archive: [`../assets/logo/source/`](../assets/logo/source/)
- Showcase boards: [`../assets/logo/boards/`](../assets/logo/boards/)
- Remix checklist: [`../checklist.ts`](../checklist.ts)
