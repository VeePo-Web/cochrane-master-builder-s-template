import { useState } from "react";
import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import CTABand from "@/components/drywall/CTABand";
import SEOHead from "@/components/drywall/SEOHead";
import ParallaxBackdrop from "@/components/drywall/ParallaxBackdrop";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import heroInstallation from "@/assets/drywall/hero-installation.jpg";
import heroGarage from "@/assets/drywall/hero-garage.jpg";
import heroBasement from "@/assets/drywall/hero-basement.jpg";
import ba1After from "@/assets/drywall/ba-1-after.jpg";
import ba2After from "@/assets/drywall/ba-2-after.jpg";
import ba3After from "@/assets/drywall/ba-3-after.jpg";
import ba4After from "@/assets/drywall/ba-4-after.jpg";
import editorialMudBucket from "@/assets/drywall/editorial-mud-bucket.jpg";
import editorialPaintSwatch from "@/assets/drywall/editorial-paint-swatch.jpg";
import editorialFinishedTrim from "@/assets/drywall/editorial-finished-trim.jpg";
import editorialVaporBarrier from "@/assets/drywall/editorial-vapor-barrier.jpg";
import editorialCornerBead from "@/assets/drywall/editorial-corner-bead.jpg";
import editorialSandingDust from "@/assets/drywall/editorial-sanding-dust.jpg";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const FILTERS = ["All", "Repair", "Patch + Paint", "Garage", "Basement"] as const;
type Filter = (typeof FILTERS)[number];
type Category = Exclude<Filter, "All">;

interface Item {
  src: string;
  alt: string;
  caption: string;
  category: Category;
  /** Tailwind aspect class — used to vary rhythm in the masonry. */
  aspect: string;
}

const ITEMS: Item[] = [
  {
    src: ba1After,
    alt: "A patched and painted living-room wall, the previous knob hole now invisible",
    caption: "Door knob hole — patched, primed, painted in a single afternoon visit.",
    category: "Repair",
    aspect: "aspect-[4/5]",
  },
  {
    src: ba2After,
    alt: "A finished bone-painted wall in even afternoon light",
    caption: "Long hairline crack chased across the wall, taped, mudded, made invisible.",
    category: "Repair",
    aspect: "aspect-[4/3]",
  },
  {
    src: editorialMudBucket,
    alt: "Mud pan and taping knife resting between coats on a quiet job site",
    caption: "Between coats — the rhythm of a clean repair.",
    category: "Repair",
    aspect: "aspect-square",
  },
  {
    src: ba3After,
    alt: "A finished ceiling section after a water-damage repair, evenly painted",
    caption: "Living-room ceiling repair, finished so the room reads as new.",
    category: "Patch + Paint",
    aspect: "aspect-[4/3]",
  },
  {
    src: ba4After,
    alt: "Bone-painted ceiling area where a stain used to live, now invisible under fresh paint",
    caption: "Water-stain ceiling — primed and repainted so the eye stops finding it.",
    category: "Patch + Paint",
    aspect: "aspect-[4/5]",
  },
  {
    src: editorialPaintSwatch,
    alt: "Hand-painted bone and forest paint swatches dry-tested on raw drywall",
    caption: "Bone & forest, dry-tested on raw board before the room commits.",
    category: "Patch + Paint",
    aspect: "aspect-square",
  },
  {
    src: heroGarage,
    alt: "A clean residential double garage interior, freshly drywalled and bright",
    caption: "Double garage — rough framing to insulated, boarded, and finished in one window.",
    category: "Garage",
    aspect: "aspect-[4/3]",
  },
  {
    src: editorialFinishedTrim,
    alt: "Baseboard meeting freshly painted bone wall in a clean, sharp line",
    caption: "A single-tone, finished working space — every trim line sharp.",
    category: "Garage",
    aspect: "aspect-[4/5]",
  },
  {
    src: editorialCornerBead,
    alt: "A crisp 90-degree corner bead set true on a freshly hung wall",
    caption: "A corner set true — every shadow falls clean.",
    category: "Garage",
    aspect: "aspect-square",
  },
  {
    src: heroBasement,
    alt: "A residential basement mid-transformation, framing on one side and finished wall on the other",
    caption: "Walls-only starter — warmer rooms, finished surfaces, no ceiling commitment yet.",
    category: "Basement",
    aspect: "aspect-[4/3]",
  },
  {
    src: editorialVaporBarrier,
    alt: "Translucent vapor barrier catching low light against insulation batts",
    caption: "Vapour barrier set true — the unseen layer that decides everything above it.",
    category: "Basement",
    aspect: "aspect-[4/5]",
  },
  {
    src: editorialSandingDust,
    alt: "Suspended drywall dust catching low directional light after a sanding pass",
    caption: "Ceiling sanded smooth — soundproofed and boarded above.",
    category: "Basement",
    aspect: "aspect-square",
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface TileProps {
  item: Item;
  index: number;
}

const GalleryTile = ({ item, index }: TileProps) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  return (
    <motion.figure
      ref={ref}
      className="group relative bg-paper"
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 12 }}
      transition={{
        duration: reduced ? 0.2 : 0.7,
        delay: reduced ? 0 : (index % 6) * 0.06,
        ease: EASE,
      }}
    >
      <div className={`relative overflow-hidden ${item.aspect}`}>
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </div>
      <figcaption className="border-t border-seam px-5 py-4">
        <p className="font-eyebrow text-forest">{item.category}</p>
        <p className="mt-1 text-graphite">{item.caption}</p>
      </figcaption>
    </motion.figure>
  );
};

const Gallery = ({ onBookClick }: PageProps) => {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? ITEMS : ITEMS.filter((i) => i.category === filter);

  return (
    <>
      <SEOHead
        title="Gallery — Cochrane Drywall & Insulation Recent Projects"
        description="A look at recent drywall repairs, patch + paint work, garage upgrades, and basement starter packages in Cochrane, AB."
        path="/gallery"
      />
      <Navigation onBookClick={onBookClick} />
      <main>
        <InnerHero
          eyebrow="Gallery"
          title="Visible proof. Recent projects."
          lede="Recent work across Cochrane, Calgary, and Airdrie. Repairs that disappear, garages that finally feel finished, and basements moved one stage forward at a time."
          backgroundImage={heroInstallation}
          backgroundAlt="Newly hung drywall sheet with taped joints catching raking light"
        />

        {/* Cinematic arrival between hero and grid */}
        <ParallaxBackdrop image={bgBlurBoneCorner} alt="" height="40vh" />

        <section className="section-y">
          <div className="container mx-auto px-6">
            {/* Filter row */}
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

            {/* Editorial mosaic — re-mounts on filter change so reveal cascades replay */}
            <div
              key={filter}
              className="mt-12 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((item, i) => (
                <GalleryTile key={`${filter}-${i}`} item={item} index={i} />
              ))}
            </div>

            <p className="mt-10 max-w-2xl text-caption text-mist">
              New project photography is added as we wrap each visit. Have a situation that looks like yours and want to see how we handled it? Ask — we'll send the relevant before-and-after photos directly.
            </p>
          </div>
        </section>

        <CTABand
          headline="Want to see work like yours?"
          body="Send a couple of photos of what you're dealing with. We'll reply with relevant before-and-after work and a clear next step within one business day."
          onPrimaryClick={onBookClick}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default Gallery;
