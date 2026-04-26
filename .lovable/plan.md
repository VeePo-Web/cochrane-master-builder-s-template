## What you uploaded

**Three groups in this round:**

### A. Navy MB-diamond at 512 (`favicon-512.png`)
The master-resolution navy diamond — same artwork as `android-chrome-512x512.png` but under the unified `favicon-{size}.png` ladder name. Closes the navy ladder at the top end so every rung from 16 → 512 is reachable under both spec-named and ladder-named filenames.

### B. White MB-diamond ladder (6 PNGs)
The **reverse colorway** of the browser-chrome mark — white diamond, transparent background. New asset class. Sizes: `favicon-white-32/64/128/192/256/512.png`.

This is the dark-surface counterpart to the navy favicon set. Use cases:
- Dark-mode browser tab icons (via `<link rel="icon" media="(prefers-color-scheme: dark)">`)
- Dark email headers (transactional templates with navy/asphalt backgrounds)
- Social share cards on dark OG backgrounds
- In-product dark surfaces that need a chrome-style diamond mark (loading splash, dark modals)

### C. Replacement `site.webmanifest`
A simpler manifest you've authored — strips description/scope/start_url, drops to 192+512 only, switches `theme_color` to navy `#1F2F4D` and `background_color` to white. **This conflicts with the current setup in two ways** (see decision below).

---

## Plan

### 1. Embed the navy 512 ladder file

- Copy `favicon-512.png` → `public/favicon-512.png`
- Add to `index.html` `<link>` block:
  ```html
  <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />
  ```
- The existing `android-chrome-512x512.png` stays as-is (PWA spec name); both filenames now serve the same 512 master, matching the dual-name pattern at 180 and 192.

### 2. Embed the white MB-diamond ladder

- Copy 6 files to `public/`:
  - `favicon-white-32.png`, `favicon-white-64.png`, `favicon-white-128.png`, `favicon-white-192.png`, `favicon-white-256.png`, `favicon-white-512.png`
- **Wire dark-mode chrome detection** in `index.html` using prefers-color-scheme media queries — modern browsers (Safari 15+, Chrome 91+, Firefox 109+) honor this and serve the white diamond on dark UA chrome, navy on light:
  ```html
  <link rel="icon" type="image/png" sizes="32x32"  href="/favicon-32.png"        media="(prefers-color-scheme: light)" />
  <link rel="icon" type="image/png" sizes="32x32"  href="/favicon-white-32.png"  media="(prefers-color-scheme: dark)" />
  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" media="(prefers-color-scheme: light)" />
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-white-192.png"      media="(prefers-color-scheme: dark)" />
  ```
  Plus a fallback navy `<link rel="icon">` without `media` for browsers that don't support the query (so they get the navy default).

### 3. Decision: replacement `site.webmanifest`

Your uploaded manifest differs from the current one in three ways:

| Field | Current | Your upload | Recommendation |
|---|---|---|---|
| `description`, `start_url`, `scope` | present | removed | **Keep current** — `start_url`/`scope` are required for proper PWA install behavior; without them the manifest fails Lighthouse PWA checks. |
| `icons` array | 8 entries (96/128/144/152/192/256/512 + maskable) | 2 entries (192/512) | **Keep current** — the extra mid-range entries help adaptive launchers pick the optimal size. |
| `theme_color` / `background_color` | `#F2EDE4` / `#1a2438` (paper / navy) | `#1F2F4D` / `#FFFFFF` (navy / white) | **Adopt your values** — they match the new browser-chrome direction (navy address bar on light surfaces). |

**Net change**: keep the structural richness of the current manifest, but flip `theme_color` to your navy `#1F2F4D` and `background_color` to white `#FFFFFF`. Also update the matching `<meta name="theme-color">` in `index.html` (currently `#F2EDE4`) to `#1F2F4D` so the address bar / splash background match.

> If you'd rather drop straight to your minimal manifest (e.g. you're intentionally avoiding the install prompt), say the word and I'll swap it 1:1 — but the loss of `start_url`/`scope` will degrade installability.

### 4. Document both new families in `LOGO_SLOT_MAP.md`

Update the "Browser chrome & PWA pack" section to:

- Add `favicon-512.png` to the ladder table (alongside `android-chrome-512x512.png`, both serving the 512 master)
- Add a **new sub-section** "Dark-mode reverse colorway" documenting the white ladder:

| Size | File | Renders in | Tier |
|---|---|---|---|
| 32  | `favicon-white-32.png`  | Dark-mode desktop tab @ retina  | tab |
| 64  | `favicon-white-64.png`  | Dark-mode hi-DPI laptop tab     | tab |
| 128 | `favicon-white-128.png` | Dark-mode generic OS chrome     | OS chrome |
| 192 | `favicon-white-192.png` | Dark-mode Android home / install | mobile |
| 256 | `favicon-white-256.png` | Dark-mode hero favicon, dark OG | premium |
| 512 | `favicon-white-512.png` | Dark email/template headers, dark splash | hero |

With a callout explaining the `prefers-color-scheme` mechanism: browser asks the OS at request time which appearance is active, picks the matching `<link>`. No JS required. Falls back gracefully to navy on browsers without media query support.

### 5. Update theme color

In `index.html`, change:
```html
<meta name="theme-color" content="#F2EDE4" />
```
to:
```html
<meta name="theme-color" content="#1F2F4D" />
```
This colors the iOS Safari status-bar tint and Android Chrome address-bar background to navy — coherent with the new MB-diamond identity. (Current paper color was inherited from the prior brand stage.)

### 6. Checklist

The existing `master-favicon-pwa-pack-embedded` check stays — broaden its description to cover the white ladder + dark-mode wiring + theme color update.

---

## Files touched

**Created (binaries):**
- `public/favicon-512.png`
- `public/favicon-white-32.png` · `favicon-white-64.png` · `favicon-white-128.png` · `favicon-white-192.png` · `favicon-white-256.png` · `favicon-white-512.png`

**Edited:**
- `index.html` — add 512 link, dark-mode `<link media="...">` pairs, switch `theme-color` to `#1F2F4D`
- `public/site.webmanifest` — flip `theme_color`/`background_color` to your values; keep structural richness
- `src/master/brand/LOGO_SLOT_MAP.md` — extend ladder, add "Dark-mode reverse colorway" sub-section
- `src/master/checklist.ts` — broadened description

---

## Why this matters

1. **Dark-mode parity.** Modern OSes ask the browser to pick a tab icon that matches the user's appearance preference. Until now the navy diamond got rendered on dark Safari/Chrome chrome where it competes with the dark UI. The white reverse fixes that — same mark, correct contrast, automatically chosen.
2. **Coherent navy address bar.** Switching `theme-color` and the manifest `theme_color` to `#1F2F4D` means iOS/Android chrome wraps the site in navy instead of paper — the address bar becomes part of the brand surface instead of a neutral border.
3. **Closed ladder.** With `favicon-512.png` added, every rung 16 → 512 in the navy ladder has a unified-name PNG matching the spec-named PNG. No naming conventions left dangling.
