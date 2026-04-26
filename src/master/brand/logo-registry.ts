/**
 * MASTER LOGO REGISTRY — Single source of truth for the Cochrane Master
 * Builders logo across every remixed trade site.
 *
 * Vite import means each PNG is bundled, hashed, and tree-shaken if unused.
 * NEVER hard-code a `/src/master/assets/logo/...` path elsewhere — always
 * import from this file (or use the <MasterLogo> component) so we have one
 * place to swap variants per-remix.
 *
 * COLORWAYS
 * ─────────
 * Three official colorways — pick one per trade in `trade.config.ts ->
 * identity.logoColorway`. Per-surface overrides allowed via the `colorway`
 * prop on <MasterLogo>.
 *
 *   - black : default. Master file. Reads as architectural / serious.
 *   - navy  : softer than black on warm cream backgrounds. Editorial.
 *   - white : reverse colorway. Required for any dark surface.
 *
 * Files that aren't yet uploaded fall back to the black colorway at runtime
 * via the local aliases below. Keeps the build green while the remaining
 * navy/white assets land. When binaries arrive, swap the aliases for real
 * imports — no other file needs to change.
 */

// ── Black colorway (master file — always present) ──────────────────────────
import cmbBlackHero from "../assets/logo/cmb-hero.png";
import cmbBlackLarge from "../assets/logo/cmb-large.png";
import cmbBlackMedium from "../assets/logo/cmb-medium.png";
import cmbBlackSmall from "../assets/logo/cmb-small.png";
import cmbBlackFooterLg from "../assets/logo/cmb-footer-large.png";
import cmbBlackFooterMd from "../assets/logo/cmb-footer-medium.png";
import cmbBlackFooterSm from "../assets/logo/cmb-footer-small.png";
import cmbBlackNavLg from "../assets/logo/cmb-nav-large.png";
import cmbBlackNavMd from "../assets/logo/cmb-nav-medium.png";
import cmbBlackNavSm from "../assets/logo/cmb-nav-small.png";

// ── Navy colorway (✅ embedded) ────────────────────────────────────────────
import cmbNavyHero from "../assets/logo/cmb-navy-hero.png";
import cmbNavyLarge from "../assets/logo/cmb-navy-large.png";
import cmbNavyMedium from "../assets/logo/cmb-navy-medium.png";
import cmbNavySmall from "../assets/logo/cmb-navy-small.png";
import cmbNavyFooterLg from "../assets/logo/cmb-navy-footer-large.png";
import cmbNavyFooterMd from "../assets/logo/cmb-navy-footer-medium.png";
import cmbNavyFooterSm from "../assets/logo/cmb-navy-footer-small.png";
import cmbNavyNavLg from "../assets/logo/cmb-navy-nav-large.png";
import cmbNavyNavMd from "../assets/logo/cmb-navy-nav-medium.png";
import cmbNavyNavSm from "../assets/logo/cmb-navy-nav-small.png";

// ── White colorway (✅ embedded) ───────────────────────────────────────────
import cmbWhiteHero from "../assets/logo/cmb-white-hero.png";
import cmbWhiteLarge from "../assets/logo/cmb-white-large.png";
import cmbWhiteMedium from "../assets/logo/cmb-white-medium.png";
import cmbWhiteSmall from "../assets/logo/cmb-white-small.png";
import cmbWhiteFooterLg from "../assets/logo/cmb-white-footer-large.png";
import cmbWhiteFooterMd from "../assets/logo/cmb-white-footer-medium.png";
import cmbWhiteFooterSm from "../assets/logo/cmb-white-footer-small.png";
import cmbWhiteNavLg from "../assets/logo/cmb-white-nav-large.png";
import cmbWhiteNavMd from "../assets/logo/cmb-white-nav-medium.png";
import cmbWhiteNavSm from "../assets/logo/cmb-white-nav-small.png";

// ── Emblem family (square, no wordmark) ────────────────────────────────────
// All three colorways ✅ embedded (6 sizes each). Matrix complete.
import cmbEmblemBlack100 from "../assets/logo/cmb-emblem-black-100.png";
import cmbEmblemBlack200 from "../assets/logo/cmb-emblem-black-200.png";
import cmbEmblemBlack400 from "../assets/logo/cmb-emblem-black-400.png";
import cmbEmblemBlack800 from "../assets/logo/cmb-emblem-black-800.png";
import cmbEmblemBlack1200 from "../assets/logo/cmb-emblem-black-1200.png";
import cmbEmblemBlack2400 from "../assets/logo/cmb-emblem-black-2400.png";

