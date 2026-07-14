import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import InnerHero from "@/components/shared/InnerHero";
import ImageMosaic from "@/components/shared/ImageMosaic";
import BeforeAfterPair from "@/components/shared/BeforeAfterPair";
import CTABand from "@/components/shared/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/booking";

interface Props { onBookClick?: BookingClickHandler }

const Gallery = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.gallery;
  // Use manifest-generated images from MASTER_REMIX; fall back to empty mosaic
  // (no placeholder.svg — run scripts/regenerate-images.ts to populate).
  const galleryItems = MASTER_REMIX.GALLERY_IMAGES.length > 0
    ? MASTER_REMIX.GALLERY_IMAGES.map(img => ({
        src: img.src,
        alt: img.alt,
        caption: img.caption,
        aspect: img.aspect,
      }))
    : [];

  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />

      <SectionFrame tone="paper" size="lg">
        <RemixSlot name="GALLERY_IMAGES">
          {galleryItems.length > 0 ? (
            <>
              {/* Mobile: full stacked proof feed — every image, not just the desktop 3-up.
                  More proof converts; desktop is unchanged (mosaic below is hidden md:block). */}
              <div className="grid grid-cols-1 gap-px bg-seam md:hidden">
                {galleryItems.map((img, i) => (
                  <figure key={i} className="relative bg-paper">
                    <div className={`relative w-full overflow-hidden ${img.aspect ?? "aspect-[4/3]"}`}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="border-t border-seam px-4 py-3 text-caption text-mist">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
              {/* Desktop: untouched editorial 3-up mosaic */}
              <div className="hidden md:block">
                <ImageMosaic items={galleryItems} layout="3-up" />
              </div>
            </>
          ) : (
            <div className="flex aspect-[3/2] items-center justify-center border border-copper/20 bg-paper text-caption text-mist">
              Gallery images not yet generated — run scripts/regenerate-images.ts
            </div>
          )}
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
