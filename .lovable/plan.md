## Goal

Turn the master logo system into a **3-colorway** architecture (`black` | `navy` | `white`) so every remix picks an ink color with one config flag, and every surface auto-selects the right contrast. Embed the navy + white binaries when you re-upload them.

## Why a re-upload is needed

The black colorway (10 files) was successfully embedded two turns ago. The navy and white sets failed to embed on their respective turns because the sandbox didn't surface the `code--copy` tool — it only appears intermittently, and was missing on the navy turn and the white turn. **A fresh upload reliably surfaces it** (it worked first try with the black set). One re-upload of navy + white together is enough.

## What gets built (the architecture — no binaries needed)

### 1. Refactored `logo-registry.ts` — colorway-aware

```ts
export type LogoColorway = "black" | "navy" | "white";

export const MASTER_LOGOS = {
  black: { nav: {sm,md,lg}, footer: {sm,md,lg}, hero, large, medium, small },
  navy:  { /* same shape */ },
  white: { /* same shape */ },
} as const;

export const COLORWAY_STATUS = {
  black: "ready",   // embedded
  navy:  "pending", // re-upload to embed
  white: "pending", // re-upload to embed
};
```

Pending colorways alias to the black files so the build never breaks. When the binaries land, only those import lines change — zero component edits.

### 2. New `recommendedColorwayForSlot(slot, tradeColorway)` helper

Each slot in `LOGO_USAGE_MAP` declares its surface (`light` | `dark` | `image` | `any`). The helper auto-picks the right colorway:

| Surface | Logic |
|---|---|
| `light` (nav, footer, about, modal) | Use trade's chosen ink (`black` or `navy`); white falls back to black |
| `dark` (loading screen, dark sections) | Force `white` |
| `image` (hero, OG) | Default `white` for safety; per-instance override allowed |
| `any` (favicon) | Trade's chosen colorway |

### 3. `<MasterLogo>` upgraded with `colorway` prop

```tsx
<MasterLogo slot="nav" />                    // auto: trade colorway
<MasterLogo slot="loading" />                // auto: white (dark surface)
<MasterLogo slot="hero" colorway="black" />  // explicit override
```

Default colorway reads from `TRADE.identity.logoColorway` (new optional field, defaults to `"black"`).

### 4. One-line per-trade config

```ts
// trade.config.ts
identity: {
  logoColorway: "navy",   // <-- the only edit needed for this remix
}
```

### 5. Slot-by-slot colorway recommendation map (added to `LOGO_USAGE.md`)

| Surface | Recommended | Rationale |
|---|---|---|
| Nav on bone background | `navy` | Softer than black on warm cream |
| Nav on pure white | `black` or `navy` | Both hold up; navy is more refined |
| Footer (paper surface) | matches nav | Consistency top→bottom |
| Hero watermark over photo | `white` | Survives any underlying image |
| Loading screen (dark) | `white` | Required — only readable colorway |
| Booking modal left rail | `navy` | Editorial calm |
| Dark sections (if any) | `white` | Required |
| OG / social share | `navy` | Stands out in white feeds (LinkedIn/FB) |
| Favicon | `black` | Maximum legibility at 16–32px |
| Email header | `navy` | Email clients render navy more reliably |

### 6. Checklist row added

`master-logo-colorway-set` — verifies the trade picked a colorway and that every visible logo passes contrast against its surface.

## What gets embedded when you re-upload (the binaries)

20 files into `src/master/assets/logo/` (10 navy, 10 white) using the existing naming convention:

```text
cmb-navy-{hero,large,medium,small}.png
cmb-navy-footer-{large,medium,small}.png
cmb-navy-nav-{large,medium,small}.png

cmb-white-{hero,large,medium,small}.png
cmb-white-footer-{large,medium,small}.png
cmb-white-nav-{large,medium,small}.png
```

Plus 1 derived file: `public/og-image-cmb-navy.png` (copy of `cmb-navy-small.png`) for trades that pick navy as their share color.

Then 20 import lines flip from black-aliases to real navy/white imports, and `COLORWAY_STATUS` flips both to `ready`. Done.

## Wiring after embed

- `src/components/drywall/Navigation.tsx` and `Footer.tsx` already use `<MasterLogo>` — they automatically pick up the new colorway.
- `index.html` OG/favicon URLs gain colorway-aware variants generated at remix time.
- No page-level edits required for any of the 18 existing pages.

## Out of scope (this pass)

- Generating the OG image dynamically (still uses the static fallback).
- Per-trade AI logo generation (separate prior plan, untouched).
- Auto-detecting surface darkness from a hero image (manual `colorway` prop is sufficient).

## How to proceed

Approve this plan and re-upload the **navy + white** packages in your next message. I'll embed all 20 binaries, refactor the registry to point at the real files, flip `COLORWAY_STATUS` to `ready`, and update `LOGO_USAGE.md` with the recommendation table — in one pass, no further questions.
