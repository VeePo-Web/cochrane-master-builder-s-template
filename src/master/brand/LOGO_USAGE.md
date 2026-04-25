# Cochrane Master Builders — Logo Usage Map

The 10 master logo files are pre-cropped for specific surfaces. Use the
`<MasterLogo slot="..." />` component from `@/master` — never import a PNG
directly into a page or component.

## Slot → file map

| Slot              | File                          | Where it appears                                |
| ----------------- | ----------------------------- | ----------------------------------------------- |
| `nav` (desktop)   | `cmb-nav-large.png`           | Top nav at ≥1024px                              |
| `nav` (tablet)    | `cmb-nav-medium.png`          | Top nav at 640–1023px                           |
| `nav` (mobile)    | `cmb-nav-small.png`           | Top nav at <640px                               |
| `footer` (desktop)| `cmb-footer-large.png`        | Footer brand block at ≥1024px                   |
| `footer` (tablet) | `cmb-footer-medium.png`       | Footer brand block at 768–1023px                |
| `footer` (mobile) | `cmb-footer-small.png`        | Footer brand block at <768px                    |
| `loading`         | `cmb-small.png`               | Loading / splash screens                        |
| `hero`            | `cmb-hero.png`                | Hero watermarks, splash moments                 |
| `large`           | `cmb-large.png`               | About-page brand monument, marketing modules    |
| `medium`          | `cmb-medium.png`              | Booking modal left rail, 404 page, mid sections |
| `small`           | `cmb-small.png`               | Compact lockups, secondary placements           |
| `og` (meta)       | `/public/og-image-cmb.png`    | Open Graph + Twitter share card                 |
| `favicon` (meta)  | `/public/favicon-cmb.png`     | Browser tab + crawler favicon fallback          |

The responsive nav and footer slots auto-pick the right variant via
`<picture>` + `<source media>` so the browser only downloads what it needs.

## Hard rules — never violated

1. **Never recolor.** The mark ships in master black; do not invert, tint,
   or apply gradients. If you need it on a dark surface, use a light
   background card behind it instead.
2. **Never stretch.** Always preserve aspect ratio. The `<MasterLogo>`
   component enforces `object-contain` for you.
3. **Clear space.** Allow at least 1× the height of the M-bar of empty
   space around the mark on every side.
4. **No effects.** No drop shadows, no glow, no parallax tilt, no hover
   scale > 1.02.
5. **No text overlays.** Never place type on top of the lockup.
6. **Never replace per-remix without override.** A trade site that wants a
   sub-mark adds it *next to* the master logo, not in place of it. Use
   `identity.logoOverride` in `trade.config.ts` only when the trade has
   its own legally distinct mark.

## How to override per-remix

In `src/config/trade.config.ts`:

```ts
identity: {
  // ...
  logoOverride: {
    nav: '/path-or-import',
    footer: '/path-or-import',
  },
}
```

Leaving `logoOverride` unset (the default) means every remix renders the
Cochrane Master Builders master lockup automatically.
