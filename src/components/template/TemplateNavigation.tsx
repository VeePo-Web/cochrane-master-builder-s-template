import { Link, useLocation } from "react-router-dom";
import PrefetchLink from "./PrefetchLink";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MasterLogo } from "@/master";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { SloganHeartbeat } from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props {
  onBookClick?: BookingClickHandler;
}

const TemplateNavigation = ({ onBookClick }: Props) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Load-bearing pages only — excludes footer-only hidden links.
  const navPages = ["/", "/services", "/areas-we-serve", "/pricing", "/guarantee", "/reviews", "/gallery", "/faq", "/about"];
  const desktop = TEMPLATE_COPY.nav.filter((n) => navPages.includes(n.path));
  const mobile  = TEMPLATE_COPY.nav.filter((n) => navPages.includes(n.path));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "bg-bone/95 backdrop-blur-md border-b border-copper/15" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-forest focus:text-primary-foreground focus:rounded-sm"
      >
        Skip to content
      </a>
      {/* Slogan micro-eyebrow — visible only when NOT scrolled, fades on scroll */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: scrolled ? 0 : 24, opacity: scrolled ? 0 : 1 }}
        aria-hidden
      >
        <div className="container mx-auto px-6 pt-2">
          <SloganHeartbeat variant="nav" />
        </div>
      </div>

      <div className="container mx-auto grid h-14 md:h-20 grid-cols-[auto_1fr_auto] items-center gap-4 px-6">
        <Link to="/" aria-label="Home" className="inline-flex items-center">
          <MasterLogo slot="nav" />
        </Link>

        <nav className="hidden items-center justify-center gap-3 xl:gap-4 lg:flex" aria-label="Primary">
          {desktop.map((link) => {
            const active = pathname === link.path;
            return (
              <PrefetchLink
                key={link.path}
                to={link.path}
                className={`group relative px-4 py-2 text-caption uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-charcoal" : "text-graphite hover:text-charcoal"
                }`}
              >
                {link.label}
                {active ? (
                  <span className="absolute -bottom-0.5 left-4 right-4 h-px bg-copper" />
                ) : (
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-4 right-4 h-px origin-left scale-x-0 bg-copper/50 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100"
                  />
                )}
              </PrefetchLink>
            );
          })}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <button
            type="button"
            onClick={() => onBookClick?.({ source: "Nav → Book Now" })}
            className="cta-forest inline-flex rounded-none bg-forest px-6 py-3 text-sm font-medium tracking-[0.08em] text-primary-foreground transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-forest-deep hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          >
            Book Now
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-3 inline-flex h-12 w-12 items-center justify-center text-charcoal lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="min-h-[calc(100vh-3.5rem)] border-t border-seam bg-bone lg:hidden"
        >
          {/* Slogan — first line of the mobile drawer */}
          <ul className="container mx-auto flex min-h-[calc(100vh-3.5rem)] flex-col gap-px bg-seam px-0">
            <li className="border-b border-seam bg-bone px-6 py-4">
              <SloganHeartbeat variant="nav" />
            </li>
            {mobile.map((link) => (
              <li key={link.path} className="bg-bone">
                <PrefetchLink
                  to={link.path}
                  className={`flex min-h-14 items-center px-6 text-body ${pathname === link.path ? "text-forest" : "text-charcoal"}`}
                >
                  {link.label}
                </PrefetchLink>
              </li>
            ))}
            <li className="safe-bottom mt-auto border-t border-seam bg-bone px-6 pt-6 pb-6">
              <button
                type="button"
                onClick={() => { setOpen(false); onBookClick?.({ source: "Mobile nav → Book Now" }); }}
                className="cta-forest w-full rounded-none bg-forest px-5 py-3 text-sm font-medium tracking-[0.08em] text-primary-foreground"
              >
                Book Now
              </button>
            </li>
          </ul>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
};

export default TemplateNavigation;
