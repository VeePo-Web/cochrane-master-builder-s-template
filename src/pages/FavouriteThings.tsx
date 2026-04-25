import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import SectionTitle from "@/components/drywall/SectionTitle";
import CTABand from "@/components/drywall/CTABand";
import SEOHead from "@/components/drywall/SEOHead";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import EditorialImage from "@/components/drywall/EditorialImage";
import heroFavouriteThings from "@/assets/drywall/hero-favourite-things.jpg";
import editorialPaintSwatch from "@/assets/drywall/editorial-paint-swatch.jpg";
import texturePaperFiber from "@/assets/drywall/texture-paper-fiber.jpg";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const FAVOURITES = [
  {
    fig: "01",
    title: "The first skim coat.",
    body: "There's a quiet moment when raw, paper-faced board stops being a building material and starts being a wall. The mud goes on, the light catches it differently, and the whole room turns a corner you can almost hear.",
  },
  {
    fig: "02",
    title: "A patch nobody ever finds.",
    body: "Invisibility is the whole craft. The best repair is the one a homeowner walks past on their way to make coffee — every morning, for the next ten years — and never once notices again.",
  },
  {
    fig: "03",
    title: "A perfect inside corner.",
    body: "A clean 90° with paper tape, mud bedded just right, no bubbles, no bumps, no shadow. Quietly the most satisfying inch in residential construction, and most homeowners will live an entire life without ever knowing it's there.",
  },
  {
    fig: "04",
    title: "Sanding day silence.",
    body: "Mask on, headphones in, a worklight raking flat across a long wall. The whole room becomes one surface and one decision, repeated a thousand times: smoother, or done.",
  },
  {
    fig: "05",
    title: "The before-and-after swipe.",
    body: "We take the photos for our records. Homeowners always end up asking for them anyway — and that small, surprised eyebrow-raise as they swipe between the two is the part of the job that genuinely doesn't get old.",
  },
  {
    fig: "06",
    title: "First roller of paint on fresh mud.",
    body: "Primer goes over a finished patch and the repair just… leaves. In real time. The wall stops being a project, the room stops being a renovation, and the house quietly goes back to being a house.",
  },
];

const FACTS = [
  { figure: "1916", caption: "The year USG patented the modern gypsum board. The wall in your living room is older than your grandparents." },
  { figure: "~52 lb", caption: "What a single ½″, 4×8 sheet weighs. We carry roughly forty of them up your stairs on installation day." },
  { figure: "3 coats", caption: "Mud passes for a seam that disappears under paint. Skip one and the wall will tell on you in two years." },
  { figure: "220 grit", caption: "Our sweet spot for the final sanding pass. Coarser leaves marks; finer just wastes the afternoon." },
  { figure: "24 hrs", caption: "Cure time we actually wait between coats. The shortcut here is the reason most patches fail." },
  { figure: "0 visible", caption: "Seams, screws, or repairs in a finished room. If you can find one, we owe you a coffee." },
];

