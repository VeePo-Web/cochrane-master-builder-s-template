/**
 * HeritageRelay — the About-page spine.
 *
 * Reframes the brand from a single family's three-generation story to the
 * town's long line of builders: foundations laid by people who built for
 * people they would never meet. A dated relay (01–04) culminating in the
 * "turn" that hands the line to the reader.
 *
 * The copy lives in TEMPLATE_COPY.about.story so every remix swaps its own
 * town's heritage; this component is generic. Ghost numerals ascend
 * (Benoist). Copper-tick year labels echo the trust-bar hairline. Motion is
 * opacity/transform only and respects prefers-reduced-motion.
 */
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TEMPLATE_COPY } from "@/config/template/template-copy";

const HeritageRelay = () => {
  const story = TEMPLATE_COPY.about.story;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const rise = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : undefined,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  });

  return (
    <div ref={ref}>
      {/* Intro */}
      <motion.div {...rise(0)} className="max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden className="h-px w-6 flex-shrink-0 bg-copper/40" />
          <p className="font-eyebrow">{story.eyebrow}</p>
        </div>
        <h2 className="text-display-lg text-charcoal">{story.headline}</h2>
        <p className="mt-6 text-body-lg text-graphite">{story.lede}</p>
      </motion.div>

      {/* The relay — generations strung on one continuous foundation line */}
      <ol className="relative mt-16">
        {/* the line itself: a copper plumb-line running through every generation,
            fading into the future at the foot */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-2 bottom-10 left-[8px] w-px bg-gradient-to-b from-copper/55 via-copper/30 to-transparent md:left-[10px]"
        />
        {story.beats.map((beat, i) => (
          <motion.li
            key={beat.year}
            {...rise(i + 1)}
            className="relative overflow-hidden pb-12 pl-10 last:pb-0 md:pl-16"
          >
            {/* node — this generation's mark on the line */}
            <span aria-hidden className="absolute left-0 top-1 flex items-center justify-center">
              <span className="block h-[17px] w-[17px] rounded-full border border-copper/60 bg-paper md:h-[21px] md:w-[21px]" />
              <span className="absolute h-1.5 w-1.5 rounded-full bg-copper md:h-2 md:w-2" />
            </span>
            {/* ghost numeral — ascending chapter anchor */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 right-0 select-none font-display leading-none"
              style={{ fontSize: "clamp(5rem, 13vw, 12rem)", color: "hsl(var(--copper) / 0.06)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative max-w-2xl">
              <p className="eyebrow-copper">{beat.year} — {beat.label}</p>
              <p className="mt-3 text-body-lg text-charcoal">{beat.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* The turn — the dark peak; the line is handed to the reader */}
      <motion.div
        {...rise(story.beats.length + 1)}
        className="relative mt-12 overflow-hidden bg-forest px-7 py-12 sm:px-12 md:py-16"
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-copper/70" />
        <p className="max-w-3xl font-display text-display-md text-bone">{story.turn}</p>
      </motion.div>
    </div>
  );
};

export default HeritageRelay;
