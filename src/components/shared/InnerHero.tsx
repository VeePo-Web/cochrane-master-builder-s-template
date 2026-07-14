import HeroImage from "./HeroImage";
import ScrollReveal from "./ScrollReveal";
import { SloganHeartbeat, HeroEtchedUnderline } from "@/components/template/bespoke";

interface InnerHeroProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
}

/**
 * Compact page-top hero for inner pages. Shares the home hero's craft
 * language — copper-hairline eyebrow, cinematic masked headline reveal,
 * hand-etched underline, atmospheric depth — but at an inner-page scale.
 * Tokens only; reduced-motion safe; copy is never altered.
 */
const InnerHero = ({ eyebrow, title, lede, backgroundImage, backgroundAlt = "" }: InnerHeroProps) => {
  return (
    <section className="paper-grain relative isolate overflow-hidden border-b border-seam/60 bg-bone">
      {/* Atmospheric depth — faint warm aura so the imageless hero reads layered, not flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(50% 60% at 12% 48%, hsl(var(--forest) / 0.045), transparent 72%), radial-gradient(40% 48% at 92% 22%, hsl(var(--copper) / 0.04), transparent 74%)",
        }}
      />
      {backgroundImage && (
        <HeroImage src={backgroundImage} alt={backgroundAlt} gradientFrom="left" opacity={28} />
      )}
      <div className="container relative z-10 mx-auto px-6 py-20 md:py-28 max-md:py-16">
        <div className="max-w-4xl">
          {eyebrow && (
            <ScrollReveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="hairline-copper w-6 flex-shrink-0 animate-line-grow" />
                <p className="eyebrow-copper">{eyebrow}</p>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.06} className="hero-rise">
            <h1 className="text-display-xl text-balance text-charcoal">{title}</h1>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            {/* Hand-etched copper underline — a measured stroke, drawn on mount */}
            <HeroEtchedUnderline className="mt-4 mb-4 block w-32 md:w-44" />
            {/* Generational slogan — heartbeat beneath every inner-page title */}
            <SloganHeartbeat variant="whisper" className="block" />
          </ScrollReveal>

          {lede && (
            <ScrollReveal delay={0.2}>
              <p className="mt-5 max-w-2xl text-pretty text-body-lg text-graphite max-md:mt-4 max-md:text-base max-md:leading-relaxed">
                {lede}
              </p>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default InnerHero;
