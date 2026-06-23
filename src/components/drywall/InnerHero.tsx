import HeroImage from "./HeroImage";
import { SloganHeartbeat } from "@/components/template/bespoke";

interface InnerHeroProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
}

/** Compact page-top hero for inner pages. */
const InnerHero = ({ eyebrow, title, lede, backgroundImage, backgroundAlt = "" }: InnerHeroProps) => {
  return (
    <section className="paper-grain relative bg-bone overflow-hidden">
      {backgroundImage && (
        <HeroImage src={backgroundImage} alt={backgroundAlt} gradientFrom="left" opacity={28} />
      )}
      {/* Atmospheric ghost word — depth at Z exit point */}
      {eyebrow && (
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-0 right-0 font-display text-charcoal leading-none uppercase"
          style={{ fontSize: "clamp(6rem,16vw,14rem)", opacity: 0.04, lineHeight: 1 }}
        >
          {eyebrow}
        </span>
      )}
      <div className="container relative z-10 mx-auto px-6 py-24 md:py-40 max-md:py-16">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="mb-6 flex items-center gap-3">
              <span aria-hidden className="h-px w-6 flex-shrink-0 bg-copper/40" />
              <p className="font-eyebrow">{eyebrow}</p>
            </div>
          )}
          <h1 className="text-display-xl text-charcoal">{title}</h1>
          {/* Generational slogan — heartbeat beneath every inner-page title */}
          <SloganHeartbeat variant="whisper" className="mt-5 block" />
          {lede && (
            <p className="mt-8 max-w-2xl text-body-lg text-graphite max-md:mt-6 max-md:text-base max-md:leading-relaxed">
              {lede}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InnerHero;
