## What you uploaded

**A complete social-share / OG card pack — 10 files, 5 sizes × 2 backgrounds (transparent + navy).** Each file pairs the Master Builders Cochrane lockup with a canvas sized to a specific social platform's first-render box.

| Aspect | Sizes | Files | Primary surface |
|---|---|---|---|
| **OG card** | 1200×630 | `og-1200x630-{transparent,navybg}` | Open Graph / Twitter `summary_large_image` / Facebook / LinkedIn share preview |
| **Twitter banner** | 1200×600 | `twitter-1200x600-{transparent,navybg}` | Twitter card alternative ratio, generic 2:1 share image |
| **LinkedIn banner** | 1584×396 | `linkedin-banner-1584x396-{transparent,navybg}` | LinkedIn company-page cover banner |
| **Instagram square** | 1080×1080 | `instagram-1080x1080-{transparent,navybg}` | Instagram feed post, Facebook square share, generic 1:1 social |
| **Profile avatar** | 400×400 | `profile-400x400-{transparent,navybg}` | Twitter / Instagram / LinkedIn profile photo, generic round avatar |

The dual treatment (transparent + navy-on-white) lets every consumer pick the right one for its rendering context — share crawlers + LinkedIn want pre-baked backgrounds; in-app composers and white-themed templates want the transparent version.

This pack closes a real gap. The site currently references `og-image-cmb.png` (the prior Cochrane Drywall lockup) for both `og:image` and `twitter:image` — outdated branding showing in every social share preview.

---

## Plan

### 1. Embed the share pack in `/public/share/`

Group the 10 files in their own subdirectory to keep `/public/` flat. Filenames preserve the platform-and-size pattern so the right file is obvious from the path:

```
public/share/
  og-1200x630-navybg.jpg
  og-1200x630-transparent.png
  twitter-1200x600-navybg.jpg
  twitter-1200x600-transparent.png
  linkedin-1584x396-navybg.jpg
  linkedin-1584x396-transparent.png
  instagram-1080x1080-navybg.jpg
  instagram-1080x1080-transparent.png
  profile-400x400-navybg.jpg
  profile-400x400-transparent.png
```

(Trim the verbose `linkedin-banner-` / `instagram-` redundancy from filenames since the directory already says "share" and the dimensions are unambiguous.)

### 2. Wire OG + Twitter share previews to the new pack

In `index.html`, replace the legacy `og-image-cmb.png` references with the new MB navy-bg OG card. The navy version is the right pick for share crawlers — they render previews on white-ish chrome (Facebook, Slack, LinkedIn, iMessage), so the navy background gives the diamond + wordmark a contained "card" treatment instead of floating on the recipient's UI.

```html
<meta property="og:image" content="/share/og-1200x630-navybg.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:alt" content="Cochrane Master Builders" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="/share/og-1200x630-navybg.jpg" />
<meta name="twitter:image:alt" content="Cochrane Master Builders" />
```

Keep the legacy `og-image-cmb.png` in `/public/` for now (in case any external link previews are still cached) — we deprecate in a future cleanup pass.

### 3. Create a typed share-asset registry (component-side)

Add `src/master/brand/share-pack.ts` — small, tree-shakeable registry mirroring the philosophy of `logo-registry.ts`. Surfaces inside the React app (e.g. share buttons, dynamic OG tags on per-page Helmet, future PR card generation) read from this registry instead of hardcoding `/share/...` paths:

```ts
export type SharePlatform = "og" | "twitter" | "linkedin" | "instagram" | "profile";
export type ShareBackground = "transparent" | "navybg";

export const SHARE_PACK = {
  og:        { transparent: "/share/og-1200x630-transparent.png",        navybg: "/share/og-1200x630-navybg.jpg",        w: 1200, h: 630  },
  twitter:   { transparent: "/share/twitter-1200x600-transparent.png",   navybg: "/share/twitter-1200x600-navybg.jpg",   w: 1200, h: 600  },
  linkedin:  { transparent: "/share/linkedin-1584x396-transparent.png",  navybg: "/share/linkedin-1584x396-navybg.jpg",  w: 1584, h: 396  },
  instagram: { transparent: "/share/instagram-1080x1080-transparent.png", navybg: "/share/instagram-1080x1080-navybg.jpg", w: 1080, h: 1080 },
  profile:   { transparent: "/share/profile-400x400-transparent.png",    navybg: "/share/profile-400x400-navybg.jpg",    w: 400,  h: 400  },
} as const;

/** Recommended background per surface. Share crawlers + dark-themed UIs → navybg.
 *  In-product white surfaces / brand kit downloads → transparent. */
export const recommendedShareBackground = (platform: SharePlatform): ShareBackground => "navybg";
```

