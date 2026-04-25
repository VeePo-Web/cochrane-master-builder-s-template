/**
 * MASTER LOGO REGISTRY — Single source of truth for the Cochrane Master
 * Builders logo across every remixed trade site.
 *
 * Vite import means each PNG is bundled, hashed, and tree-shaken if unused.
 * NEVER hard-code a `/src/master/assets/logo/...` path elsewhere — always
 * import from this file (or use the <MasterLogo> component) so we have one
 * place to swap variants per-remix.
 */

import cmbHero from "../assets/logo/cmb-hero.png";
import cmbLarge from "../assets/logo/cmb-large.png";
import cmbMedium from "../assets/logo/cmb-medium.png";
import cmbSmall from "../assets/logo/cmb-small.png";
import cmbFooterLg from "../assets/logo/cmb-footer-large.png";
import cmbFooterMd from "../assets/logo/cmb-footer-medium.png";
import cmbFooterSm from "../assets/logo/cmb-footer-small.png";
import cmbNavLg from "../assets/logo/cmb-nav-large.png";
import cmbNavMd from "../assets/logo/cmb-nav-medium.png";
import cmbNavSm from "../assets/logo/cmb-nav-small.png";

export const MASTER_LOGOS = {
  /** Navigation lockups — pre-cropped to nav-bar proportions */
  nav: { sm: cmbNavSm, md: cmbNavMd, lg: cmbNavLg },
  /** Footer lockups — pre-cropped to footer-block proportions */
  footer: { sm: cmbFooterSm, md: cmbFooterMd, lg: cmbFooterLg },
  /** General-purpose lockups */
  hero: cmbHero,
  large: cmbLarge,
  medium: cmbMedium,
  small: cmbSmall,
} as const;

/**
 * The contract: which logo file is allowed where, and why.
 * The brand-audit playbook references this map; the /remix checklist
 * verifies every slot resolves to one of these entries.
 */
export const LOGO_USAGE_MAP = {
  nav: {
    desktop: { file: "cmb-nav-large.png", maxHeightPx: 44, breakpoint: ">=1024px" },
    tablet: { file: "cmb-nav-medium.png", maxHeightPx: 38, breakpoint: "640–1023px" },
    mobile: { file: "cmb-nav-small.png", maxHeightPx: 34, breakpoint: "<640px" },
    note: "Nav variants are square-cropped to keep the bar compact.",
  },
  footer: {
    desktop: { file: "cmb-footer-large.png", maxHeightPx: 96, breakpoint: ">=1024px" },
    tablet: { file: "cmb-footer-medium.png", maxHeightPx: 80, breakpoint: "768–1023px" },
    mobile: { file: "cmb-footer-small.png", maxHeightPx: 64, breakpoint: "<768px" },
    note: "Footer is the brand monument — show the full lockup.",
  },
  loading: { file: "cmb-small.png", maxHeightPx: 120, note: "Splash/loading screens." },
  hero: { file: "cmb-hero.png", maxWidthPx: 720, note: "Marketing hero watermark only — never as headline." },
  about: { file: "cmb-large.png", maxWidthPx: 600, note: "About-page brand monument." },
  bookingModal: { file: "cmb-medium.png", maxHeightPx: 120, note: "Left rail of the booking modal." },
  notFound: { file: "cmb-medium.png", maxHeightPx: 120, note: "404 page mark." },
  email: { file: "/og-image-cmb.png", maxWidthPx: 280, note: "Hosted via /public so email clients can fetch it." },
  og: { file: "/og-image-cmb.png", note: "Open Graph + Twitter share image." },
  favicon: { file: "/favicon-cmb.png", note: "Crawler / browser tab favicon." },
} as const;

export type LogoSlot = keyof typeof LOGO_USAGE_MAP;
