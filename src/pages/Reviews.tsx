import { useState } from "react";
import { Star } from "lucide-react";
import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import CTABand from "@/components/drywall/CTABand";
import SEOHead from "@/components/drywall/SEOHead";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import EditorialQuote from "@/components/drywall/EditorialQuote";
import { REVIEWS, type ReviewService } from "@/config/reviews";
import heroHome from "@/assets/drywall/hero-home.jpg";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";
import bgBlurTrowelArc from "@/assets/drywall/bg-blur-trowel-arc.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const FILTERS = ["All", "Repair", "Installation", "Painting", "Garage", "Basement"] as const;
type Filter = (typeof FILTERS)[number];

const Stars = ({ rating }: { rating: number }) => {
  const dim = rating < 5;
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const isLast = i === 4;
        return (
          <Star
            key={i}
            className={`h-3.5 w-3.5 text-forest ${isLast && dim ? "opacity-50" : ""}`}
            fill="currentColor"
            strokeWidth={0}
          />
        );
      })}
      <span className="ml-1 font-eyebrow !text-[0.6rem] !tracking-[0.2em] !text-mist tabular-nums">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

const Reviews = ({ onBookClick }: PageProps) => {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All"
      ? REVIEWS
      : REVIEWS.filter((r) => r.service === (filter as ReviewService));

  // Insert an editorial pull quote roughly mid-grid when there are enough reviews
  const splitAt = Math.min(6, Math.ceil(visible.length / 2));
  const firstHalf = visible.slice(0, splitAt);
  const secondHalf = visible.slice(splitAt);

  return (
    <>
      <SEOHead
        title="Reviews — Cochrane Drywall Masters"
        description="What homeowners across Cochrane, Calgary, Airdrie, and the surrounding communities have said about our drywall repair, installation, painting, garage, and basement work."
        path="/reviews"
      />
      <Navigation onBookClick={onBookClick} />
      <main>
        <InnerHero
          eyebrow="Reviews"
          title="What homeowners actually said."
          lede="Real feedback from neighbours across Cochrane, the surrounding communities, Calgary, and Airdrie. Smaller jobs, basements moved one stage forward, garages finally finished — in their own words."
          backgroundImage={heroHome}
          backgroundAlt="Freshly finished bone-painted basement corner"
        />

        <section className="section-y relative overflow-hidden">
          <AmbientBackdrop image={bgBlurBoneCorner} opacity={0.07} />
          <div className="container relative z-10 mx-auto px-6">
            <div className="no-scrollbar flex flex-wrap items-center gap-2 max-md:-mx-6 max-md:flex-nowrap max-md:overflow-x-auto max-md:px-6 max-md:snap-x max-md:snap-mandatory">
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-sm border px-4 py-2 text-sm font-medium transition-all max-md:shrink-0 max-md:snap-start ${
                      active
                        ? "border-forest bg-forest text-primary-foreground"
                        : "border-seam text-graphite hover:border-graphite"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            {firstHalf.length > 0 && (
              <div className="mt-12 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
                {firstHalf.map((r, i) => (
                  <figure key={`a-${i}`} className="flex flex-col bg-paper p-7">
                    <Stars rating={r.rating} />
                    <blockquote className="mt-5 flex-1">
                      <p className="font-display text-lg leading-relaxed text-charcoal">
                        <span aria-hidden className="mr-0.5 text-forest">“</span>
                        {r.quote}
                        <span aria-hidden className="ml-0.5 text-forest">”</span>
                      </p>
                    </blockquote>
                    <figcaption className="mt-6 border-t border-seam pt-4">
                      <p className="text-sm font-medium text-charcoal">
                        {r.name} <span className="text-mist"> — </span>
                        <span className="text-graphite">{r.community}</span>
                      </p>
                      <p className="mt-1 font-eyebrow !text-[0.65rem]">
                        {r.service} <span className="text-forest/40 mx-1.5">·</span> {r.date}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>

        {secondHalf.length > 0 && (
          <>
            <EditorialQuote
              image={bgBlurTrowelArc}
              quote="They cleaned up after themselves better than my own kids do."
              attribution="House Rule, overheard"
            />

            <section className="section-y">
              <div className="container mx-auto px-6">
                <div className="grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
                  {secondHalf.map((r, i) => (
                    <figure key={`b-${i}`} className="flex flex-col bg-paper p-7">
                      <Stars rating={r.rating} />
                      <blockquote className="mt-5 flex-1">
                        <p className="font-display text-lg leading-relaxed text-charcoal">
                          <span aria-hidden className="mr-0.5 text-forest">“</span>
                          {r.quote}
                          <span aria-hidden className="ml-0.5 text-forest">”</span>
                        </p>
                      </blockquote>
                      <figcaption className="mt-6 border-t border-seam pt-4">
                        <p className="text-sm font-medium text-charcoal">
                          {r.name} <span className="text-mist"> — </span>
                          <span className="text-graphite">{r.community}</span>
                        </p>
                        <p className="mt-1 font-eyebrow !text-[0.65rem]">
                          {r.service} <span className="text-forest/40 mx-1.5">·</span> {r.date}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <p className="mt-10 max-w-2xl text-caption text-mist">
                  New reviews are added as projects wrap. Want to talk to a recent customer in your area before you book? Just ask — we'll connect you with someone whose project looked like yours.
                </p>
              </div>
            </section>
          </>
        )}

        <CTABand
          headline="Ready to be the next review?"
          body="Send a couple of photos of what you're dealing with. We'll reply with a clear range and the next step within one business day — no sales call, no pressure."
          onPrimaryClick={onBookClick}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default Reviews;
