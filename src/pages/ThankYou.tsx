import { Link } from "react-router-dom";
import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import heroThankYou from "@/assets/drywall/hero-thank-you.jpg";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";

const ThankYou = () => (
  <>
    <Navigation />
    <main>
      <InnerHero
        eyebrow="Sent"
        title="Thanks — we'll be in touch within one business day."
        lede="In the meantime, you can reply to the confirmation email with a couple of photos. It speeds the quote up considerably."
        backgroundImage={heroThankYou}
        backgroundAlt="A single bright window with a sheer curtain and a calm bone-painted wall"
      />
      <section className="section-y relative overflow-hidden">
        <AmbientBackdrop image={bgBlurBoneCorner} opacity={0.08} position="bottom" />
        <div className="container relative z-10 mx-auto max-w-3xl px-6">
          <p className="font-eyebrow mb-4">What happens next</p>
          <ol className="space-y-4 text-body-lg text-graphite">
            <li><span className="font-eyebrow text-forest">01</span> &nbsp; We review your photos and the room context.</li>
            <li><span className="font-eyebrow text-forest">02</span> &nbsp; You get a realistic range and a clear next step within one business day.</li>
            <li><span className="font-eyebrow text-forest">03</span> &nbsp; If the range works, we book a tidy visit and confirm scope in writing.</li>
          </ol>
          <Link to="/" className="story-link mt-10 inline-flex text-sm font-medium text-forest">← Back to home</Link>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default ThankYou;
