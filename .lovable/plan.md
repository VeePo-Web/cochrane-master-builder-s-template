## What you uploaded

**The canonical brand bible plus the master source artwork and showcase boards.** This is the foundation document everyone (you, me, future contractors, designers) should reference. Three groups:

| Group | Files | Purpose |
|---|---|---|
| **1. Brand bible** | `README.md` (170 lines) | Official rules: folder layout, color hex (`#1F2F4D`), size variants, file-naming convention, clear-space + minimum size, do's / don'ts |
| **2. Source artwork** | `MB_Master_Logo_1_cleaned.png` (no-ground lockup — primary), `MB_Master_Logo_2_original.png` (with-ground lockup — vertical post + horizontal base rule under wordmark) | The two master compositions all derived assets are cropped from. Archive-grade. |
| **3. Showcase boards** | `full-logo-on-{white,black,navy}` + `emblem-on-{black,navy}` (1920–2048px square renders) | High-res in-context renders. Use case: brand-kit page on the site, designer download links, social campaign hero plates. |

The **bulk of what the brand bible describes is already embedded** from prior passes — the full lockup matrix (3 colorways × full size ladder), emblem family (×3), tiles (×3), monogram (×3), wordmark (×3), wordmark-ground (×3), favicon + PWA pack (13-rung navy + 6-rung white), social share pack (5 platforms × 2 bgs), site.webmanifest, theme-color, and the typed `<MasterLogo>` registry/component system. **What's missing is the brand bible itself** (no canonical reference doc lives in the repo) and **a brand-kit surface** that exposes these assets to anyone who needs them.

---

## Plan

### 1. Embed the brand bible as the canonical reference

Drop the README into `src/master/brand/BRAND_BIBLE.md` as the **single source of truth**. Adapt it to reflect what's actually true in *this* repo:

- Replace the README's "📁 Folder Structure" section (which describes the source-package's `01-…/02-…` flat layout) with our actual layout: `src/master/assets/logo/` (bundled lockup + emblem + tiles + monogram + wordmark families), `public/` (favicon ladder + PWA), `public/share/` (social pack), all read through `<MasterLogo>` and `share-pack.ts`.
- Keep the brand bible's color block, size-variant ladders, naming convention, clear-space rules, minimum-size rules, and don'ts **verbatim** — these are the rules.
- Replace the README's example HTML snippets (which point at unbundled `/img/cmb-…` paths) with the actual import patterns: `<MasterLogo slot="nav" />`, `getShareAsset("og")`, etc.
- Cross-link to existing docs: `LOGO_SLOT_MAP.md`, `LOGO_USAGE.md`, `share-pack.ts`, `identity.ts`.

The result: one file a designer / developer / AI-agent can read top-to-bottom and have the complete brand contract.

### 2. Archive the master source artwork

Drop both originals into `src/master/assets/logo/source/` (new subfolder):
- `cmb-source-lockup-no-ground.png` ← `MB_Master_Logo_1_cleaned.png`
- `cmb-source-lockup-with-ground.png` ← `MB_Master_Logo_2_original.png`

Add a tiny `source/README.md` explaining: these are the master compositions all cropped/recolored exports derive from — never edit, never ship to `<img>`, only re-derive from these.

### 3. Embed the showcase boards (high-res context renders)

Drop the 5 board renders into `src/master/assets/logo/boards/`:
- `cmb-board-lockup-on-white.png`
- `cmb-board-lockup-on-black.png`
- `cmb-board-lockup-on-navy.png`
- `cmb-board-emblem-on-black.png`
- `cmb-board-emblem-on-navy.png`

Wire them into the registry as a new `boards` family under each colorway-context — surfaced via a new typed export `MASTER_BOARDS` in `logo-registry.ts`. These power downstream surfaces (brand-kit page, press-kit download links, internal style references) without anyone hardcoding paths.

### 4. Surface the showcase boards on `/brand`

Add a lightweight `/brand` route — **internal brand-kit page** that renders:
- The brand bible (rendered MD with the rules)
- The 5 showcase boards in a gallery (with download buttons)
- The 4 logo-family variants showing each colorway (lockup, emblem, tiles, monogram, wordmark, wordmark-ground)
- The share-pack assets with platform labels
- Color tokens (navy `#1F2F4D` + white + black) with hex, copy-to-clipboard
- Clear-space + minimum-size demonstration tile
- Don'ts grid (use the rules from the bible)

