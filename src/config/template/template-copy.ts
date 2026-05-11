/**
 * MASTER TEMPLATE — Neutral Copy Library
 *
 * Page-by-page copy in the master-builder voice. Every service-specific
 * fragment is a `{VARIABLE}` token that 150 future remixes will swap.
 * No exclamation marks. No "call now." No urgency stunts. Just the
 * legacy-luxury voice from File 1.5 (North Star) filtered through
 * 1.5.6 StoryBrand (hero=client, guide=us) and 1.5.7 Trade Manifesto.
 */

export const TEMPLATE_COPY = {
  brand: {
    tagline: "Built for the families who'll inherit it.",
    promise:
      "Three generations of Cochrane homes have been finished by the same standard. The next three will be too.",
  },

  nav: [
    { label: "Home", path: "/" },
    { label: "Brand Story", path: "/brand-story" },
    { label: "Why We Love {SERVICE}", path: "/why-we-love" },
    { label: "Services", path: "/services" },
    { label: "Areas We Serve", path: "/areas-we-serve" },
    { label: "Pricing", path: "/pricing" },
    { label: "Gallery", path: "/gallery" },
    { label: "Reviews", path: "/reviews" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],

  cta: {
    primary: "Send photos for a quote",
    secondary: "See pricing & process",
    contact: "Speak with a builder",
  },

  // ─── HOME ─────────────────────────────────────────────────────────────
  home: {
    hero: {
      eyebrow: "Cochrane, Alberta — since 1958",
      headline: "{SERVICE_PLURAL} for the families who'll inherit them.",
      sub: "We {SERVICE_VERB} the way our grandfathers did — square, plumb, and warranted in writing for fifteen years. No shortcuts. No second invoices. The standard is the standard.",
    },
    promise: {
      eyebrow: "The promise",
      headline: "One trade. One standard. One invoice you'll keep.",
      body: "Most {SERVICE} work in this country is a race to the bottom on price and finish. Ours isn't. We {SERVICE_VERB} a single category at master-builder grade — every line of every quote tied to the 15-year structural guarantee on the invoice.",
    },
    services: {
      eyebrow: "What we {SERVICE_VERB}",
      headline: "Five {SERVICE} engagements. Five honest price bands.",
      lede: "Pick the scope closest to your home. The price you see on /pricing is the price on the invoice — the only adjustment is for material you select.",
    },
    proof: {
      eyebrow: "The work",
      headline: "Before. After. The number that mattered.",
      lede: "We don't show portfolio shots. We show the wall the previous contractor told someone to live with — and the wall after we left.",
    },
    process: {
      eyebrow: "How we work",
      headline: "Four steps. No surprises. The first three are free.",
    },
    faq: {
      eyebrow: "Common questions",
      headline: "The questions every honest {SERVICE} client asks.",
    },
    cta: {
      eyebrow: "Begin",
      headline: "Send three photos. Receive a written quote within 24 hours.",
      body: "No sales call. No pressure. The next move is entirely yours.",
    },
  },

  // ─── BRAND STORY ──────────────────────────────────────────────────────
  brandStory: {
    hero: {
      eyebrow: "Brand story",
      title: "Three generations of one standard.",
      lede: "{BRAND_NAME} is the {SERVICE} arm of a Cochrane family of master builders that started in 1958. Our standard didn't change because the business model did.",
    },
    chapters: [
      {
        eyebrow: "Chapter 01 — 1958",
        headline: "The first nail.",
        body: "A grandfather, a hammer, a Cochrane farmhouse, and the rule that has carried us for sixty-seven years: if your name is on the invoice, your name is on the wall.",
      },
      {
        eyebrow: "Chapter 02 — 1986",
        headline: "The second generation took over a standard, not a business.",
        body: "Our father refused to scale by lowering the standard. He scaled by raising the price floor. Every {SERVICE} client we've worked with since has been quoted against scope, never against budget.",
      },
      {
        eyebrow: "Chapter 03 — Today",
        headline: "We {SERVICE_VERB} like it's our family's home.",
        body: "Because in two of the three Cochrane neighbourhoods we work in, it literally is. We will not finish a {SERVICE} surface in your home that we wouldn't finish in our mother's.",
      },
    ],
    values: [
      { title: "Square, plumb, warranted.", body: "The three rules every {SERVICE} surface meets. In writing on every invoice." },
      { title: "Quote against scope.", body: "Never against the client's budget. The price band is the price band." },
      { title: "Clean is the standard.", body: "If the worksite is not visibly cleaner than we found it, the work is free." },
      { title: "One trade, mastered.", body: "We {SERVICE_VERB}. We don't dabble. The depth is what makes the price honest." },
    ],
    founderQuote:
      "My grandfather built houses for families he knew by name. Sixty-seven years later we're still finishing rooms in some of those same houses — for the grandchildren of the people who first hired him. That's the math that runs this company.",
  },

  // ─── WHY WE LOVE {SERVICE} ────────────────────────────────────────────
  whyWeLove: {
    hero: {
      eyebrow: "Why we love {SERVICE}",
      title: "{SERVICE} is the trade everyone underestimates.",
      lede: "Every other finish in your home depends on the {SERVICE} underneath it being right. Get the {SERVICE} wrong and the whole room reads wrong. That's why we chose this trade — and why we won't share it with another category.",
    },
    obsession: {
      headline: "The 1mm that nobody else cares about.",
      body: "Industry tolerance for {SERVICE} flatness is roughly a quarter inch over eight feet. Our standard is one millimetre. The difference is invisible to the eye until light grazes the wall — and then it is the entire conversation.",
    },
    methods: [
      { title: "Material", body: "We {SERVICE_VERB} only with grades the manufacturer will warranty. No commodity stock from the last contractor's truck." },
      { title: "Method", body: "The crew that frames the job is the crew that finishes the job. No hand-offs. No 'someone else's problem' on the second pass." },
      { title: "Measurement", body: "Every {SERVICE} surface laser-checked at three stages — pre-install, mid-cure, sign-off. The number goes on the invoice." },
    ],
    quote:
      "There is no such thing as 'good enough' {SERVICE}. There is the standard, and there is everything below the standard.",
  },

  // ─── SERVICES HUB ─────────────────────────────────────────────────────
  services: {
    hero: {
      eyebrow: "Services",
      title: "Five {SERVICE} engagements. One standard across all five.",
      lede: "Every package below carries the same 15-year structural guarantee, the same Level-5 finish, the same crew. The only thing that changes is scope.",
    },
    crossTradeGuarantee: {
      headline: "If we touch it, we warranty it. In writing. For fifteen years.",
      body: "The guarantee is not a product tier. It is the floor. Every {SERVICE} surface, every package, every invoice.",
    },
  },

  // ─── SERVICE DETAIL ───────────────────────────────────────────────────
  serviceDetail: {
    whatYouGet: {
      eyebrow: "What you get",
      headline: "The full scope. Itemised. Before you spend a dollar.",
      body: "A written quote enumerating every {SERVICE} surface, every material grade, every cure window, every clean-up step. Read it before you decide.",
    },
    relatedServices: {
      eyebrow: "Related",
      headline: "If you're {SERVICE_VERB}-ing, you're probably also planning these.",
    },
  },

  // ─── PRICING ──────────────────────────────────────────────────────────
  pricing: {
    hero: {
      eyebrow: "Pricing & process",
      title: "Honest bands. Written quotes. No second invoices.",
      lede: "We publish our {SERVICE} price bands because the alternative — quoting against the client's budget — is the practice that ruined this trade. The number you see is the number on the invoice.",
    },
    philosophy: {
      headline: "The expensive option is paying twice.",
      body: "A general contractor charges two-to-four times our band for the same {SERVICE} scope — because they bring six trades when two will do. The 15-year structural guarantee is the math: you pay once.",
    },
  },

  // ─── GALLERY ──────────────────────────────────────────────────────────
  gallery: {
    hero: {
      eyebrow: "Gallery",
      title: "The work, unretouched.",
      lede: "Every photo is a {SERVICE} surface in a Cochrane home, taken on the day of sign-off, before the client moved their furniture back. No staging. No portfolio styling.",
    },
  },

  // ─── REVIEWS ──────────────────────────────────────────────────────────
  reviews: {
    hero: {
      eyebrow: "Reviews",
      title: "Before. After. The specific number.",
      lede: "Every review below names the wall, the timeline, and the outcome. Vague praise doesn't make it onto this page.",
    },
  },

  // ─── ABOUT ────────────────────────────────────────────────────────────
  about: {
    hero: {
      eyebrow: "About",
      title: "A {SERVICE} company that has refused to scale for sixty-seven years.",
      lede: "We chose depth over breadth on purpose. One trade, mastered, in one town, for three generations of the same families.",
    },
    values: [
      { title: "Family business.", body: "Owned and operated by the third generation. The fourth is on the crew already." },
      { title: "Local first.", body: "Cochrane and the eight surrounding communities. Nothing further. Nothing dispatched." },
      { title: "Transparent always.", body: "Pricing public. Guarantees written. Mistakes named. Invoices itemised." },
      { title: "Standard before scale.", body: "We will turn down a job before we will compromise the {SERVICE} standard on a finished surface." },
    ],
    communityRoots:
      "We finish {SERVICE_PLURAL} in the same Cochrane neighbourhoods our parents and grandparents did. Our crew lives within ten minutes of every house we work in.",
  },

  // ─── CONTACT ──────────────────────────────────────────────────────────
  contact: {
    hero: {
      eyebrow: "Contact",
      title: "Send three photos. We do the rest.",
      lede: "Most {SERVICE} questions can be answered from a clear photograph and a few sentences. Begin with the booking form — speak with a builder only if you'd prefer.",
    },
    booking: {
      headline: "The quote arrives within 24 hours.",
      body: "Itemised. Written. Tied to the 15-year guarantee. No sales call between you and the number.",
    },
  },

  // ─── 404 ──────────────────────────────────────────────────────────────
  notFound: {
    eyebrow: "404",
    title: "This page is not in the catalogue.",
    lede: "The {SERVICE} surface you're looking for is somewhere else. Try the services hub or send us the link you followed and we'll repair the path.",
  },

  // ─── LEGAL ────────────────────────────────────────────────────────────
  privacy: {
    hero: {
      eyebrow: "Privacy",
      title: "What we collect, why, and how to remove it.",
      lede: "We collect the minimum needed to quote your {SERVICE} job: your contact details, your address, the photos you send. Nothing else. Nothing sold. Nothing shared.",
    },
  },
  terms: {
    hero: {
      eyebrow: "Terms",
      title: "The terms that govern every {SERVICE} engagement.",
      lede: "Plain language. The same language that goes on the invoice. No fine print designed to favour the contractor.",
    },
  },
} as const;
