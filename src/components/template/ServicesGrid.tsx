import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { SubService } from "@/config/template/remix-variables";

interface ServicesGridProps {
  services: SubService[];
  /** Build the per-service link, e.g. (s) => `/template/services/${slug}` */
  hrefFor?: (s: SubService) => string;
}

/**
 * Five-card services grid. Borderless blocks divided by hairline seams
 * — never rounded cards. Per File 13 styling rules.
 */
const ServicesGrid = ({ services, hrefFor }: ServicesGridProps) => {
  return (
    <div className="grid gap-px bg-seam md:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => {
        const href = hrefFor ? hrefFor(s) : "/services";
        return (
          <Link
            key={i}
            to={href}
            className={`group flex flex-col bg-paper p-8 transition-colors hover:bg-bone${i === 4 ? " lg:col-span-2" : ""}`}
          >
            <span
              className="font-display text-forest/40"
              style={{ fontSize: "clamp(2.5rem,4vw,4rem)", lineHeight: 1 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-display-sm text-charcoal">{s.title}</h3>
            {s.range && <p className="font-eyebrow mt-4 text-mist">{s.range}</p>}
            <p className="mt-4 flex-1 text-body leading-relaxed text-graphite">{s.summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium tracking-[0.08em] text-forest">
              See details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default ServicesGrid;
