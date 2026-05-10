import { Link } from "react-router-dom";
import PrefetchLink from "./PrefetchLink";
import { MasterLogo } from "@/master";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props {
  onBookClick?: BookingClickHandler;
}

const TemplateFooter = ({ onBookClick }: Props) => {
  const services = TEMPLATE_COPY.nav.filter((n) =>
    ["/services", "/pricing", "/why-we-love"].includes(n.path),
  );
  const company = TEMPLATE_COPY.nav.filter((n) =>
    ["/brand-story", "/about", "/gallery", "/reviews", "/contact"].includes(n.path),
  );

  return (
    <footer className="border-t border-seam bg-paper">
      {/* Tier 1 — brand + CTA */}
      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" aria-label={`${MASTER_REMIX.BRAND_NAME} — home`} className="inline-flex">
              <MasterLogo slot="footer" />
            </PrefetchLink>
            <p className="mt-6 max-w-md text-graphite">
              {TEMPLATE_COPY.brand.promise}
            </p>
            <button
              type="button"
              onClick={() => onBookClick?.({ source: "Footer → Send photos" })}
              className="cta-forest mt-8 inline-flex rounded-sm bg-forest px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-deep"
            >
              {TEMPLATE_COPY.cta.primary}
            </button>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-eyebrow mb-4 text-mist">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.path}>
                  <PrefetchLink to={s.path} className="text-graphite transition-colors hover:text-charcoal">
                    {s.label}
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-eyebrow mb-4 text-mist">Company</h4>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.path}>
                  <PrefetchLink to={c.path} className="text-graphite transition-colors hover:text-charcoal">
                    {c.label}
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-eyebrow mb-4 text-mist">Cochrane &amp; area</h4>
            <ul className="space-y-2.5 text-graphite">
              <li>{MASTER_REMIX.COMMUNITIES.slice(0, 4).join(" · ")}</li>
              <li>Mon–Sat · 7am–6pm</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tier 2 — hairline divider */}
      <div className="border-t border-seam" />

      {/* Tier 3 — sign-off */}
      <div className="container mx-auto flex flex-wrap items-baseline justify-between gap-4 px-6 py-8 text-caption text-mist">
        <p>© {new Date().getFullYear()} {MASTER_REMIX.BRAND_NAME}. Built for the families who'll inherit it.</p>
        <div className="flex gap-6">
          <PrefetchLink to="/privacy" className="hover:text-charcoal">Privacy</PrefetchLink>
          <PrefetchLink to="/terms" className="hover:text-charcoal">Terms</PrefetchLink>
        </div>
      </div>

      {/* Massive responsive sign-off — File 15 footer architecture */}
      <div className="border-t border-seam py-12 text-center">
        <p
          className="font-display text-charcoal/90"
          style={{ fontSize: "clamp(2.5rem, 10vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
        >
          {MASTER_REMIX.BRAND_NAME}
        </p>
      </div>
    </footer>
  );
};

export default TemplateFooter;
