/**
 * CROSS-SELL MAP — Thank-you page bento source of truth
 *
 * Keyed by serviceSlug. Each entry defines:
 *   - question: the editorial heading above the 3-block bento
 *   - recommendations: exactly 3 links to other Master Builder network sites
 *
 * Remixes edit ONLY this file to customise the thank-you cross-sell.
 * The ThankYou page component reads from here — never hard-codes links.
 *
 * MASTER DEFAULTS — neutral placeholder cards with visible {TOKENS}. A remix
 * adds one entry per sub-service slug pointing at live sister-trade sites:
 *
 *   "{sub-service-slug}": {
 *     question: "While the crew is there, who's handling the rest?",
 *     recommendations: [
 *       { name: "Cochrane {Adjacent Trade} Masters",
 *         url: "https://{adjacent-trade-site}.ca",
 *         valueProp: "One-sentence reason this trade naturally follows." },
 *       // … exactly 3
 *     ],
 *   },
 */

export interface CrossSellLink {
  /** Trade name — Space Grotesk on the bento card. */
  name: string;
  /** Public URL of the sister site — opens in new tab. */
  url: string;
  /** One-sentence value proposition — Jost 300 on the card. */
  valueProp: string;
}

export interface CrossSellEntry {
  /** Editorial question above the bento. e.g. "Need your floors done next?" */
  question: string;
  /** Exactly 3 recommended links. */
  recommendations: [CrossSellLink, CrossSellLink, CrossSellLink];
}

// ── Master network cross-sell map ────────────────────────────────────────────
// Update URLs when each trade site goes live.

export const CROSS_SELL_MAP: Record<string, CrossSellEntry> = {
  // Default — used when serviceSlug is unknown or unset (the master template
  // always renders this entry; remixes add per-sub-service entries above it).
  default: {
    question: "Need another trade done right?",
    recommendations: [
      {
        name: "Cochrane Master Builders",
        url: "https://cochrane-master-builders.com",
        valueProp: "One network. One accountability standard. 150 trades, one family name.",
      },
      {
        name: "Cochrane {TRADE_2} Masters",
        url: "https://cochrane-master-builders.com",
        valueProp: "{TRADE_2_VALUE_PROP} — same standard, same family name.",
      },
      {
        name: "Cochrane {TRADE_3} Masters",
        url: "https://cochrane-master-builders.com",
        valueProp: "{TRADE_3_VALUE_PROP} — one booking, in writing.",
      },
    ],
  },
};

/**
 * Returns the cross-sell entry for a given serviceSlug.
 * Falls back to "default" if the slug is unknown.
 */
export function getCrossSell(serviceSlug?: string | null): CrossSellEntry {
  if (serviceSlug && serviceSlug in CROSS_SELL_MAP) {
    return CROSS_SELL_MAP[serviceSlug];
  }
  return CROSS_SELL_MAP.default;
}
