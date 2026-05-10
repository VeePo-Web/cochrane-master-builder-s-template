import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import SectionTitle from "@/components/drywall/SectionTitle";
import InnerHero from "@/components/drywall/InnerHero";
import EditorialQuote from "@/components/drywall/EditorialQuote";
import EditorialImage from "@/components/drywall/EditorialImage";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { lazy, Suspense } from "react";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

const MasterBuilderSeal = lazy(() => import("@/components/master/MasterBuilderSeal").then(m => ({ default: m.MasterBuilderSeal })));

interface Props { onBookClick?: BookingClickHandler }

const BrandStory = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.brandStory;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />

      {c.chapters.map((chapter, i) => (
        <SectionFrame key={i} tone={i % 2 === 0 ? "bone" : "paper"} size="lg" grain={i % 2 === 0}>
          <div className="grid gap-16 md:grid-cols-12 md:items-center">
            <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <SectionTitle eyebrow={chapter.eyebrow} headline={chapter.headline} lede={chapter.body} />
            </div>
            <div className="md:col-span-5">
              <RemixSlot name={`STORY_IMAGE_${i + 1}`} hint="Archival or craft detail">
                <EditorialImage
                  src="/placeholder.svg"
                  alt={`Brand story chapter ${i + 1}`}
                  caption={chapter.eyebrow}
                />
              </RemixSlot>
            </div>
          </div>
        </SectionFrame>
      ))}

      {/* TIMELINE — values */}
      <SectionFrame tone="bone" size="lg">
        <SectionTitle eyebrow="What we will not change" headline="Four rules. Sixty-seven years. One {SERVICE} standard." />
        <div className="mt-12 grid gap-px bg-seam md:grid-cols-2">
          {c.values.map((v) => (
            <div key={v.title} className="bg-paper p-8">
              <h3 className="font-display text-display-sm text-charcoal">{v.title}</h3>
              <p className="mt-3 text-graphite">{v.body}</p>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame tone="paper" size="md">
        <Suspense fallback={null}>
          <MasterBuilderSeal />
        </Suspense>
      </SectionFrame>

      <RemixSlot name="HERO_IMAGE" hint="Editorial workshop / hands">
        <EditorialQuote quote={c.founderQuote} attribution="— The third generation" image="/placeholder.svg" />
      </RemixSlot>

      <CTABand
        eyebrow="Begin"
        headline="See if our standard fits your home."
        body="Send three photos. We will tell you, in writing, exactly what we'd do and what it would cost."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Brand Story → Final CTA" }}
      />
    </TemplateLayout>
  );
};

export default BrandStory;
