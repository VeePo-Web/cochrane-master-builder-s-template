import { Link } from "react-router-dom";
import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";

const NotFound = () => (
  <>
    <Navigation />
    <main>
      <InnerHero
        eyebrow="404"
        title="That page seems to be unfinished."
        lede="Like a basement waiting on stage one — let's get you back to something solid."
      />
      <section className="section-y relative overflow-hidden">
        <AmbientBackdrop image={bgBlurBoneCorner} opacity={0.10} />
        <div className="container relative z-10 mx-auto max-w-3xl px-6">
          <Link to="/" className="story-link text-sm font-medium text-forest">← Back to home</Link>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default NotFound;
