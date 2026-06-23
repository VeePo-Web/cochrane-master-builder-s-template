import { lazy, Suspense } from "react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import SectionTitle from "@/components/drywall/SectionTitle";
import InnerHero from "@/components/drywall/InnerHero";
import ServicesGrid from "@/components/template/ServicesGrid";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

const CapacitySignal = lazy(() => import("@/components/master/CapacitySignal").then(m => ({ default: m.CapacitySignal })));

interface Props { onBookClick?: BookingClickHandler }

const Services = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.services;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />

      <SectionFrame tone="paper" size="lg">
        <RemixSlot name="SUB_SERVICES">
          <ServicesGrid services={MASTER_REMIX.SUB_SERVICES} hrefFor={() => "/services/detail"} />
        </RemixSlot>
      </SectionFrame>

      <SectionFrame tone="bone" size="md">
        <Suspense fallback={null}>
          <CapacitySignal variant="banner" />
        </Suspense>
      </SectionFrame>

      <SectionFrame tone="charcoal" size="lg">
        <div className="max-w-3xl">
          <span aria-hidden className="mb-4 block h-px w-6 bg-copper/50" />
          <p className="font-eyebrow text-bone/70">Our guarantee</p>
          <h2 className="mt-4 text-display-lg text-bone">{c.crossTradeGuarantee.headline}</h2>
          <p className="mt-5 text-body-lg text-bone/85">{c.crossTradeGuarantee.body}</p>
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Pick a scope"
        headline="Tell us the scope. We'll match you to the band."
        body="No commitment. The quote is yours to keep, with or without us."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Services hub → Final CTA" }}
        reassurance="Free quote · No obligation · 24-hour reply"
      />
    </TemplateLayout>
  );
};

export default Services;
