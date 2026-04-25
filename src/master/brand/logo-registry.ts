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

// ── White colorway (TODO: assets pending upload) ───────────────────────────
// When uploaded, swap each alias to a real import:
//   import cmbWhiteHero from "../assets/logo/cmb-white-hero.png";
const cmbWhiteHero = cmbBlackHero;
const cmbWhiteLarge = cmbBlackLarge;
const cmbWhiteMedium = cmbBlackMedium;
const cmbWhiteSmall = cmbBlackSmall;
const cmbWhiteFooterLg = cmbBlackFooterLg;
const cmbWhiteFooterMd = cmbBlackFooterMd;
const cmbWhiteFooterSm = cmbBlackFooterSm;
const cmbWhiteNavLg = cmbBlackNavLg;
const cmbWhiteNavMd = cmbBlackNavMd;
const cmbWhiteNavSm = cmbBlackNavSm;

export type LogoColorway = "black" | "navy" | "white";

/**
 * Per-colorway file map. Same shape across colorways — the remixer can swap
 * colorways without touching component code.
 */
export const MASTER_LOGOS = {
  black: {
    nav: { sm: cmbBlackNavSm, md: cmbBlackNavMd, lg: cmbBlackNavLg },
    footer: { sm: cmbBlackFooterSm, md: cmbBlackFooterMd, lg: cmbBlackFooterLg },
    hero: cmbBlackHero,
    large: cmbBlackLarge,
    medium: cmbBlackMedium,
    small: cmbBlackSmall,
  },
  navy: {
    nav: { sm: cmbNavyNavSm, md: cmbNavyNavMd, lg: cmbNavyNavLg },
    footer: { sm: cmbNavyFooterSm, md: cmbNavyFooterMd, lg: cmbNavyFooterLg },
    hero: cmbNavyHero,
    large: cmbNavyLarge,
    medium: cmbNavyMedium,
    small: cmbNavySmall,
  },
  white: {
    nav: { sm: cmbWhiteNavSm, md: cmbWhiteNavMd, lg: cmbWhiteNavLg },
    footer: { sm: cmbWhiteFooterSm, md: cmbWhiteFooterMd, lg: cmbWhiteFooterLg },
    hero: cmbWhiteHero,
    large: cmbWhiteLarge,
    medium: cmbWhiteMedium,
    small: cmbWhiteSmall,
  },
} as const;

/** Which colorways have *real* uploaded assets (vs aliasing to black).
 *  - "ready"   → real PNGs imported, safe to ship
 *  - "pending" → no artwork yet; aliases to black
 */
export const COLORWAY_STATUS: Record<LogoColorway, "ready" | "pending"> = {
  black: "ready",
  navy: "ready",
  white: "pending", // upload PNGs to embed
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
