import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { EMAIL, EMAIL_HREF } from "@/config/template/contact";

interface StickyCTAProps {
  onBookClick?: () => void;
}

/**
 * Mobile-only sticky thumb-zone CTA — dual channel (Call + Quote).
 * - Only renders below `lg` (≥1024px is hidden via Tailwind `lg:hidden`).
 * - Appears after scrolling past ~60% of the viewport so it never collides with hero CTAs.
 * - Auto-hides while any in-page `[data-cta-band]` (the green CTABand) is on screen,
 *   so we never stack two identical CTAs in the user's eyeline.
 * - Click-to-call is the top conversion lever for a local trade on mobile; the
 *   forest "Quote" button stays the dominant action, Call is the escape hatch.
 * - Respects safe-area-inset-bottom and reduced motion.
 */
const StickyCTA = ({ onBookClick }: StickyCTAProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [bandVisible, setBandVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll-past-hero gate
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch every CTABand on the page; hide sticky when any is visible.
  useEffect(() => {
    const setup = () => {
      observerRef.current?.disconnect();
      const bands = document.querySelectorAll<HTMLElement>("[data-cta-band]");
      if (bands.length === 0) {
        setBandVisible(false);
        return;
      }
      const visibleSet = new Set<Element>();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visibleSet.add(entry.target);
            else visibleSet.delete(entry.target);
          }
          setBandVisible(visibleSet.size > 0);
        },
        { threshold: 0.15 },
      );
      bands.forEach((b) => observerRef.current!.observe(b));
    };

    setup();
    // Re-setup on route change — wait a frame so the new page has mounted
    const onPop = () => requestAnimationFrame(setup);
    window.addEventListener("popstate", onPop);
    // Also refresh when the URL changes via pushState (react-router)
    const interval = window.setInterval(setup, 1000);
    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("popstate", onPop);
      window.clearInterval(interval);
    };
  }, []);

  const visible = scrolled && !bandVisible;

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      } motion-reduce:transition-none`}
    >
      <div className="safe-bottom flex items-stretch gap-2 border-t border-seam bg-bone/95 px-4 pt-3 shadow-[0_-8px_24px_-14px_rgba(0,0,0,0.22)] backdrop-blur-md">
        <a
          href={EMAIL_HREF}
          tabIndex={visible ? 0 : -1}
          aria-label={`Email ${EMAIL}`}
          className="pointer-events-auto inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border border-[hsl(var(--copper)/0.4)] px-4 py-3.5 text-sm font-medium text-charcoal transition-colors hover:border-forest/40 hover:text-forest active:scale-[0.98]"
        >
          <Mail size={16} aria-hidden />
          Email
        </a>
        <button
          type="button"
          onClick={onBookClick}
          tabIndex={visible ? 0 : -1}
          className="cta-forest pointer-events-auto flex-1 rounded-sm bg-forest px-5 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-forest-deep active:scale-[0.98]"
        >
          Send Photos for a Quote
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;