This is the "give this URL to a contractor / designer / journalist" surface. Not linked from the public nav — accessible by direct URL only.

### 5. Per-asset map (the "where it would go when" the user asked for)

Append a **"Master file → Surface map"** section to `BRAND_BIBLE.md` documenting where each new file lands:

| New file | Lives at | Rendered by | When |
|---|---|---|---|
| `README.md` | `src/master/brand/BRAND_BIBLE.md` | `/brand` page (markdown render) | Single source of truth for all brand decisions |
| `MB_Master_Logo_1_cleaned.png` | `src/master/assets/logo/source/cmb-source-lockup-no-ground.png` | Archive-only; never bundled into UI | Master file for re-deriving any future no-ground crop |
| `MB_Master_Logo_2_original.png` | `src/master/assets/logo/source/cmb-source-lockup-with-ground.png` | Archive-only; never bundled into UI | Master file for re-deriving any future with-ground crop |
| `full-logo-on-white.png` | `src/master/assets/logo/boards/cmb-board-lockup-on-white.png` | `/brand` showcase grid + press-kit download | "Logo on light backgrounds" demonstration |
| `full-logo-on-black.png` | `src/master/assets/logo/boards/cmb-board-lockup-on-black.png` | `/brand` showcase grid + press-kit download | "Logo on dark backgrounds" demonstration |
| `full-logo-on-navy.png` | `src/master/assets/logo/boards/cmb-board-lockup-on-navy.png` | `/brand` showcase grid + press-kit download | "Logo on brand-navy backgrounds" demonstration |
| `emblem-on-black.png` | `src/master/assets/logo/boards/cmb-board-emblem-on-black.png` | `/brand` showcase grid + press-kit download | "Emblem on dark backgrounds" demonstration |
| `emblem-on-navy.png` | `src/master/assets/logo/boards/cmb-board-emblem-on-navy.png` | `/brand` showcase grid + press-kit download | "Emblem on brand-navy backgrounds" demonstration |

### 6. Checklist updates

Two new items in `src/master/checklist.ts`:
- `master-brand-bible-embedded` — canonical brand contract lives at `BRAND_BIBLE.md`, surfaces on `/brand`
- `master-brand-kit-page-live` — `/brand` route renders all logo families + boards + color tokens + rules
- `master-source-artwork-archived` — originals archived to `assets/logo/source/`, never `<img>`'d

Also: drop the `full-logo-on-navy.jpg` (JPG sibling) since the PNG is higher quality — using the PNG only.

---

## Files touched

**Created (binaries):**
- `src/master/assets/logo/source/cmb-source-lockup-no-ground.png`
- `src/master/assets/logo/source/cmb-source-lockup-with-ground.png`
- `src/master/assets/logo/boards/cmb-board-lockup-on-{white,black,navy}.png`
- `src/master/assets/logo/boards/cmb-board-emblem-on-{black,navy}.png`

**Created (code/docs):**
- `src/master/brand/BRAND_BIBLE.md` — adapted brand bible (master reference)
- `src/master/assets/logo/source/README.md` — archive guard
- `src/pages/Brand.tsx` — `/brand` brand-kit page
- New `MASTER_BOARDS` export in `logo-registry.ts`

**Edited:**
- `src/master/brand/logo-registry.ts` — add boards imports + `MASTER_BOARDS` export
- `src/App.tsx` — register `/brand` route
- `src/master/checklist.ts` — 3 new checks
- `src/master/brand/LOGO_SLOT_MAP.md` — link to BRAND_BIBLE + brand-kit page

---

## Why this matters

1. **The brand bible has no home today.** Rules like "navy = `#1F2F4D`", "clear space = height of M in MASTER", "minimum 150px wide", "don't recolor outside the palette" are scattered across slot-map / usage docs / your own messages. Embedding `BRAND_BIBLE.md` gives one canonical place future-you (and any contractor) reads first.
2. **Source artwork preservation.** If we ever need to re-export a new variant (e.g. the with-ground full lockup as a footer asset), having the cleaned originals checked in means we don't go hunting through chat history.
3. **`/brand` becomes a power surface.** A single URL you can give to a journalist, a partner, a fabrication vendor, or a sister-site agency — they get the bible, the boards, the colors, and downloadable assets without any back-and-forth.
4. **The 5 showcase boards become real assets.** They're high-res hero plates — exactly what a `/brand` press-kit needs for "see the mark in context" demonstrations. Right now they'd just sit in chat history.
