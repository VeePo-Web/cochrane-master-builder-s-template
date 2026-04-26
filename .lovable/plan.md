## What you uploaded

**Group A — Wordmark Ground / White (5 PNGs)**
The missing reverse colorway for the drafted wordmark variant. Closes the last alias in the entire 5-family matrix.
- `cmb-wordmark-ground-white-200/400/800/1200/2400.png`

**Group B — MB-diamond favicon / PWA icon pack (5 files)**
A brand-new asset class: the navy MB-diamond emblem (drafted texture) sized for browser chrome and installable PWA contexts. Distinct from the existing wordmark/lockup/emblem PNG families — these are root-public files referenced by `<link>` tags and the web manifest, not by React components.
- `favicon.ico` — multi-res classic favicon (legacy browsers, Windows pinned tabs)
- `favicon-16.png` — 16×16 sharp tab icon
- `apple-touch-icon.png` — 180×180 iOS home-screen icon
- `android-chrome-192x192.png` — Android home-screen / PWA install
- `android-chrome-512x512.png` — PWA splash + maskable source

---

## Plan

### 1. Wordmark-Ground White — finalize the matrix

- **Embed** 5 PNGs at `src/master/assets/logo/cmb-wordmark-ground-white-{200,400,800,1200,2400}.png`.
- **Registry** (`src/master/brand/logo-registry.ts`):
  - Add 5 imports for `cmbWordmarkGroundWhite*`.
  - Replace the `WORDMARK_GROUND_WHITE = WORDMARK_GROUND_BLACK` alias with a real map.
  - Flip `WORDMARK_GROUND_STATUS.white` from `"aliased"` → `"ready"`.
- **Slot map** (`LOGO_SLOT_MAP.md`): update the wordmark-ground readiness row + remove the "white aliases to black" caveat.
- **Checklist** (`src/master/checklist.ts`): mark `master-wordmark-ground-white-binaries-embedded` complete.

Net effect: every cell in the 5-family × 3-colorway matrix is now a real binary. **Zero aliases anywhere.**

### 2. Favicon / PWA pack — replace the legacy single-file favicon

The current site references one flat `/favicon-cmb.png` (the old CMB lockup) for both `rel="icon"` and `rel="apple-touch-icon"`. The new MB-diamond pack is a proper multi-resolution navy-on-transparent system that will render crisply at every chrome size and unlocks PWA install.

- **Copy** all 5 files to `/public/`:
  - `public/favicon.ico`
  - `public/favicon-16.png`
  - `public/apple-touch-icon.png` (180×180)
  - `public/android-chrome-192x192.png`
  - `public/android-chrome-512x512.png`
- **Wire `index.html`** with the proper full link block:
  ```html
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  ```
- **Add a `public/site.webmanifest`** that declares the PWA identity:
  - `name`: "Cochrane Master Builders"
  - `short_name`: "CMB"
  - `icons`: 192 + 512 entries (any + maskable purposes)
  - `theme_color`: `#F2EDE4` (matches existing meta)
  - `background_color`: `#1a2438` (navy, matches the new mark)
  - `display`: `standalone`
- **Keep `favicon-cmb.png`** in `public/` for now — it's still referenced by the email/og fallback paths in the slot map. We'll deprecate it in a separate pass once those references migrate.

### 3. Slot-map documentation — add a new section

Append a new section to `src/master/brand/LOGO_SLOT_MAP.md`:

**"Browser chrome & PWA pack"** — documents the `/public/` favicon set as a separate concern from the React `<MasterLogo>` system. Includes a per-file usage table:

| File | Slot | Renders in | Surface |
|---|---|---|---|
| `favicon.ico` | classic favicon | Legacy IE/Edge, Windows pinned tabs | browser chrome |
| `favicon-16.png` | sharp 16px tab | Modern desktop tabs at 100% zoom | browser chrome |
| `apple-touch-icon.png` | iOS home screen | "Add to Home Screen" on Safari iOS | iOS springboard |
| `android-chrome-192x192.png` | Android install | PWA install prompt, app drawer icon | Android launcher |
| `android-chrome-512x512.png` | PWA splash / maskable | Splash screen, adaptive icon source | PWA runtime |
| `site.webmanifest` | PWA identity | Install prompt metadata | browser chrome |

Plus a "decision rule" callout:
> Browser-chrome icons live in `/public/` and are referenced by `<link>` tags — **never** through `<MasterLogo>`. Component code uses the registry; the browser handshake uses these flat files.

### 4. Checklist — add new check

Add `master-favicon-pwa-pack-embedded` to `src/master/checklist.ts` covering the 5 files + manifest + index.html wiring.

---

## Files touched

**Created (binaries):**
- `src/master/assets/logo/cmb-wordmark-ground-white-{200,400,800,1200,2400}.png` (5)
- `public/favicon.ico`
- `public/favicon-16.png`
- `public/apple-touch-icon.png`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

**Created (config):**
- `public/site.webmanifest`

**Edited:**
- `index.html` — replace 2-line favicon block with proper 5-link + manifest block
- `src/master/brand/logo-registry.ts` — wordmark-ground white real imports
- `src/master/brand/LOGO_SLOT_MAP.md` — wordmark-ground readiness + new "Browser chrome & PWA pack" section
- `src/master/checklist.ts` — two new checks complete
- `.lovable/plan.md` — log the integration

---

## Why this matters

1. **Matrix-complete brand system.** After this, `MASTER_LOGOS` contains zero aliases. Any future remix can flip `logoColorway` to `white` and every surface — including the drafted wordmark — serves an authentic reverse asset.
2. **Real browser identity.** The current single-PNG favicon is a stopgap. The new pack gives the site a proper crisp tab icon, an iOS home-screen icon, and PWA install capability — all using the navy MB-diamond as the canonical browser-chrome mark.
3. **Clean separation of concerns.** Component logos go through `<MasterLogo>` + registry. Browser-chrome icons live in `/public/` and are referenced by `<link>` tags. The slot map now documents both systems explicitly so future contributors don't conflate them.
