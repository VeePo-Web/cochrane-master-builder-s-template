interface PricingTier {
  scope: string;
  range: string;
}

interface PricingTableProps {
  title?: string;
  tiers: readonly PricingTier[] | PricingTier[];
  note?: string;
}

/**
 * The honest price-band table. Each band is a rung on the value ladder
 * (entry → whole-home), so the rows carry ascending index numbers as
 * spatial anchors (Benoist) and the price — the thing that matters — is
 * the brand-coloured hero of every row.
 *
 * Scope strings split on an em-dash into a primary label + muted
 * qualifier, e.g. "Full room — single zone" → "Full room" / "single zone".
 */
const PricingTable = ({ title, tiers, note }: PricingTableProps) => {
  return (
    <div className="border border-seam bg-paper">
      {title && (
        <div className="border-b border-seam px-6 py-5 md:py-6">
          <h3 className="font-display text-display-sm text-charcoal">{title}</h3>
        </div>
      )}
      <ul className="divide-y divide-seam">
        {tiers.map((tier, i) => {
          const dash = tier.scope.indexOf("—");
          const primary = dash >= 0 ? tier.scope.slice(0, dash).trim() : tier.scope.trim();
          const sub = dash >= 0 ? tier.scope.slice(dash + 1).trim() : "";
          return (
            <li key={i} className="flex items-baseline gap-5 px-6 py-6">
              <span
                aria-hidden="true"
                className="font-display tabular-nums leading-none text-copper/50"
                style={{ fontSize: "0.875rem", letterSpacing: "0.1em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <span className="text-body text-charcoal">{primary}</span>
                  {sub && (
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                      {sub}
                    </span>
                  )}
                </div>
                <span
                  className="font-display tabular-nums text-forest"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {tier.range}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {note && (
        <div className="border-t border-seam bg-bone px-6 py-4">
          <p className="text-caption text-mist">{note}</p>
        </div>
      )}
    </div>
  );
};

export default PricingTable;
