import { Link } from "react-router-dom";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { SloganHeartbeat, BlueprintGrain, CornerstoneStamp } from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

// 404 page: slogan is the only body line beneath the title.
// "lost-blueprint" tone — still brand-rooted, never humorous.
const TemplateNotFound = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.notFound;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <SectionFrame tone="bone" size="xl" grain>
        <div className="relative mx-auto max-w-2xl text-center">
          <BlueprintGrain opacity={0.025} className="absolute inset-0 pointer-events-none" />

          <p className="eyebrow-copper mb-6">{c.eyebrow}</p>
          <h1 className="text-display-xl text-charcoal" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 300 }}>
            {c.title}
          </h1>

          {/* Slogan — the only body line. Sacred. */}
          <div className="mt-8 mb-4">
            <SloganHeartbeat variant="whisper" className="block" />
          </div>

          <p className="text-body text-graphite">{c.lede}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-none bg-forest px-6 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-primary-foreground shadow-[0_1px_0_hsl(var(--forest-deep))] transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-[0_12px_30px_-10px_hsl(var(--forest)/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bone active:translate-y-0 active:scale-[0.985]"
            >
              Back to home
            </Link>
            <Link
              to="/services"
              className="rounded-none border border-[hsl(var(--copper)/0.35)] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-charcoal transition-[transform,color,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-forest/30 hover:bg-forest/[0.04] hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bone active:translate-y-0 active:scale-[0.985]"
            >
              See services
            </Link>
          </div>

          {/* Cornerstone stamp — bottom right, pressed into the page */}
          <div className="absolute -bottom-8 -right-4 opacity-40">
            <CornerstoneStamp size={64} />
          </div>
        </div>
      </SectionFrame>
    </TemplateLayout>
  );
};

export default TemplateNotFound;
