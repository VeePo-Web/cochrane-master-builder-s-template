/**
 * ValueLadder — Brunson's visual ascension model.
 *
 * Shows the customer where they are on the service path and what's next.
 * Brunson: "Every customer should have a clear path from entry to premium."
 *
 * Palette: template tokens only (bone / paper / ink-blueprint / copper /
 * graphite / mist / seam) so the ladder reads as the same product everywhere.
 * Desktop: horizontal progression with connecting arrows.
 * Mobile: vertical timeline with left-side copper connector line.
 */

import { motion } from "framer-motion";

export interface LadderTier {
  label: string;
  priceRange: string;
  description: string;
  idealFor: string;
  href?: string;
}

interface ValueLadderProps {
  tiers?: LadderTier[];
  highlightIndex?: number;
  showStrip?: boolean;
  className?: string;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const DEFAULT_TIERS: LadderTier[] = [
  {
    label: "The Repair Visit",
    priceRange: "$150–$450",
    description: "Targeted repairs and corrections. In and out in a day.",
    idealFor: "First project. Fast fix. See the standard first-hand.",
    href: "/services",
  },
  {
    label: "The Installation Job",
    priceRange: "$900–$3,500",
    description: "New work built from scratch. The step up from repair.",
    idealFor: "Unfinished spaces, renovation sections, full rooms.",
    href: "/services",
  },
  {
    label: "The Starter Package",
    priceRange: "$1,800–$4,500",
    description: "A complete, functional space — delivered on a predictable window.",
    idealFor: "Full-space transformation from scratch.",
    href: "/services",
  },
  {
    label: "The Full Project",
    priceRange: "$3,500–$8,000+",
    description: "Full scope, start to finish. One team, one invoice, one guarantee.",
    idealFor: "Complete multi-room or whole-property renovation.",
    href: "/services",
  },
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5 text-copper/40"
    aria-hidden
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ValueLadder = ({
  tiers = DEFAULT_TIERS,
  highlightIndex = 0,
  showStrip = true,
  className = "",
}: ValueLadderProps) => {
  return (
    <section
      className={["bg-bone py-20 md:py-28 overflow-hidden", className].join(
        " "
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12"
        >
          <div className="inline-block rounded-full border border-forest/15 bg-forest/5 px-4 py-1.5 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-forest">
              The Path
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-charcoal font-light max-w-lg">
            Start where you need to. Move up when you're ready.
          </h2>
        </motion.div>

        {/* Desktop: horizontal progression */}
        <div className="hidden md:flex items-stretch gap-0">
          {tiers.map((tier, i) => {
            const isHighlighted = i === highlightIndex;
            return (
              <div key={tier.label} className="flex items-center flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
                  className="flex-1"
                >
                  {/* Tier card */}
                  {isHighlighted ? (
                    /* Highlighted tier — dark ink-blueprint */
                    <div className="ring-1 ring-ink-blueprint/20 rounded-[1.5rem] p-1.5 bg-ink-blueprint/8 h-full">
                      <div className="rounded-[calc(1.5rem-0.375rem)] p-7 bg-ink-blueprint shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] h-full flex flex-col">
                        <span className="font-display text-[3.5rem] leading-none italic text-copper/40 select-none" aria-hidden>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-[1.25rem] leading-[1.2] tracking-[-0.01em] text-bone font-light mt-[-0.5rem]">
                          {tier.label}
                        </h3>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-copper">
                          {tier.priceRange}
                        </p>
                        <p className="mt-4 font-body text-[0.875rem] leading-[1.65] text-bone/60 font-light flex-1">
                          {tier.description}
                        </p>
                        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35">
                          {tier.idealFor}
                        </p>
                        {tier.href && (
                          <a
                            href={tier.href}
                            className="mt-5 inline-flex items-center gap-1 font-mono text-[9px]
                              uppercase tracking-[0.2em] text-copper/70 hover:text-copper
                              transition-colors"
                          >
                            See details ↗
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Non-highlighted tier — light bezel */
                    <div className="ring-1 ring-charcoal/5 rounded-[1.5rem] p-1.5 bg-seam/40 h-full">
                      <div className="rounded-[calc(1.5rem-0.375rem)] p-7 bg-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] h-full flex flex-col">
                        <span className="font-display text-[3.5rem] leading-none italic text-copper/20 select-none" aria-hidden>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-[1.25rem] leading-[1.2] tracking-[-0.01em] text-charcoal font-light mt-[-0.5rem]">
                          {tier.label}
                        </h3>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-copper">
                          {tier.priceRange}
                        </p>
                        <p className="mt-4 font-body text-[0.875rem] leading-[1.65] text-graphite font-light flex-1">
                          {tier.description}
                        </p>
                        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-mist">
                          {tier.idealFor}
                        </p>
                        {tier.href && (
                          <a
                            href={tier.href}
                            className="mt-5 inline-flex items-center gap-1 font-mono text-[9px]
                              uppercase tracking-[0.2em] text-copper/60 hover:text-copper
                              transition-colors"
                          >
                            See details ↗
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Arrow connector between cards */}
                {i < tiers.length - 1 && (
                  <div className="flex-shrink-0 px-2" aria-hidden>
                    <ArrowIcon />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-0">
          {tiers.map((tier, i) => {
            const isHighlighted = i === highlightIndex;
            const isLast = i === tiers.length - 1;

            return (
              <div key={tier.label} className="flex gap-4">
                {/* Timeline connector */}
                <div className="flex flex-col items-center flex-shrink-0 pt-6">
                  <div className={[
                    "w-2 h-2 rounded-full flex-shrink-0",
                    isHighlighted ? "bg-copper" : "bg-copper/30",
                  ].join(" ")} />
                  {!isLast && (
                    <div className="w-px flex-1 bg-copper/20 mt-1 mb-0 min-h-[2rem]" />
                  )}
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                  className="flex-1 pb-6"
                >
                  <div className={[
                    "ring-1 rounded-[1.25rem] p-1.5",
                    isHighlighted ? "ring-ink-blueprint/20 bg-ink-blueprint/8" : "ring-charcoal/5 bg-seam/40",
                  ].join(" ")}>
                    <div className={[
                      "rounded-[calc(1.25rem-0.375rem)] p-5",
                      isHighlighted
                        ? "bg-ink-blueprint shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        : "bg-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]",
                    ].join(" ")}>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className={[
                          "font-display text-[1.125rem] leading-[1.2] tracking-[-0.01em] font-light",
                          isHighlighted ? "text-bone" : "text-charcoal",
                        ].join(" ")}>
                          {tier.label}
                        </h3>
                        <span className={[
                          "font-mono text-[10px] uppercase tracking-[0.2em] flex-shrink-0",
                          isHighlighted ? "text-copper" : "text-copper",
                        ].join(" ")}>
                          {tier.priceRange}
                        </span>
                      </div>
                      <p className={[
                        "mt-3 font-body text-[0.875rem] leading-[1.65] font-light",
                        isHighlighted ? "text-bone/60" : "text-graphite",
                      ].join(" ")}>
                        {tier.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Bottom strip */}
        {showStrip && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-mist text-center"
          >
            Most clients start with 01. Most come back for 02 and 03.
          </motion.p>
        )}
      </div>
    </section>
  );
};