import cmbEmblemNavy100 from "../assets/logo/cmb-emblem-navy-100.png";
import cmbEmblemNavy200 from "../assets/logo/cmb-emblem-navy-200.png";
import cmbEmblemNavy400 from "../assets/logo/cmb-emblem-navy-400.png";
import cmbEmblemNavy800 from "../assets/logo/cmb-emblem-navy-800.png";
import cmbEmblemNavy1200 from "../assets/logo/cmb-emblem-navy-1200.png";
import cmbEmblemNavy2400 from "../assets/logo/cmb-emblem-navy-2400.png";

import cmbEmblemWhite100 from "../assets/logo/cmb-emblem-white-100.png";
import cmbEmblemWhite200 from "../assets/logo/cmb-emblem-white-200.png";
import cmbEmblemWhite400 from "../assets/logo/cmb-emblem-white-400.png";
import cmbEmblemWhite800 from "../assets/logo/cmb-emblem-white-800.png";
import cmbEmblemWhite1200 from "../assets/logo/cmb-emblem-white-1200.png";
import cmbEmblemWhite2400 from "../assets/logo/cmb-emblem-white-2400.png";

// ── Tiles family (exploded/deconstructed mark — 3 separated panels) ────────
// All three colorways ✅ embedded (6 sizes each). Matrix complete.
import cmbTilesBlack100 from "../assets/logo/cmb-tiles-black-100.png";
import cmbTilesBlack200 from "../assets/logo/cmb-tiles-black-200.png";
import cmbTilesBlack400 from "../assets/logo/cmb-tiles-black-400.png";
import cmbTilesBlack800 from "../assets/logo/cmb-tiles-black-800.png";
import cmbTilesBlack1200 from "../assets/logo/cmb-tiles-black-1200.png";
import cmbTilesBlack2400 from "../assets/logo/cmb-tiles-black-2400.png";

import cmbTilesNavy100 from "../assets/logo/cmb-tiles-navy-100.png";
import cmbTilesNavy200 from "../assets/logo/cmb-tiles-navy-200.png";
import cmbTilesNavy400 from "../assets/logo/cmb-tiles-navy-400.png";
import cmbTilesNavy800 from "../assets/logo/cmb-tiles-navy-800.png";
import cmbTilesNavy1200 from "../assets/logo/cmb-tiles-navy-1200.png";
import cmbTilesNavy2400 from "../assets/logo/cmb-tiles-navy-2400.png";

import cmbTilesWhite100 from "../assets/logo/cmb-tiles-white-100.png";
import cmbTilesWhite200 from "../assets/logo/cmb-tiles-white-200.png";
import cmbTilesWhite400 from "../assets/logo/cmb-tiles-white-400.png";
import cmbTilesWhite800 from "../assets/logo/cmb-tiles-white-800.png";
import cmbTilesWhite1200 from "../assets/logo/cmb-tiles-white-1200.png";
import cmbTilesWhite2400 from "../assets/logo/cmb-tiles-white-2400.png";

export type LogoColorway = "black" | "navy" | "white";
export type EmblemSize = 100 | 200 | 400 | 800 | 1200 | 2400;
/** Tiles share the emblem size ladder — single source of truth. */
export type TileSize = EmblemSize;

/**
 * Per-colorway file map. Same shape across colorways — the remixer can swap
 * colorways without touching component code.
 */
/** Square emblem-only files keyed by edge length in px. */
const EMBLEM_BLACK = {
  100: cmbEmblemBlack100,
  200: cmbEmblemBlack200,
  400: cmbEmblemBlack400,
  800: cmbEmblemBlack800,
  1200: cmbEmblemBlack1200,
  2400: cmbEmblemBlack2400,
} as const;

const EMBLEM_NAVY = {
  100: cmbEmblemNavy100,
  200: cmbEmblemNavy200,
  400: cmbEmblemNavy400,
  800: cmbEmblemNavy800,
  1200: cmbEmblemNavy1200,
  2400: cmbEmblemNavy2400,
} as const;

const EMBLEM_WHITE = {
  100: cmbEmblemWhite100,
  200: cmbEmblemWhite200,
  400: cmbEmblemWhite400,
  800: cmbEmblemWhite800,
  1200: cmbEmblemWhite1200,
  2400: cmbEmblemWhite2400,
} as const;

/** Square exploded/tiled-emblem files keyed by edge length in px. */
const TILES_BLACK = {
  100: cmbTilesBlack100,
  200: cmbTilesBlack200,
  400: cmbTilesBlack400,
  800: cmbTilesBlack800,
  1200: cmbTilesBlack1200,
  2400: cmbTilesBlack2400,
} as const;

