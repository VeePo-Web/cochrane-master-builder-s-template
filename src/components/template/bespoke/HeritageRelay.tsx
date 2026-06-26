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
import { MASTER_REMIX } from "@/config/template/remix-variables";

const HeritageRelay = () => {
  const story = TEMPLATE_COPY.about.story;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // the math the founder quote names: years on the line, generations, one standard
  const years = new Date().getFullYear() - MASTER_REMIX.FOUNDATION_YEAR;
  const ledger = [
    { n: `${years}`, l: "Years on the line" },
    { n: "6", l: "Generations before us" },
    { n: "1", l: "Standard, unbroken" },
  ];

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
            <span aria-hidden className="absolute left-0 top-2 flex items-center justify-center md:top-3">
              <span className="block h-[17px] w-[17px] rounded-full border border-copper/60 bg-paper md:h-[21px] md:w-[21px]" />
              <span className="absolute h-1.5 w-1.5 rounded-full bg-copper md:h-2 md:w-2" />
            </span>
            <div className="relative max-w-2xl">
              {/* the year is the hero — each generation a dated chapter */}
              <p
                className="font-display leading-[0.95] text-charcoal"
                style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)" }}
              >
                {beat.year}
              </p>
              <p className="eyebrow-copper mt-2.5">{beat.label}</p>
              <p className="mt-4 text-body-lg text-charcoal">{beat.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* The ledger — the math the line adds up to */}
      <motion.dl
        {...rise(story.beats.length + 1)}
        className="mt-4 grid grid-cols-3 gap-px border-y border-seam bg-seam"
      >
        {ledger.map((stat) => (
          <div key={stat.l} className="bg-paper px-4 py-7 text-center sm:py-9">
            <dd
              className="font-display leading-none text-charcoal"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}
            >
              {stat.n}
            </dd>
            <dt className="eyebrow-copper mt-3">{stat.l}</dt>
          </div>
        ))}
      </motion.dl>

      {/* The turn — the dark peak; the line is handed to the reader */}
      <motion.div
        {...rise(story.beats.length + 2)}
        className="relative mt-12 overflow-hidden bg-forest px-7 py-12 sm:px-12 md:py-16"
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-copper/70" />
        <p className="max-w-3xl font-display text-display-md text-bone">{story.turn}</p>
      </motion.div>
    </div>
  );
};

export default HeritageRelay;
