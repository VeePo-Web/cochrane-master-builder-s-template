## What you uploaded

The full **navy colorway** package — 10 PNGs matching the black set 1:1:

- `cmb-full-logo-ground-navy-{hero, large, medium, small}.png`
- `cmb-full-logo-ground-navy-nav-{small, medium, large}.png`
- `cmb-full-logo-ground-navy-footer-{small, medium, large}.png`

I'm in plan mode this turn (read-only), so I can't copy binaries or edit code yet. Approving this plan switches to build mode and I'll execute it in a single pass.

## What I'll do once approved

### 1. Embed the 10 navy binaries

Copy each upload into `src/master/assets/logo/` with a `cmb-navy-` prefix so they sit next to the black set without colliding:

| Upload | → Destination |
|---|---|
| `cmb-full-logo-ground-navy-hero.png` | `src/master/assets/logo/cmb-navy-hero.png` |
| `cmb-full-logo-ground-navy-large.png` | `src/master/assets/logo/cmb-navy-large.png` |
| `cmb-full-logo-ground-navy-medium.png` | `src/master/assets/logo/cmb-navy-medium.png` |
| `cmb-full-logo-ground-navy-small.png` | `src/master/assets/logo/cmb-navy-small.png` |
| `cmb-full-logo-ground-navy-nav-large.png` | `src/master/assets/logo/cmb-navy-nav-large.png` |
| `cmb-full-logo-ground-navy-nav-medium.png` | `src/master/assets/logo/cmb-navy-nav-medium.png` |
| `cmb-full-logo-ground-navy-nav-small.png` | `src/master/assets/logo/cmb-navy-nav-small.png` |
| `cmb-full-logo-ground-navy-footer-large.png` | `src/master/assets/logo/cmb-navy-footer-large.png` |
| `cmb-full-logo-ground-navy-footer-medium.png` | `src/master/assets/logo/cmb-navy-footer-medium.png` |
| `cmb-full-logo-ground-navy-footer-small.png` | `src/master/assets/logo/cmb-navy-footer-small.png` |

### 2. Flip the registry from aliases to real imports

In `src/master/brand/logo-registry.ts`, replace the 10 `const cmbNavy* = cmbBlack*` aliases (lines 38–50) with real Vite `import` statements pointing at the new files. The `MASTER_LOGOS.navy` block stays unchanged because it already references the right variable names — only the imports change.

### 3. Mark navy as `ready`

In the same file, expand `COLORWAY_STATUS` to a 3-state enum (`"ready" | "uploaded-pending-embed" | "pending"`) and set `navy: "ready"`. White stays `"pending"` until you upload that set.

### 4. Update the slot map doc

Add a "Colorway file inventory" section to `src/master/brand/LOGO_SLOT_MAP.md` showing the per-colorway file path for every slot — black ✅, navy ✅, white ⏳ — so any remixer can see at a glance which colorways are live.

### 5. Type-check

Run `tsc --noEmit` to confirm nothing broke. The build should be clean because the variable names in `MASTER_LOGOS` are unchanged — only their backing source swapped from black-alias to navy-real.

## What this unlocks

- Any trade can set `TRADE.identity.logoColorway = "navy"` in `trade.config.ts` and the entire site (nav, footer, hero, loading, modal, about, 404, email) instantly switches to navy.
- The dashboard's `master-logo-binaries-embedded` checklist row will pass for both black and navy.
- White stays aliased to black until that set is uploaded — no breakage.

## Files touched

- **Created (10):** all `src/master/assets/logo/cmb-navy-*.png`
- **Edited (2):** `src/master/brand/logo-registry.ts`, `src/master/brand/LOGO_SLOT_MAP.md`
- **Untouched:** `MasterLogo.tsx`, `Navigation.tsx`, `Footer.tsx`, `trade.config.ts`, `index.html`, `seo.ts`, `checklist.ts` — already wired correctly.