// Navy tiles ✅ embedded as a real map.
const TILES_NAVY = {
  100: cmbTilesNavy100,
  200: cmbTilesNavy200,
  400: cmbTilesNavy400,
  800: cmbTilesNavy800,
  1200: cmbTilesNavy1200,
  2400: cmbTilesNavy2400,
} as const;

// White tiles ✅ embedded as a real map.
const TILES_WHITE = {
  100: cmbTilesWhite100,
  200: cmbTilesWhite200,
  400: cmbTilesWhite400,
  800: cmbTilesWhite800,
  1200: cmbTilesWhite1200,
  2400: cmbTilesWhite2400,
} as const;

export const MASTER_LOGOS = {
  black: {
    nav: { sm: cmbBlackNavSm, md: cmbBlackNavMd, lg: cmbBlackNavLg },
    footer: { sm: cmbBlackFooterSm, md: cmbBlackFooterMd, lg: cmbBlackFooterLg },
    hero: cmbBlackHero,
    large: cmbBlackLarge,
    medium: cmbBlackMedium,
    small: cmbBlackSmall,
    emblem: EMBLEM_BLACK,
    tiles: TILES_BLACK,
  },
  navy: {
    nav: { sm: cmbNavyNavSm, md: cmbNavyNavMd, lg: cmbNavyNavLg },
    footer: { sm: cmbNavyFooterSm, md: cmbNavyFooterMd, lg: cmbNavyFooterLg },
    hero: cmbNavyHero,
    large: cmbNavyLarge,
    medium: cmbNavyMedium,
    small: cmbNavySmall,
    // Navy emblem ✅ embedded.
    emblem: EMBLEM_NAVY,
    // Navy tiles ✅ embedded.
    tiles: TILES_NAVY,
  },
  white: {
    nav: { sm: cmbWhiteNavSm, md: cmbWhiteNavMd, lg: cmbWhiteNavLg },
    footer: { sm: cmbWhiteFooterSm, md: cmbWhiteFooterMd, lg: cmbWhiteFooterLg },
    hero: cmbWhiteHero,
    large: cmbWhiteLarge,
    medium: cmbWhiteMedium,
    small: cmbWhiteSmall,
    // White emblem ✅ embedded.
    emblem: EMBLEM_WHITE,
    // White tiles aliased to black until that package lands.
    tiles: TILES_WHITE,
  },
} as const;

/** Per-colorway readiness for the emblem family specifically. */
export const EMBLEM_STATUS: Record<LogoColorway, "ready" | "aliased"> = {
  black: "ready",
  navy: "ready",
  white: "ready",
};

/** Per-colorway readiness for the tiles family specifically. */
export const TILES_STATUS: Record<LogoColorway, "ready" | "aliased"> = {
  black: "ready",
  navy: "ready",
  white: "aliased",
};

export const EMBLEM_SIZES: EmblemSize[] = [100, 200, 400, 800, 1200, 2400];
/** Tiles share the emblem size ladder. */
export const TILE_SIZES: TileSize[] = [100, 200, 400, 800, 1200, 2400];

/** Which colorways have *real* uploaded assets.
 *  All three colorways are now embedded and live.
 */
export const COLORWAY_STATUS: Record<LogoColorway, "ready" | "pending"> = {
  black: "ready",
  navy: "ready",
  white: "ready",
};

/**
 * The contract: which logo file is allowed where, and why.
 * Each slot declares its **default surface** so we can recommend a colorway
 * per-slot via `recommendedColorwayForSlot`.
 */
