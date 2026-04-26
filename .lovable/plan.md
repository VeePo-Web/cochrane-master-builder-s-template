## What you uploaded

**Favicon ladder — 9 PNGs of the navy MB-diamond, sized for every browser-chrome surface the spec calls for.**

| File | Primary use |
|---|---|
| `favicon-32.png` | Modern desktop browser tab (retina) |
| `favicon-48.png` | Windows taskbar / classic Win pinned site |
| `favicon-64.png` | Browser tab on hi-DPI laptop |
| `favicon-96.png` | Android home-screen (legacy / low-density) |
| `favicon-128.png` | Chrome Web Store, generic medium chrome |
| `favicon-144.png` | Windows Metro / IE11 pinned tile |
| `favicon-152.png` | iPad home-screen (older iOS) |
| `favicon-180.png` | iPhone home-screen (modern iOS Safari) — **already embedded as `apple-touch-icon.png`** |
| `favicon-192.png` | Android Chrome PWA install — **already embedded as `android-chrome-192x192.png`** |
| `favicon-256.png` | Hero browser-chrome / large favicon, OG-square fallback |

The 16px and 512px ends of the ladder are already in `/public/` from the last round. This upload fills in **everything in between** — meaning every modern browser, OS, and PWA spec gets an exact-size native asset instead of having to scale from a neighbour.

---

## Plan

### 1. Embed the full ladder in `/public/`

Copy all 9 files to `public/` using their existing names:
- `public/favicon-32.png`, `favicon-48.png`, `favicon-64.png`, `favicon-96.png`, `favicon-128.png`, `favicon-144.png`, `favicon-152.png`, `favicon-180.png`, `favicon-192.png`, `favicon-256.png`

The 180 and 192 uploads are **identical content** to the existing `apple-touch-icon.png` and `android-chrome-192x192.png` — keep both naming conventions live so:
- The spec-correct `apple-touch-icon.png` / `android-chrome-192x192.png` remain wired (what iOS / Android crawlers expect)
- The `favicon-180.png` / `favicon-192.png` versions are reachable via the unified `favicon-{size}.png` ladder for any consumer that prefers that pattern

### 2. Wire the new sizes into `index.html`

Expand the `<link>` block to declare every size explicitly. Browsers pick the closest match without scaling:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png" />
<link rel="icon" type="image/png" sizes="128x128" href="/favicon-128.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
<link rel="icon" type="image/png" sizes="256x256" href="/favicon-256.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/favicon-152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="msapplication-TileImage" content="/favicon-144.png" />
<meta name="msapplication-TileColor" content="#1a2438" />
<link rel="manifest" href="/site.webmanifest" />
```

Notes:
- `apple-touch-icon` declared at both 152 (iPad) and 180 (iPhone) — iOS picks the matching one
- `msapplication-TileImage` + `TileColor` makes Windows pinned-site tiles render the navy MB-diamond on a navy background
- The 192 entry stays pointed at the spec-named `android-chrome-192x192.png` (PWA crawlers look for that exact filename)

### 3. Extend the manifest with the mid-range icons

Update `public/site.webmanifest` to include 96, 128, 144, 152, 192, 256, 512 entries so the install prompt and adaptive launcher pick the optimal size on every device class:

```json
"icons": [
  { "src": "/favicon-96.png",  "sizes": "96x96",   "type": "image/png", "purpose": "any" },
  { "src": "/favicon-128.png", "sizes": "128x128", "type": "image/png", "purpose": "any" },
  { "src": "/favicon-144.png", "sizes": "144x144", "type": "image/png", "purpose": "any" },
  { "src": "/favicon-152.png", "sizes": "152x152", "type": "image/png", "purpose": "any" },
  { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
  { "src": "/favicon-256.png", "sizes": "256x256", "type": "image/png", "purpose": "any" },
  { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
  { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
]
```

### 4. Document the full ladder in `LOGO_SLOT_MAP.md`

Replace the existing 6-row "Browser chrome & PWA pack" file map with the **complete 13-file ladder**, organized by surface:

| Size  | File                              | Surface / consumer                          | Density tier     |
|-------|-----------------------------------|---------------------------------------------|------------------|
| ICO   | `favicon.ico`                     | Legacy IE/Edge, Windows pinned tabs         | universal        |
| 16    | `favicon-16.png`                  | Desktop tab @ 100% zoom                     | tab              |
| 32    | `favicon-32.png`                  | Desktop tab @ retina                        | tab              |
| 48    | `favicon-48.png`                  | Windows taskbar, classic pinned             | OS chrome        |
| 64    | `favicon-64.png`                  | Hi-DPI laptop tab, dock thumbnail           | tab              |
| 96    | `favicon-96.png`                  | Android low-density home, GH README crest   | mobile chrome    |
| 128   | `favicon-128.png`                 | Chrome Web Store, generic medium            | OS chrome        |
| 144   | `favicon-144.png`                 | Windows Metro / IE11 pinned tile            | OS tile          |
| 152   | `favicon-152.png`                 | iPad home-screen (older iOS)                | iOS springboard  |
| 180   | `apple-touch-icon.png` / `favicon-180.png` | iPhone home-screen (Safari iOS)    | iOS springboard  |
| 192   | `android-chrome-192x192.png` / `favicon-192.png` | Android home, PWA install     | Android launcher |
| 256   | `favicon-256.png`                 | Hero favicon, OG-square fallback            | premium chrome   |
| 512   | `android-chrome-512x512.png`      | PWA splash, maskable adaptive icon source   | PWA runtime      |

Plus a callout that 180 and 192 ship under **both** filenames intentionally — spec-named files for crawlers that look for them by convention, ladder-named files for consumers that prefer the unified pattern.

### 5. Checklist

The existing `master-favicon-pwa-pack-embedded` check stays as-is — broaden its description to cover the full 13-file ladder + manifest + tile metadata.

---

## Files touched

**Created (binaries):**
- `public/favicon-32.png` · `favicon-48.png` · `favicon-64.png` · `favicon-96.png` · `favicon-128.png` · `favicon-144.png` · `favicon-152.png` · `favicon-180.png` · `favicon-192.png` · `favicon-256.png`

**Edited:**
- `index.html` — expanded `<link rel="icon">` block + Windows tile metadata
- `public/site.webmanifest` — extended icons array
- `src/master/brand/LOGO_SLOT_MAP.md` — full 13-file ladder table
- `src/master/checklist.ts` — broadened description

---

## Why this matters

A single favicon scaled by the browser looks soft on every tier except its native size. With the full ladder embedded:
- **Desktop tabs** render the diamond crisp at 16, 32, and 64
- **Windows pinned tiles** show the diamond on a navy field instead of a generic letter
- **iPad and iPhone home-screens** each get a native size (152 / 180) — no scaling artifacts
- **Android launchers** pick 96 / 192 / 512 by density — small launcher uses the small file
- **PWA install** has a proper maskable 512 source for adaptive icons
- **OG / share contexts** can fall back to the 256 if needed

This is the production-grade browser-chrome footprint.
