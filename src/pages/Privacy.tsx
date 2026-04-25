import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import texturePaperFiber from "@/assets/drywall/texture-paper-fiber.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const Privacy = ({ onBookClick }: PageProps) => (
  <>
    <Navigation onBookClick={onBookClick} />
    <main>
      <InnerHero eyebrow="Legal" title="Privacy Policy" lede="How we handle the information you share with us." />
      <section className="section-y relative overflow-hidden">
        <AmbientBackdrop image={texturePaperFiber} opacity={0.06} />
        <div className="container relative z-10 mx-auto max-w-3xl px-6 space-y-6 text-graphite text-body-lg">
          <p>We collect only the information you provide through our quote form (name, email, phone, address, and project details) and use it solely to respond to your inquiry and schedule the work.</p>
          <p>We do not sell or share your information with third parties. We retain inquiry records for our internal scheduling and follow-up only.</p>
          <p>To request deletion of your data, email us at the address listed in the footer.</p>
        </div>
      </section>
    </main>
    <Footer onBookClick={onBookClick} />
  </>
);

export default Privacy;
