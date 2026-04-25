import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import texturePaperFiber from "@/assets/drywall/texture-paper-fiber.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const Terms = ({ onBookClick }: PageProps) => (
  <>
    <Navigation onBookClick={onBookClick} />
    <main>
      <InnerHero eyebrow="Legal" title="Terms of Service" lede="The basics of how we work together." />
      <section className="section-y relative overflow-hidden">
        <AmbientBackdrop image={texturePaperFiber} opacity={0.06} />
        <div className="container relative z-10 mx-auto max-w-3xl px-6 space-y-6 text-graphite text-body-lg">
          <p>Quotes are planning ranges and become firm only after a written scope is confirmed. Final pricing depends on the actual condition of the work area and any changes you request mid-project.</p>
          <p>We back our work with touch-ups within 14 days of completion for anything that settles unevenly. Damage caused by structural issues, water intrusion, or third-party trades is outside our scope.</p>
          <p>By submitting a quote request you agree to be contacted by phone or email about your inquiry.</p>
        </div>
      </section>
    </main>
    <Footer onBookClick={onBookClick} />
  </>
);

export default Terms;
