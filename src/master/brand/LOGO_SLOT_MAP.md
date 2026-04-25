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

Per-colorway file paths the registry imports from. Black + navy are fully
embedded. White still pending upload (aliases to black at runtime).

| Slot variant   | Black ✅                  | Navy ✅                        | White ⏳ (aliased to black) |
|----------------|---------------------------|--------------------------------|------------------------------|
| nav small      | `cmb-nav-small.png`       | `cmb-navy-nav-small.png`       | `cmb-white-nav-small.png`    |
| nav medium     | `cmb-nav-medium.png`      | `cmb-navy-nav-medium.png`      | `cmb-white-nav-medium.png`   |
| nav large      | `cmb-nav-large.png`       | `cmb-navy-nav-large.png`       | `cmb-white-nav-large.png`    |
| footer small   | `cmb-footer-small.png`    | `cmb-navy-footer-small.png`    | `cmb-white-footer-small.png` |
| footer medium  | `cmb-footer-medium.png`   | `cmb-navy-footer-medium.png`   | `cmb-white-footer-medium.png`|
| footer large   | `cmb-footer-large.png`    | `cmb-navy-footer-large.png`    | `cmb-white-footer-large.png` |
| hero           | `cmb-hero.png`            | `cmb-navy-hero.png`            | `cmb-white-hero.png`         |
| large          | `cmb-large.png`           | `cmb-navy-large.png`           | `cmb-white-large.png`        |
| medium         | `cmb-medium.png`          | `cmb-navy-medium.png`          | `cmb-white-medium.png`       |
| small          | `cmb-small.png`           | `cmb-navy-small.png`           | `cmb-white-small.png`        |

To activate navy site-wide: set `TRADE.identity.logoColorway = "navy"` in
`src/config/trade.config.ts`. Every slot (nav, footer, hero, loading, modal,
about, 404, email) flips in one shot via `<MasterLogo>`.

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
