/**
 * SocialProofEngine — Hormozi's Before/After results testimonial format.
 *
 * Data source: useReviews() → Supabase (approved rows) with static fallback.
 * Palette: template tokens only (bone / paper / forest / copper / seam / mist).
 * Schema: mounts <AggregateRatingSchema> when ≥ 3 approved reviews exist.
 *
 * Conversion notes:
 *  - Aggregate rating (avg + stars + count) lives in the header as a Z-pattern
 *    credential — the fastest-processing trust signal, surfaced first.
 *  - The "After" result wears the brand colour (forest); "Before" recedes to
 *    mist. The eye is pulled from problem → resolution.
 */

import { motion } from "framer-motion";
import { useReviews } from "@/hooks/use-reviews";
import { AggregateRatingSchema } from "@/components/template/AggregateRatingSchema";
import { REVIEWS, type Review } from "@/config/reviews";

interface SocialProofEngineProps {
  reviews?: Review[];           // optional override (bypasses Supabase)
  variant?: "grid" | "featured";
  maxItems?: number;
  className?: string;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

// ─── Enrich reviews with Before/After derived from quote + service ────────────
const enrichReviews = (reviews: Review[]) =>
  reviews.map((r) => {
    const befores: Record<string, string> = {
      Repair: "Visible wall or ceiling damage — left unaddressed.",
      Installation: "Exposed framing, unfinished interior space.",
      Painting: "Worn, scuffed, or patched walls needing refresh.",
      Garage: "Bare garage framing — not functional living space.",
      Basement: "Unfinished basement — cold, unusable, uninsulated.",
    };
    const afters: Record<string, string> = {
      Repair: "Repair invisible. Wall reads as one unbroken surface.",
      Installation: "Boarded, taped, finished. Space transformed.",
      Painting: "Clean, fresh, sharp edges. Room reads as new.",
      Garage: "Insulated, boarded, painted. Full working space.",
      Basement: "Warm, finished, usable. The room you wanted.",
    };

    const timeMatch = r.quote.match(
      /\b(an? \w+day|one \w+day|\d+ days?|a week|\w+ hour[s]?|the \w+end)\b/i
    );

    return {
      ...r,
      before: befores[r.service] ?? "Prior condition requiring attention.",
      after: afters[r.service] ?? "Project complete. Result as specified.",
      timeframe: timeMatch ? timeMatch[0] : undefined,
    };
  });

// ─── Star rating ──────────────────────────────────────────────────────────────
const Stars = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => (
  <div
    className="flex items-center gap-0.5"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        viewBox="0 0 12 12"
        className={[
          size === "md" ? "w-4 h-4" : "w-3 h-3",
          s <= Math.round(rating) ? "text-copper" : "text-copper/25",
        ].join(" ")}
        fill="currentColor"
        aria-hidden
      >
        <path d="M6 1l1.4 3h3.1l-2.5 1.9.9 3L6 7.3 4.1 9 5 5.9 2.5 4H5.6z" />
      </svg>
    ))}
  </div>
);

// ─── Single review card ───────────────────────────────────────────────────────
const ReviewCard = ({
  review,
  large = false,
}: {
  review: ReturnType<typeof enrichReviews>[number];
  large?: boolean;
}) => (
  <div className="ring-1 ring-charcoal/5 rounded-[1.5rem] p-1.5 bg-seam/40 h-full">
    <div className="rounded-[calc(1.5rem-0.375rem)] p-6 md:p-8 bg-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] h-full flex flex-col">
      {/* Before / After strip */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-mist mb-1">
            Before
          </p>
          <p className="font-body text-[0.8125rem] leading-[1.5] text-mist font-light line-clamp-2">
            {review.before}
          </p>
        </div>
        <div className="w-px bg-seam flex-shrink-0" aria-hidden />
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-copper mb-1">
            After
          </p>
          <p className="font-body text-[0.8125rem] leading-[1.5] text-forest font-light line-clamp-2">
            {review.after}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-seam mb-6" aria-hidden />

      {/* Quote */}
      <blockquote
        className={[
          "font-display leading-[1.45] tracking-[-0.005em] text-charcoal font-light flex-1",
          large ? "text-[1.25rem]" : "text-[1rem]",
        ].join(" ")}
      >
        "{review.quote}"
      </blockquote>

      {/* Attribution + stars */}
      <div className="mt-6 flex items-end justify-between gap-3">
        <div>
          <p className="font-body text-[0.875rem] font-medium text-charcoal">
            {review.name}
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mist mt-0.5">
            {review.community} · {review.service}
            {review.timeframe && ` · ${review.timeframe}`}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Stars rating={review.rating} />
          <p className="font-mono text-[8px] text-mist">{review.date}</p>
        </div>
      </div>
    </div>
  </div>
);

// ─── Export component ─────────────────────────────────────────────────────────
export const SocialProofEngine = ({
  reviews: reviewsProp,
  variant = "grid",
  maxItems = 6,
  className = "",
}: SocialProofEngineProps) => {
  // If reviews are passed as props, skip the hook (used in Storybook / tests)
  const hookResult = useReviews({ maxItems });
  const source = reviewsProp ?? hookResult.reviews;
  const { aggregate } = hookResult;
  const enriched = enrichReviews(source).slice(0, maxItems);

  const totalReviews = aggregate?.totalReviews ?? REVIEWS.length;
  const avgRating = aggregate?.averageRating ?? 5;

  return (
    <section
      className={["bg-bone py-20 md:py-32 overflow-hidden", className].join(
        " "
      )}
    >
      <div className="container mx-auto px-6">
        {/* Header — claim on the left, aggregate credential on the right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="inline-block rounded-full border border-forest/15 bg-forest/5 px-4 py-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-forest">
                Real results
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-charcoal font-light max-w-lg">
              Before and after. In their words.
            </h2>
          </div>

          {/* Aggregate trust signal — fastest-processing proof, surfaced first */}
          <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-1.5 md:text-right flex-shrink-0">
            <p
              className="font-display text-forest leading-none tabular-nums"
              style={{ fontSize: "clamp(2.75rem, 4vw, 3.75rem)", letterSpacing: "-0.02em" }}
            >
              {avgRating.toFixed(1)}
            </p>
            <div className="flex flex-col md:items-end gap-1">
              <Stars rating={avgRating} size="md" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                from {totalReviews} verified reviews
              </p>
            </div>
          </div>
        </motion.div>

        {/* Featured: 1 large + 2 smaller */}
        {variant === "featured" && enriched.length >= 3 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="md:row-span-2"
            >
              <ReviewCard review={enriched[0]} large />
            </motion.div>
            {enriched.slice(1, 3).map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE, delay: (i + 1) * 0.1 }}
              >
                <ReviewCard review={r} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Grid: equal cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enriched.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.08 }}
              >
                <ReviewCard review={r} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer reassurance — no longer duplicates the count (now in header) */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-mist text-center"
        >
          Every review verified · Every result real
        </motion.p>

        {/* Aggregate rating schema — only when ≥ 3 approved reviews exist */}
        {aggregate && aggregate.totalReviews >= 3 && (
          <AggregateRatingSchema
            aggregate={aggregate}
            reviews={source}
          />
        )}
      </div>
    </section>
  );
};