These are flat `/public/` paths (not Vite imports) because OG meta tags need root-relative URLs that crawlers can fetch directly.

### 4. New "Social share & profile pack" section in `LOGO_SLOT_MAP.md`

Document the full per-file map so anyone authoring a campaign knows exactly which file to grab:

| File | Dimensions | Consumer | When to use |
|---|---|---|---|
| `og-1200x630-navybg.jpg` | 1200×630 | Facebook, Slack, iMessage, LinkedIn link previews, default OG/Twitter | **Default share preview.** Wired to `og:image` + `twitter:image`. |
| `og-1200x630-transparent.png` | 1200×630 | Email signatures, downloadable brand kit, layered comp | When the recipient surface is already navy/dark and pre-baked bg would clash. |
| `twitter-1200x600-navybg.jpg` | 1200×600 | Twitter alternate aspect, generic 2:1 share | Twitter cards that prefer 2:1, or any share UI requesting 2:1. |
| `twitter-1200x600-transparent.png` | 1200×600 | Composable banners | When designer needs to drop on a custom backdrop. |
| `linkedin-1584x396-navybg.jpg` | 1584×396 | LinkedIn company-page cover | Upload as the page banner / hero. |
| `linkedin-1584x396-transparent.png` | 1584×396 | LinkedIn drafts on custom hero compositions | Designer overlay use only. |
| `instagram-1080x1080-navybg.jpg` | 1080×1080 | Instagram feed post, Facebook square, generic 1:1 social | Default 1:1 social post. |
| `instagram-1080x1080-transparent.png` | 1080×1080 | IG carousels / Stories with custom backdrops | When other slides set the surface color. |
| `profile-400x400-navybg.jpg` | 400×400 | Twitter / IG / LinkedIn / GitHub profile photo | Set as profile pic everywhere. Will round-crop cleanly. |
| `profile-400x400-transparent.png` | 400×400 | Brand kit, embed badges, dark-mode avatars | Use behind a custom backdrop or where transparency is required. |

Plus a decision rule:
> **Default to `-navybg` for any external surface** (share previews, profile photos, banners). Reach for `-transparent` only when you control the destination background or the consumer composites onto its own surface.

### 5. Deprecate the legacy OG file from the slot map

The existing top-of-document slot table has rows for `email` and `og` both pointing at `/og-image-cmb.png`. Update both rows:
- `og` → `/share/og-1200x630-navybg.jpg`
- `email` → leave for now with a footnote that it'll migrate to `favicon-256.png` (light surfaces) or `favicon-white-256.png` (dark surfaces) in the email-template pass.

### 6. Checklist updates

Two checks updated:
- `og-image-generated` → broaden description to "Master Builders OG card embedded; replaces legacy Cochrane Drywall art. Multi-platform share pack lives in `/public/share/`."
- Add a new check: `master-share-pack-embedded` — covers all 10 files + the `share-pack.ts` registry + slot-map documentation.

---

## Files touched

**Created (binaries):** 10 files in `public/share/`

**Created (code):**
- `src/master/brand/share-pack.ts` — typed registry

**Edited:**
- `index.html` — `og:image`/`twitter:image` repointed to new navy OG card + width/height/alt meta added
- `src/master/brand/LOGO_SLOT_MAP.md` — top-table `og` row updated; new "Social share & profile pack" section appended
- `src/master/checklist.ts` — broadened `og-image-generated`, new `master-share-pack-embedded`

---

## Why this matters

1. **Share previews stop showing legacy branding.** Right now every Facebook/LinkedIn/Slack/iMessage share renders the prior Cochrane Drywall lockup. After this, the navy MB-diamond + wordmark shows everywhere a link is pasted.
2. **Profile coverage on every social platform.** A single 400×400 pre-baked navy avatar means Twitter, IG, LinkedIn, GitHub, Substack, etc. all get the canonical mark — no per-platform improvisation.
3. **Component-system parity.** Following the `logo-registry.ts` pattern with `share-pack.ts` means future per-page dynamic OG tags (e.g. via React Helmet) read from the same source of truth, with one knob to flip background treatment.
4. **Documented decision tree.** The slot map's new section makes it impossible to grab the wrong file — every consumer + when-to-use is explicit.