export const LOGO_USAGE_MAP = {
  nav: {
    desktop: { file: "cmb-nav-large.png", maxHeightPx: 44, breakpoint: ">=1024px" },
    tablet: { file: "cmb-nav-medium.png", maxHeightPx: 38, breakpoint: "640–1023px" },
    mobile: { file: "cmb-nav-small.png", maxHeightPx: 34, breakpoint: "<640px" },
    surface: "light" as const,
    note: "Nav variants are square-cropped to keep the bar compact.",
  },
  footer: {
    desktop: { file: "cmb-footer-large.png", maxHeightPx: 96, breakpoint: ">=1024px" },
    tablet: { file: "cmb-footer-medium.png", maxHeightPx: 80, breakpoint: "768–1023px" },
    mobile: { file: "cmb-footer-small.png", maxHeightPx: 64, breakpoint: "<768px" },
    surface: "light" as const,
    note: "Footer is the brand monument — show the full lockup.",
  },
  loading: { file: "cmb-small.png", maxHeightPx: 120, surface: "dark" as const, note: "Splash/loading screens — usually dark surface, prefer white." },
  hero: { file: "cmb-hero.png", maxWidthPx: 720, surface: "image" as const, note: "Marketing hero watermark — colorway chosen to contrast the hero photo." },
  about: { file: "cmb-large.png", maxWidthPx: 600, surface: "light" as const, note: "About-page brand monument." },
  bookingModal: { file: "cmb-medium.png", maxHeightPx: 120, surface: "light" as const, note: "Left rail of the booking modal." },
  notFound: { file: "cmb-medium.png", maxHeightPx: 120, surface: "light" as const, note: "404 page mark." },
  email: { file: "/og-image-cmb.png", maxWidthPx: 280, surface: "light" as const, note: "Hosted via /public so email clients can fetch it." },
  og: { file: "/og-image-cmb.png", surface: "image" as const, note: "Open Graph + Twitter share image." },
  favicon: { file: "/favicon-cmb.png", surface: "any" as const, note: "Crawler / browser tab favicon." },

  // ── Emblem family (square 1:1, no wordmark) ──
  emblemFavicon:   { file: "cmb-emblem-black-100.png",  maxHeightPx: 32,   surface: "any"   as const, note: "Browser tab / list bullet / chat avatar — 32–48px display." },
  emblemAvatar:    { file: "cmb-emblem-black-200.png",  maxHeightPx: 64,   surface: "any"   as const, note: "Nav-collapsed mark / mobile avatar / retina favicon." },
  emblemInline:    { file: "cmb-emblem-black-400.png",  maxHeightPx: 128,  surface: "light" as const, note: "Inline body badges, card crests, OG icon." },
  emblemAccent:    { file: "cmb-emblem-black-800.png",  maxHeightPx: 240,  surface: "any"   as const, note: "Hero accent, section divider monogram, scroll-back-to-top." },
  emblemWatermark: { file: "cmb-emblem-black-1200.png", maxHeightPx: 480,  surface: "image" as const, note: "Full-page watermark, splash crest, og-square." },
  emblemPrint:     { file: "cmb-emblem-black-2400.png", maxHeightPx: 1200, surface: "any"   as const, note: "Print master / billboard / 5K hero crest. Lazy-load only." },

  // ── Tiles family (exploded mark — three separated panels) ──
  // The kinetic identity. Use when the brand should feel built/assembled,
  // especially with motion. Distinct from emblem (solid crest) and lockup.
  tilesFavicon:     { file: "cmb-tiles-black-100.png",  maxHeightPx: 32,   surface: "any"   as const, note: "Alt favicon for staging/construction-mode environments." },
  tilesAvatar:      { file: "cmb-tiles-black-200.png",  maxHeightPx: 64,   surface: "any"   as const, note: "Team / social avatar where the kinetic look beats the solid crest." },
  tilesAccent:      { file: "cmb-tiles-black-400.png",  maxHeightPx: 128,  surface: "any"   as const, note: "Section divider mark; can animate the three panels in sequence." },
  tilesProcess:     { file: "cmb-tiles-black-800.png",  maxHeightPx: 240,  surface: "light" as const, note: "Process / craft pages — one tile per step, animated assembly." },
  tilesLoadingHero: { file: "cmb-tiles-black-1200.png", maxHeightPx: 480,  surface: "dark"  as const, note: "Loading splash final reveal — tiles fly in and lock into position." },
  tilesWatermark:   { file: "cmb-tiles-black-2400.png", maxHeightPx: 1200, surface: "image" as const, note: "Full-page background watermark on premium pages at 6–10% opacity." },
} as const;

export type LogoSlot = keyof typeof LOGO_USAGE_MAP;

/**
 * Recommend the best colorway for a slot given the trade's chosen colorway.
 * - light surface → use the trade's chosen ink (white falls back to black)
 * - dark surface  → force white
 * - image surface → default white; per-instance override allowed
 * - any           → trade's chosen colorway
 */
export function recommendedColorwayForSlot(
  slot: LogoSlot,
  tradeColorway: LogoColorway,
): LogoColorway {
  const surface = (LOGO_USAGE_MAP[slot] as { surface?: string }).surface;
  if (surface === "dark") return "white";
  if (surface === "image") return "white";
  if (surface === "any") return tradeColorway;
  // light surface
  return tradeColorway === "white" ? "black" : tradeColorway;
}