const FavouriteThings = ({ onBookClick }: PageProps) => {
  return (
    <>
      <SEOHead
        title="Why we love drywall — Cochrane Drywall Masters"
        description="Field notes from a Cochrane crew on the small obsessions, satisfying inches, and quiet craft of finishing drywall the right way."
        path="/favourite-things"
      />
      <Navigation onBookClick={onBookClick} />
      <main>
        <InnerHero
          eyebrow="Field Notes"
          title="Why we still love drywall."
          lede="Most people only think about drywall when something's wrong with it. We think about it most days. These are the moments, the details, and the small obsessions that keep us in the trade — written between coats, in real Cochrane homes."
          backgroundImage={heroFavouriteThings}
          backgroundAlt="Editorial flat-lay of curated craftsperson tools on a linen drop cloth"
        />

        {/* Opening manifesto — quiet texture backdrop */}
        <section className="section-y relative overflow-hidden">
          <AmbientBackdrop image={texturePaperFiber} opacity={0.06} />
          <div className="container relative z-10 mx-auto px-6 max-w-3xl">
            <p className="drop-cap text-body-lg text-graphite">
              Drywall is the wall behind every memory in your house. The wall a toddler runs their
              hand along on the way to the kitchen. The wall a Christmas tree leans against in
              December. The wall that catches the first honest afternoon light in a brand-new room.
              It's everywhere — and almost no one notices it. Which, if you ask a drywaller, is
              exactly the point.
            </p>
            <p className="mt-6 text-body-lg text-graphite">
              It's a quiet trade. No chrome, no horsepower, no expensive toys. Just sheets, paper
              tape, a few buckets of mud, a stack of sandpaper, and a stubborn refusal to leave a
              single seam visible. The whole job is making something disappear so the room can
              finally show up.
            </p>
            <p className="mt-6 text-body-lg text-graphite">
              We get to do that — week after week, in real Cochrane homes — then load the truck and
              drive off while a family eats dinner in a room that doesn't bug them anymore. Twelve
              years in, that still feels like a pretty good way to spend a career.
            </p>
          </div>
        </section>

        {/* Things we love */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle
              eyebrow="Things we love"
              headline="Six small obsessions, in roughly the order they ruin us."
            />
            <ul className="mt-12 grid gap-10 md:grid-cols-2 max-md:gap-8">
              {FAVOURITES.map((item) => (
                <li key={item.fig} className="border-l-2 border-forest pl-5 max-md:pl-4">
                  <p className="font-eyebrow !text-[0.65rem] !text-forest tabular-nums">
                    Fig. {item.fig}
                  </p>
                  <h3 className="mt-2 font-display text-display-sm text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-graphite">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Featured favourite — paint swatch */}
        <section className="section-y">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="font-eyebrow !text-[0.65rem] !text-forest tabular-nums">Fig. 07</p>
            <h3 className="mt-2 font-display text-display-md text-charcoal">
              The two colours we keep coming back to.
            </h3>
            <p className="mt-4 max-w-2xl text-body-lg text-graphite">
              Bone for the wall. Forest for the trim. Dry-tested on raw board before the room ever
              commits to a single roller. After twelve years and a few hundred living rooms, this
              is the pair we still reach for first.
            </p>
            <div className="mt-8">
              <EditorialImage
                src={editorialPaintSwatch}
                alt="Hand-painted bone and forest green paint swatches dry-tested on raw drywall"
                caption="Bone & forest — the two we keep coming back to."
                aspect="aspect-[3/2]"
              />
            </div>
          </div>
        </section>

        {/* Fun facts — ambient backdrop */}
        <section className="section-y bg-paper relative overflow-hidden">
          <AmbientBackdrop image={bgBlurBoneCorner} opacity={0.08} />
          <div className="container relative z-10 mx-auto px-6">
            <SectionTitle
              eyebrow="Drywall, briefly"
              headline="A few numbers we think about way more than we should."
            />
            <div className="mt-12 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
              {FACTS.map((f) => (
                <div key={f.figure} className="bg-paper p-8 max-sm:p-6">
                  <p className="font-display text-display-lg text-charcoal tabular-nums leading-none">
                    {f.figure}
                  </p>
                  <hr className="editorial-rule mt-5" />
                  <p className="mt-5 text-graphite">{f.caption}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-2xl text-caption text-mist">
              Sources: USG company history, manufacturer spec sheets, and twelve Cochrane winters of muscle memory.
            </p>
          </div>
        </section>

        {/* Why drywall / why Cochrane */}
        <section className="section-y">
          <div className="container mx-auto px-6 grid gap-12 md:grid-cols-2 max-md:gap-10">
            <div>
              <p className="font-eyebrow mb-3">Why drywall</p>
              <p className="font-display text-display-md text-charcoal">
                Because the work either disappears, or it doesn't. There's nowhere to hide.
              </p>
              <p className="mt-5 text-graphite">
                A lot of trades let you talk your way out of a rough finish. Drywall doesn't. The
                seam catches the light or it doesn't. The patch is invisible or it isn't. We picked
                a trade that grades itself, in front of the homeowner, every single time — and
                twelve years in, that's the part that's kept us honest.
              </p>
            </div>
            <div className="max-md:border-t max-md:border-seam max-md:pt-10">
              <p className="font-eyebrow mb-3">Why Cochrane</p>
              <p className="font-display text-display-md text-charcoal">
                Because these are real houses, lived in by people who just want them to feel finished.
              </p>
              <p className="mt-5 text-graphite">
                Cochrane is full of homeowners who care about their space without needing it to look
                like a magazine. A basement that should feel warmer. A garage that should feel done.
                A hallway with one stubborn dent the eye keeps finding. That's the work we love
                most — and almost all of it lives within ten minutes of our truck.
              </p>
            </div>
          </div>
        </section>

        {/* Pull quote */}
        <section className="section-y">
          <div className="container mx-auto px-6 max-w-3xl text-center max-md:px-2">
            <hr className="editorial-rule mx-auto" />
            <blockquote className="mt-8">
              <p className="font-display italic text-pull-quote text-charcoal">
                “Anyone can hang a sheet of drywall. Almost no one finishes one so well you forget
                it was ever there. That gap, right there, is the whole job.”
              </p>
            </blockquote>
            <p className="mt-6 font-eyebrow !text-[0.65rem]">
              Cochrane Drywall Masters — field notes, between coats
            </p>
          </div>
        </section>

        <CTABand
          headline="Got a wall that deserves the version you don't have to think about?"
          body="Send a couple of phone photos of what you're dealing with. We'll come back with an honest price range and a clear next step inside one business day. No sales call, no pressure, no obligation to book."
          onPrimaryClick={onBookClick}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default FavouriteThings;
