/**
 * COCHRANE MASTER BUILDERS — Navigation UI/UX Persona
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * All navigation design decisions should be filtered through this persona
 * and the Cochrane Master Builders brand identity (premium automotive craftsmanship, quiet confidence).
 */

export const NAV_PERSONA = {
  expertise: "Senior UI/UX architect specializing in premium automotive and luxury service navigation patterns",

  principles: {
    clarity: "Navigation must communicate site structure in under 2 seconds — vehicle owners value their time",
    hierarchy: "Primary CTA (Book Now) must be visually distinct from navigation links — the one element that breaks the pattern",
    consistency: "Navigation behavior must be predictable across all pages and breakpoints — inconsistency signals carelessness",
    conversion: "Every nav state should subtly guide toward booking — the primary conversion action for Cochrane Master Builders",
    trust: "Navigation design signals professionalism — sloppy nav = sloppy detailer perception",
    precision: "Navigation should feel precise and intentional — reflecting Cochrane Master Builders's meticulous craft and attention to detail",
  },

  decisions: {
    stickyBehavior: {
      rule: "Sticky nav on scroll — reduces friction for long pages",
      rationale: "Vehicle owners browse services and portfolio extensively; persistent access to CTA and key pages is essential for conversion",
    },
    mobilePattern: {
      rule: "Hamburger menu with full-screen bespoke overlay on mobile",
      rationale: "Clean mobile experience; overlay creates focus and feels intentional — matching the premium automotive brand. Not a compressed list, but a curated experience.",
    },
    activeState: {
      rule: "Subtle underline or weight shift — never heavy borders or background fills",
      rationale: "Active states should inform, not distract. Precision and restraint match Cochrane Master Builders's identity — the mark of a current state, not a shout.",
    },
    ctaPlacement: {
      rule: "Primary CTA ('Book Now') as right-aligned button in nav",
      rationale: "Separates action from exploration; always accessible for the client when they're ready to book their detail",
    },
    transparency: {
      rule: "Transparent nav on hero sections (clear coat state); solid on scroll and inner pages (cured coating state)",
      rationale: "Maximizes hero impact (portfolio imagery, transformation shots) while maintaining readability on content pages. The clear-coat-to-solid transition mirrors the detailing process.",
    },
    spacing: {
      rule: "Generous horizontal spacing between nav items; comfortable click/tap targets (44px minimum)",
      rationale: "Prevents misclicks; communicates quality through breathing room — a luxury signal. The same precision spacing Cochrane Master Builders applies to their work.",
    },
    dropdowns: {
      rule: "Use sparingly — only if service tiers (Maintenance, Enhancement, Signature, Flagship) need sub-navigation",
      rationale: "Flat navigation is faster and clearer; busy vehicle owners have limited patience — don't add decision fatigue",
    },
    scrollProgress: {
      rule: "Thin iridescent gradient line at bottom of nav showing scroll progress",
      rationale: "Mirrors the paint correction progress metaphor. Same visual language as footer's decorative line — the nav/footer unified system easter egg.",
    },
    logoTransition: {
      rule: "Logo/brand mark transitions on scroll — full wordmark on hero, condensed monogram when scrolled",
      rationale: "Saves horizontal space in scrolled state while maintaining brand presence. The transition should feel like a coating settling into its final form.",
    },
  },

  navFooterUnifiedSystem: {
    concept: "The nav (clear coat) and footer (primer/foundation) are two halves of one system — the paint depth layers",
    sharedMotif: "Iridescent gradient line appears in both nav (scroll progress) and footer (decorative element) — the ceramic coating sheen signature",
    designDNA: "Same spacing rhythm, typographic hierarchy, and color relationships in both components",
    discovery: "Attentive visitors recognize the connection between nav and footer — a quiet reward for engagement",
  },

  antiPatterns: [
    "Racing stripes, checkered flags, or obvious automotive clichés — Cochrane Master Builders is premium, not themed",
    "Nav items that compete visually with the Book Now CTA",
    "Animated hamburger icons that feel playful when the brand is precise and confident",
    "Too many nav items (max 6-7 including CTA)",
    "Nav that disappears on scroll without a way to re-access",
    "Inconsistent nav between pages — breaks trust immediately",
    "Overly trendy nav patterns that won't feel timeless — Cochrane Master Builders's quality endures",
    "Loud colors or aggressive styling in the nav — confidence is quiet",
    "Generic CSS transitions — every animation must be custom-eased and intentional",
    "Thin, weightless lines — everything must feel substantial and crafted",
  ],
} as const;
