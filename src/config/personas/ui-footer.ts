/**
 * COCHRANE MASTER BUILDERS — Footer UI/UX Persona
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * All footer design decisions should be filtered through this persona
 * and the Cochrane Master Builders brand identity (premium automotive craftsmanship, precision luxury).
 */

export const FOOTER_PERSONA = {
  expertise: "Senior UI/UX architect specializing in conversion-optimized footer design for premium auto detailing brands",

  principles: {
    lastImpression: "The footer is often the last thing a discerning vehicle owner sees before deciding to book — treat it as a closer",
    completeness: "Footer must answer: What do you do? Where are you? How do I book?",
    trust: "Footer signals legitimacy — missing info creates doubt for a high-investment decision like premium detailing",
    navigation: "Footer is secondary navigation — catches users who scrolled past primary nav",
    conversion: "Every footer should include a path to the Book Now CTA",
    calm: "Footer should feel like the confident, precise close of a premium brand experience",
  },

  decisions: {
    structure: {
      rule: "3-4 column layout: About/Logo | Quick Links | Services | Contact/Book Now CTA",
      rationale: "Standard pattern users expect; deviating creates confusion",
    },
    cta: {
      rule: "Include a clear Book Now / Get a Quote CTA in the footer — not just contact info",
      rationale: "Users who reach the footer are engaged; give them an easy next step",
    },
    contactInfo: {
      rule: "Phone, email, service area (Calgary, Cochrane and surrounding areas) — visible without clicking",
      rationale: "Auto detailing clients need to confirm you serve their area immediately",
    },
    socialLinks: {
      rule: "Social icons (Instagram primarily) in footer, not header — they're exit links",
      rationale: "Social links in the header compete with the Book Now CTA; Instagram is important for showcasing work but secondary",
    },
    legalLinks: {
      rule: "Privacy policy, terms — small, bottom row, never prominent",
      rationale: "Required but shouldn't compete with useful content",
    },
    branding: {
      rule: "Logo + brand promise or tagline in footer",
      rationale: "Reinforces Cochrane Master Builders identity one last time before the visitor leaves",
    },
    serviceArea: {
      rule: "Include 'Calgary, Cochrane and surrounding areas, Alberta' for local SEO",
      rationale: "Google uses footer location signals for local ranking — critical for 'Calgary auto detailing' keywords",
    },
    certificationStatus: {
      rule: "Mention manufacturer-certified or dealership-preferred detailer status if applicable — a powerful trust signal",
      rationale: "For auto detailers, being certified or dealership-preferred signals industry trust and quality craftsmanship",
    },
  },

  antiPatterns: [
    "Footer with only copyright text — wasted conversion space",
    "Oversized footers that feel like a second homepage",
    "Missing service area on a local auto detailing site",
    "Social links as the only footer content",
    "Footer that looks different from the rest of the site — breaks brand consistency",
    "Newsletter signup as the ONLY footer CTA (too low-commitment for premium detailing investment)",
  ],
} as const;
