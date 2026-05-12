import { lazy, Suspense } from "react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import InnerHero from "@/components/drywall/InnerHero";
import EditorialQuote from "@/components/drywall/EditorialQuote";
import TrustNumbers from "@/components/template/TrustNumbers";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

const SocialProofEngine = lazy(() => import("@/components/master/SocialProofEngine").then(m => ({ default: m.SocialProofEngine })));

interface Props { onBookClick?: BookingClickHandler }

const Reviews = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.reviews;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />

      <SectionFrame tone="paper" size="lg">
        <Suspense fallback={null}>
          <SocialProofEngine variant="featured" maxItems={5} />
        </Suspense>
      </SectionFrame>

      <RemixSlot name="HERO_IMAGE">
        <EditorialQuote
          quote="The crack other contractors kept calling 'just settling' is gone. The wall reads as one unbroken surface."
          attribution="Jordan M. — Sunset Ridge"
          image={MASTER_REMIX.REVIEWS_HERO}
        />
      </RemixSlot>

      <SectionFrame tone="bone" size="md">
        <RemixSlot name="TRUST_NUMBERS">
          <TrustNumbers items={MASTER_REMIX.TRUST_NUMBERS} variant="grid" />
        </RemixSlot>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Add your wall to the proof."
        body="Send three photos. Receive a written quote. Add the after-photo to this page in eight weeks."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Reviews → Final CTA" }}
      />
    </TemplateLayout>
  );
};

export default Reviews;
