## What you uploaded

The **emblem-only mark** (no "Master Builders / Cochrane" wordmark) — black colorway, 6 responsive sizes:

| Upload | Source size | Use case |
|---|---|---|
| `cmb-emblem-black-100.png` | 100×100 | favicon, list bullets, chat avatar |
| `cmb-emblem-black-200.png` | 200×200 | nav-collapsed, mobile avatar, retina favicon |
| `cmb-emblem-black-400.png` | 400×400 | inline body badges, card crests, OG icon |
| `cmb-emblem-black-800.png` | 800×800 | hero accent, section dividers, print thumbnail |
| `cmb-emblem-black-1200.png` | 1200×1200 | full-page watermark, splash crest, og-square |
| `cmb-emblem-black-2400.png` | 2400×2400 | print master, billboard, 5K hero crest |

The emblem is a **separate asset family** from the existing full lockup (same lockup just had nav/footer/hero/large/medium/small). It needs its own slot tree because the cropping, aspect ratio (1:1 square), and usage rules are different.

## What I'll do once approved

### 1. Embed the 6 emblem binaries

Copy each upload into `src/master/assets/logo/`:

| Upload | → Destination |
|---|---|
| `cmb-emblem-black-100.png` | `src/master/assets/logo/cmb-emblem-black-100.png` |
| `cmb-emblem-black-200.png` | `src/master/assets/logo/cmb-emblem-black-200.png` |
| `cmb-emblem-black-400.png` | `src/master/assets/logo/cmb-emblem-black-400.png` |
| `cmb-emblem-black-800.png` | `src/master/assets/logo/cmb-emblem-black-800.png` |
| `cmb-emblem-black-1200.png` | `src/master/assets/logo/cmb-emblem-black-1200.png` |
| `cmb-emblem-black-2400.png` | `src/master/assets/logo/cmb-emblem-black-2400.png` |

### 2. Extend the registry with an `emblem` family

In `src/master/brand/logo-registry.ts`:

- Import all 6 emblem PNGs.
- Add `emblem: { 100, 200, 400, 800, 1200, 2400 }` to each colorway in `MASTER_LOGOS`. Black gets real imports; navy and white **alias to black** for now (same pattern we used during the rollout) until those emblem packages land.
- Add an `EMBLEM_STATUS` record so the dashboard reflects which emblem colorways are real vs aliased.
- Extend `LOGO_USAGE_MAP` with new emblem slots:
  - `emblemFavicon` (`100`) — surface: any
  - `emblemAvatar` (`200`) — surface: any
  - `emblemInline` (`400`) — surface: light
  - `emblemAccent` (`800`) — surface: any
  - `emblemWatermark` (`1200`) — surface: image
  - `emblemPrint` (`2400`) — surface: any (print/export only)

### 3. Extend `<MasterLogo>` with an emblem slot

Add a new `slot="emblem"` API with a `size` prop:

```tsx
<MasterLogo slot="emblem" size={400} />
<MasterLogo slot="emblem" size={1200} colorway="white" />
```

Internally uses native `<img srcset>` so the browser auto-picks the right resolution at the right DPR — single tag, no media queries needed for square assets. Adds matching CLS box (1:1 width=height).

### 4. Document the slot map

Update `src/master/brand/LOGO_SLOT_MAP.md` with a new "Emblem family" section showing:
- Which surfaces use the emblem vs the full lockup (rule of thumb: **lockup** = first impression, **emblem** = repeat appearance).
- The 6 sizes mapped to recommended use cases (table above).
- Colorway readiness (black ✅, navy ⏳, white ⏳).

### 5. Update the master checklist

Add `master-emblem-binaries-embedded` to `src/master/checklist.ts` so the remix QA flow validates the emblem family is wired.

### 6. Type-check

Run `tsc --noEmit` to confirm the build is clean.

## Where the emblem will actually appear

I'm **not** going to silently replace any existing lockup with the emblem — that's a brand-strategy decision. What I will do is make the emblem **available** through the same `<MasterLogo>` primitive so future surfaces (loading dot, scroll-progress indicator, scroll-back-to-top, footer copyright bullet, social-share avatar, print headers) can use it with one line of code.

## Files touched

- **Created (6):** `src/master/assets/logo/cmb-emblem-black-{100,200,400,800,1200,2400}.png`
- **Edited (4):** `logo-registry.ts`, `MasterLogo.tsx`, `LOGO_SLOT_MAP.md`, `checklist.ts`
- **Untouched:** components, trade.config — no breakage to existing surfaces.

## Asks for next round (optional)

When ready, upload the **emblem navy** and **emblem white** packages (same 6 sizes each) and I'll flip the aliases the same way we did for the full lockup.