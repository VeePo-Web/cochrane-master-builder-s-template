/**
 * <MasterLogo> — the only logo primitive any page or component should use.
 *
 * - Picks the correctly-cropped variant for its slot (nav | footer | hero | loading | medium | large).
 * - For nav and footer, uses native <picture> + <source media> so the browser
 *   downloads only the size it needs (perf budget — see PERFORMANCE_PLAYBOOK).
 * - Always sets width/height attrs so there is zero CLS.
 * - alt copy is the parent brand name; remix overrides only when the trade
 *   identity legally requires a different lockup.
 *
 * Usage:
 *   <MasterLogo slot="nav" />
 *   <MasterLogo slot="footer" />
 *   <MasterLogo slot="hero" className="mx-auto max-w-md" />
 *   <MasterLogo slot="medium" />
 */

import { MASTER_LOGOS } from "./logo-registry";
import { MASTER } from "./identity";

type ResponsiveSlot = "nav" | "footer";
type SingleSlot = "hero" | "large" | "medium" | "small" | "loading";

interface MasterLogoProps {
  slot: ResponsiveSlot | SingleSlot;
  className?: string;
  /** Override default alt (rare — usually leave unset) */
  alt?: string;
  /** eager for above-the-fold (nav, loading); lazy for below-the-fold */
  loading?: "eager" | "lazy";
  /** Optional click handler (e.g. nav lockup wrapping a Link) */
  onClick?: () => void;
}

const ALT_DEFAULT = MASTER.brandName; // "Cochrane Master Builders"

const SLOT_HEIGHT: Record<MasterLogoProps["slot"], string> = {
  nav: "h-9 sm:h-9 lg:h-10",
  footer: "h-16 md:h-20 lg:h-24",
  hero: "h-auto w-full max-w-xl",
  large: "h-auto w-full max-w-lg",
  medium: "h-auto w-full max-w-sm",
  small: "h-auto w-32",
  loading: "h-auto w-28",
};

const MasterLogo = ({
  slot,
  className = "",
  alt = ALT_DEFAULT,
  loading,
  onClick,
}: MasterLogoProps) => {
  const sizing = SLOT_HEIGHT[slot];
  const eager = loading ?? (slot === "nav" || slot === "loading" ? "eager" : "lazy");
  const fetchPriority = eager === "eager" ? "high" : "low";

  // Responsive slots use <picture> with <source media> queries
  if (slot === "nav") {
    return (
      <picture onClick={onClick} className={`inline-block ${onClick ? "cursor-pointer" : ""}`}>
        <source media="(min-width: 1024px)" srcSet={MASTER_LOGOS.nav.lg} />
        <source media="(min-width: 640px)" srcSet={MASTER_LOGOS.nav.md} />
        <img
          src={MASTER_LOGOS.nav.sm}
          alt={alt}
          className={`${sizing} w-auto object-contain ${className}`}
          loading={eager}
          // @ts-expect-error - non-standard but supported attr
          fetchpriority={fetchPriority}
          decoding="async"
          width={280}
          height={224}
        />
      </picture>
    );
  }

  if (slot === "footer") {
    return (
      <picture onClick={onClick} className="inline-block">
        <source media="(min-width: 1024px)" srcSet={MASTER_LOGOS.footer.lg} />
        <source media="(min-width: 768px)" srcSet={MASTER_LOGOS.footer.md} />
        <img
          src={MASTER_LOGOS.footer.sm}
          alt={alt}
          className={`${sizing} w-auto object-contain ${className}`}
          loading={eager}
          decoding="async"
          width={400}
          height={320}
        />
      </picture>
    );
  }

  // Single-source slots
  const src =
    slot === "hero"
      ? MASTER_LOGOS.hero
      : slot === "large"
      ? MASTER_LOGOS.large
      : slot === "medium"
      ? MASTER_LOGOS.medium
      : MASTER_LOGOS.small; // small + loading both use the small file

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizing} object-contain ${className}`}
      loading={eager}
      // @ts-expect-error - non-standard but supported attr
      fetchpriority={fetchPriority}
      decoding="async"
      onClick={onClick}
    />
  );
};

export default MasterLogo;
