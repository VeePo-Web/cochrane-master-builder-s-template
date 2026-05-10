import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import InnerHero from "@/components/drywall/InnerHero";
import ImageMosaic from "@/components/drywall/ImageMosaic";
import BeforeAfterPair from "@/components/drywall/BeforeAfterPair";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

const PLACEHOLDER_ITEMS = Array.from({ length: 6 }, (_, i) => ({
  src: "/placeholder.svg",
  alt: `Completed {SERVICE} surface — image ${i + 1}`,
  caption: `{GALLERY_CAPTION_${i + 1}} — name the wall, the timeline, and the outcome.`,
}));

const Gallery = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.gallery;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />

      <SectionFrame tone="paper" size="lg">
        <RemixSlot name="GALLERY_IMAGES">
          <ImageMosaic items={PLACEHOLDER_ITEMS} layout="3-up" />
        </RemixSlot>
      </SectionFrame>

      <SectionFrame tone="bone" size="lg">
        <RemixSlot name="PROOF">
          <BeforeAfterPair pairs={MASTER_REMIX.PROOF} />
        </RemixSlot>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Send the wall you want to live with."
        body="Photo in. Written quote out. The next image in this gallery could be yours."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Gallery → Final CTA" }}
      />
    </TemplateLayout>
  );
};

export default Gallery;
