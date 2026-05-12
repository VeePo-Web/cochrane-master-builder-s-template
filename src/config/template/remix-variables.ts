/**
 * MASTER TEMPLATE — Remix Variable Contract
 *
 * One source of truth for every `{VARIABLE}` slot the template exposes.
 * 150 future Cochrane Master Builders sub-brand sites bind these
 * values in their own `trade.config.ts`. The template never invents
 * service-specific copy on its own — it reads from this file.
 *
 * Governed by partner doc 15_universal_template_wireframe.partner.md.
 * Filtered through 1.5 North Star (legacy luxury), 1.5.6 StoryBrand,
 * 1.5.7 Trade Manifesto, and 1.5.8 Hormozi/Brunson conversion.
 */

export interface PriceBand {
  scope: string;
  range: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SubService {
  title: string;
  summary: string;
  range?: string;
}

export interface ProofPoint {
  before: string;
  after: string;
  caption: string;
}

export interface TrustNumber {
  number: string;
  label: string;
}

export interface RemixVariables {
  /** Sub-brand short name, e.g. "Cochrane Tile Masters". */
  BRAND_NAME: string;
  /** Singular service noun, lower-case. e.g. "tile". */
  SERVICE: string;
  /** Plural form, e.g. "tiles". */
  SERVICE_PLURAL: string;
  /** Verb form, e.g. "tile" (as in "we tile bathrooms"). */
  SERVICE_VERB: string;
  /** Category label for breadcrumbs / schema, e.g. "Interior Finishing". */
  SERVICE_CATEGORY: string;
  /** Hero image asset path. Replace per remix. */
  HERO_IMAGE: string;
  /** Service-area communities. Used by the Areas hub (deferred). */
  COMMUNITIES: string[];
  /** Sub-services that appear on /services and /services/{slug}. */
  SUB_SERVICES: SubService[];
  /** Transparent price bands — Hormozi value anchor. */
  PRICE_BANDS: PriceBand[];
  /** Top FAQs — pulled into Home + service detail. */
  FAQS: FAQ[];
  /** Before/after proof set. */
  PROOF: ProofPoint[];
  /** Trust numbers shown in the hero TrustBar + Reviews page. */
  TRUST_NUMBERS: TrustNumber[];

  // ── Heirloom Brand Identity ─────────────────────────────────────────────
  /** The generational slogan — surfaces in ≥7 places, never hard-coded in components. */
  BRAND_SLOGAN: string;
  /** Year the parent company / this trade was established. Feeds FoundationCounter. */
  FOUNDATION_YEAR: number;
  /** Three monogram letters — parent brand is CMB; remix trade may show e.g. CTM in its own badge. */
  MONOGRAM_LETTERS: [string, string, string];
}

/**
 * MASTER DEFAULTS — neutral master-builder voice, used as the live
 * preview before any remix happens. Variable tokens are kept *visible*
 * in the rendered text (e.g. "{SERVICE}") so a remix author can see
 * exactly what to swap.
 */
export const MASTER_REMIX: RemixVariables = {
  BRAND_NAME: "Cochrane Master Builders",
  SERVICE: "{SERVICE}",
  SERVICE_PLURAL: "{SERVICE_PLURAL}",
  SERVICE_VERB: "{SERVICE_VERB}",
  SERVICE_CATEGORY: "{SERVICE_CATEGORY}",
  HERO_IMAGE: "",
  COMMUNITIES: [
    "Cochrane",
    "Sunset Ridge",
    "Heritage Hills",
    "Riversong",
    "Fireside",
    "Jumping Pound Ridge",
    "Bow Ridge",
    "GlenEagles",
  ],
  SUB_SERVICES: [
    { title: "{SUB_SERVICE_1}", summary: "Brief client-facing summary of the first specialised offering inside this trade.", range: "$—" },
    { title: "{SUB_SERVICE_2}", summary: "Second offering — kept tightly scoped so the price band is honest.", range: "$—" },
    { title: "{SUB_SERVICE_3}", summary: "Third offering. Speak in nouns, not adjectives.", range: "$—" },
    { title: "{SUB_SERVICE_4}", summary: "Fourth offering. The one most clients underestimate.", range: "$—" },
    { title: "{SUB_SERVICE_5}", summary: "Fifth offering. Premium tier. Heritage finish.", range: "$—" },
  ],
  PRICE_BANDS: [
    { scope: "{PRICE_BAND_1_SCOPE} — small, single-room", range: "$—" },
    { scope: "{PRICE_BAND_2_SCOPE} — full room or zone", range: "$—" },
    { scope: "{PRICE_BAND_3_SCOPE} — whole-home or new-build" , range: "$—" },
  ],
  FAQS: [
    {
      question: "How do you price a {SERVICE} job?",
      answer:
        "We quote against scope, never against the client. Every quote is itemised, written, and tied to a 15-year structural guarantee where the work qualifies. The bands on /pricing are the honest truth — you do not pay more because you can.",
    },
    {
      question: "Do you handle small {SERVICE_PLURAL} jobs?",
      answer:
        "Yes. The smallest job we take is the same as the largest in standard. A 30-minute repair gets the same Level-5 finish a whole-home install gets, because the standard is the standard.",
    },
    {
      question: "What is your timeline for {SERVICE} work?",
      answer:
        "Most {SERVICE} engagements begin within two to four weeks. Heritage and whole-home schedules quote a window honestly — we do not sell timelines we cannot keep.",
    },
    {
      question: "Are you insured and certified?",
      answer:
        "$5M general liability, WCB-covered crews, manufacturer-certified on every material we install. Certificates available on request before any work begins.",
    },
    {
      question: "What guarantees come with the work?",
      answer:
        "The Worksite Guarantee, the 14-Day Touch-Up Guarantee, and the 15-Year Structural Guarantee — all in writing on the invoice. If the standard is not met, we return at zero cost.",
    },
    {
      question: "How do I start?",
      answer:
        "Send three or four photos through the booking form. You receive a written estimate within 24 hours. No sales call. No pressure. The next step is yours.",
    },
  ],
  PROOF: [
    { before: "", after: "", caption: "{PROOF_1_CAPTION} — describe the transformation in one sentence." },
    { before: "", after: "", caption: "{PROOF_2_CAPTION} — pull the specific number into the line." },
  ],
  TRUST_NUMBERS: [
    { number: "15", label: "Year structural guarantee" },
    { number: "24h", label: "Written quote turnaround" },
    { number: "$5M", label: "Liability coverage" },
    { number: "Level 5", label: "Finish standard" },
  ],

  // ── Heirloom defaults ───────────────────────────────────────────────────
  // "Building Strong Foundations For Those Who Come After Us" — the north-star
  // generational promise that governs every design decision.
  BRAND_SLOGAN: "Building Strong Foundations For Those Who Come After Us",
  FOUNDATION_YEAR: 1958,
  MONOGRAM_LETTERS: ["C", "M", "B"],
};
