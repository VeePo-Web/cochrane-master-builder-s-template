/**
 * HeritageRelay — the About-page spine (identical across every remix site).
 *
 * Reframes the brand from a single family's story to the town's long line of
 * builders: foundations laid by people who built for people they would never
 * meet. A dated, image-led relay (01–04) — real archival/heritage photography
 * doing the emotional work (BASIC/DEPT), the dated text doing the intellectual
 * work — culminating in the "turn" that hands the line to the reader and into
 * the CTA below.
 *
 * Copy + image data live in TEMPLATE_COPY.about.story so the component is
 * generic. Real photographs are licensed Creative Commons and credited in the
 * footnote (attribution is required and rendered). Ghost numerals ascend
 * (Benoist); copper-tick year labels echo the trust-bar hairline. Motion is
 * opacity/transform only and respects prefers-reduced-motion.
 */
import { motion, useReducedMotion } from "framer-motion";
import EditorialImage from "@/components/drywall/EditorialImage";
import { TEMPLATE_COPY } from "@/config/template/template-copy";

const HeritageRelay = () => {
  const story = TEMPLATE_COPY.about.story;
  const reduce = useReducedMotion();

  const rise = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  };

  return (
    <div>
      {/* Intro */}
      <motion.div {...rise} className="max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden className="h-px w-6 flex-shrink-0 bg-copper/40" />
          <p className="font-eyebrow">{story.eyebrow}</p>
        </div>
        <h2 className="text-display-lg text-charcoal">{story.headline}</h2>
        <p className="mt-6 text-body-lg text-graphite">{story.lede}</p>
      </motion.div>

      {/* The relay — one beat per era of Cochrane's builders */}
      <ol className="mt-20 space-y-16 md:space-y-28">
        {story.beats.map((beat, i) => {
          const hasImage = "image" in beat;
          const flip = i % 2 === 1;
          return (
            <li
              key={beat.year}
              className="relative grid items-center gap-8 md:grid-cols-12 md:gap-12"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-12 left-0 z-0 select-none font-display leading-none"
                style={{ fontSize: "clamp(6rem, 13vw, 11rem)", color: "hsl(var(--copper) / 0.05)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <motion.div
                {...rise}
                className={`relative z-10 ${hasImage ? "md:col-span-6" : "md:col-span-9"} ${flip && hasImage ? "md:order-2" : ""}`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 flex-shrink-0 bg-copper" />
                  <p className="font-eyebrow">{beat.year} — {beat.label}</p>
                </div>
                <p className="max-w-xl text-body-lg text-charcoal">{beat.body}</p>
              </motion.div>

              {"image" in beat && (
                <div className={`relative z-10 md:col-span-6 ${flip ? "md:order-1" : ""}`}>
                  <EditorialImage src={beat.image} alt={beat.alt} aspect={beat.aspect} />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {/* The turn — the line is handed to the reader, into the CTA below */}
      <motion.div {...rise} className="mt-20 border-t border-copper/30 pt-10">
        <p className="max-w-3xl font-display text-display-md text-charcoal">{story.turn}</p>
      </motion.div>

      {/* Image attribution — required for the Creative Commons licences */}
      <p className="mt-12 max-w-3xl text-caption text-mist">
        Historical images, used under Creative Commons:{" "}
        {story.beats.map((beat) =>
          "credit" in beat ? (
            <span key={beat.year}>
              <a
                href={beat.credit.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-mist/40 underline-offset-2 transition-colors hover:text-graphite"
              >
                {beat.label}
              </a>
              {" — "}
              {beat.credit.name}
              {" ("}
              <a
                href={beat.credit.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-mist/40 underline-offset-2 transition-colors hover:text-graphite"
              >
                {beat.credit.license}
              </a>
              {"). "}
            </span>
          ) : null,
        )}
      </p>
    </div>
  );
};

export default HeritageRelay;
