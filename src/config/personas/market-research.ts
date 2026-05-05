/**
 * COCHRANE MASTER BUILDERS — Market, Competitor & SEO Research
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * Guides: positioning decisions, copy differentiation, SEO strategy,
 * content topics, pricing display, competitive awareness, and
 * understanding the psychological forces driving Calgary vehicle owners
 * to seek mobile detailing services.
 */

export const MARKET_RESEARCH = {

  // ═══════════════════════════════════════════════════════════════════
  // 1. MARKET RESEARCH — The Real Market
  // ═══════════════════════════════════════════════════════════════════
  realMarket: {
    category: "Mobile automotive appearance care — restoration focus",
    overlappingNiches: [
      "Mobile auto detailing",
      "Interior car deep cleaning",
      "Exterior vehicle detailing",
      "Paint correction / paint enhancement",
      "Convenience-based local service businesses",
    ],
    marketLayers: {
      layer1: {
        name: "Maintenance cleaning",
        description: "Basic washes, light interior tidying, recurring upkeep.",
      },
      layer2: {
        name: "Deep detailing",
        description: "Interior extraction, stain removal, odor reduction, neglected vehicle recovery.",
      },
      layer3: {
        name: "Restoration / premium reconditioning",
        description: "Paint correction, ceramic coatings, showroom prep, resale prep, premium vehicle care.",
      },
    },
    calemPosition: "Sits most naturally between Layer 2 and entry-level Layer 3 — more differentiated than 'cheap detailing.'",
    whatClientsBuy: [
      "Relief",
      "Pride",
      "Freshness",
      "Convenience",
      "The feeling of reset",
      "Regained control",
    ],
  },

  demandDynamics: {
    purpose: "Real-world conditions that create demand for mobile detailing",
    triggers: [
      "Customer is too busy to drop off a vehicle",
      "The car has become dirty enough that DIY no longer feels realistic",
      "The owner wants a dramatic reset, not maintenance",
      "The owner is embarrassed by the condition of the vehicle",
      "The owner wants the vehicle refreshed before selling it",
      "Family or work use has pushed the vehicle into neglect",
      "Seasonal dirt, slush, mud, pet hair, food spills, and daily wear have accumulated",
    ],
    keyInsight: "The strongest demand is usually not created by 'interest in detailing.' It is created by a pain threshold. The customer reaches a point where the vehicle feels unpleasant, stale, overwhelming, or socially embarrassing.",
  },

  buyerPsychology: {
    purpose: "Emotional forces driving mobile detailing purchase decisions",
    forces: {
      painThreshold: {
        label: "Pain threshold trigger (dominant)",
        insight: "People do not just buy clean. They buy relief from accumulated neglect and embarrassment.",
        copyImplication: "Lead with outcome — 'get your car back' — not process.",
      },
      shameAvoidance: {
        label: "Shame and embarrassment",
        insight: "Many customers feel bad about how far the car has gone. They delay action because facing the mess feels overwhelming.",
        copyImplication: "Relief-based messaging strengthens the brand. Shame-based messaging would weaken it.",
      },
      convenienceExpectation: {
        label: "Convenience as baseline expectation",
        insight: "Customers increasingly expect local services to come to them. Mobile is not a bonus — it is expected.",
        copyImplication: "'We come to you' should be a major sales hook, not buried as operational detail.",
      },
      outcomeBuying: {
        label: "Outcome-based buying over feature-based",
        insight: "Customers buy outcomes: fresher smell, cleaner seats, no stains, better resale impression, less embarrassment. Not process: shampooing, extraction, waxing.",
        copyImplication: "Translate process into emotional and practical payoff.",
      },
      controlRecovery: {
        label: "Regaining control",
        insight: "The deeper need is for someone to fully take this problem off their plate and give them the feeling of a fresh start.",
        copyImplication: "Position as 'we handle everything' — not 'here is what we do.'",
      },
      socialPerception: {
        label: "Social perception pressure",
        insight: "Guests riding in the car, coworkers seeing it, selling to a buyer — all create external pressure to act.",
        copyImplication: "Acknowledge triggers gently: guests, work, selling, personal frustration, seasonal reset.",
      },
    },
  },

  jobToBeDone: {
    functional: "Take a vehicle I have fallen behind on and restore it to a state I can feel good about again.",
    emotional: "Feel relief, pride, and the satisfaction of a fresh start — without guilt about how far the car went.",
    social: "Have a vehicle I am not embarrassed to drive, park, or have passengers in.",
    logistical: "Get this done without costing me time, energy, or logistical effort.",
  },

  painChain: {
    purpose: "The sequence that drives a Calgary vehicle owner to hire — the promise must explicitly break this chain",
    steps: [
      "The vehicle gradually gets worse over weeks/months",
      "The owner notices but delays action — it is not urgent enough",
      "DIY cleaning feels annoying or insufficient for the level of mess",
      "Drop-off detailing feels inconvenient — takes time, logistics, planning",
      "The mess becomes normalized, but still bothers them on some level",
      "A trigger appears: guests, work event, selling the car, personal frustration, seasonal reset",
      "Now they want one thing: someone to fully take this problem off their plate",
    ],
  },

  unarticulated_need: {
    insight: "The deeper need is not simply for a detailer. It is for a service that says: 'You do not need to feel bad about how far the car has gone. We will come to you, handle it, and give you that fresh-start feeling back.'",
    toneGuidance: "Shame-based messaging would weaken the brand. Relief-based messaging strengthens it.",
  },

  tectonicShifts: {
    purpose: "2025–2026 market realities shaping mobile detailing in Calgary",
    shifts: [
      {
        name: "Convenience is no longer a bonus",
        detail: "Customers expect local services to come to them. Mobile signals modern convenience, not novelty.",
        implication: "'Mobile' should not be buried as an operational detail. It should be a major sales hook.",
      },
      {
        name: "Outcome-based buying is replacing feature-based buying",
        detail: "Customers buy outcomes, not process. The winners translate shampooing/extraction/waxing into emotional and practical payoff.",
        implication: "The winning brand sells the feeling of reset, not the list of steps.",
      },
      {
        name: "Local trust signals matter more than brand polish",
        detail: "Customers care about proof: before/after photos, reviews, visible results, honest pricing, easy booking. A grounded, trustworthy brand outperforms a slick but generic one.",
        implication: "Build trust through evidence, not aesthetics alone.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. CUSTOMER SEGMENTS
  // ═══════════════════════════════════════════════════════════════════
  customerSegments: {
    bestInitialTarget: "Owners of dirty, heavily used, or neglected vehicles in Calgary who want a dramatic interior and exterior reset without needing to leave home or work.",
    segments: {
      busyProfessionals: {
        name: "Busy professionals",
        description: "Car is not filthy in an extreme way, but clearly overdue. They value convenience and are willing to pay for time-saving.",
        responds_to: "'We come to you' and 'book without disrupting your day.'",
      },
      parentsWithMessyVehicles: {
        name: "Parents with messy family vehicles",
        description: "Family vehicles accumulate crumbs, stains, smell, clutter, and heavy wear. Strong segment.",
        responds_to: "Deep interior reset and mobile convenience.",
      },
      tradespeopleAndWorkTrucks: {
        name: "Tradespeople and work truck owners",
        description: "Dirt-heavy, utility-driven vehicles. Respond better to straightforward, no-nonsense messaging.",
        responds_to: "Direct value proposition, not premium luxury language.",
      },
      neglectedVehicleOwners: {
        name: "Neglected vehicle owners",
        description: "Delayed action for months or longer. Vehicle has crossed into 'problem state.' Sharpest positioning opportunity.",
        responds_to: "Dramatic transformation, not upkeep. Relief-based messaging.",
      },
      preSaleCustomers: {
        name: "Pre-sale / pre-listing customers",
        description: "Selling a car and want to improve presentation and perceived care.",
        responds_to: "Outcome-based messaging tied to resale readiness.",
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. COMPETITIVE LANDSCAPE
  // ═══════════════════════════════════════════════════════════════════
  competitiveTiers: [
    "Fixed-location detail shops (in-shop equipment, established, drop-off friction)",
    "Cheap mobile car cleaners (fast, affordable, generic, low differentiation)",
    "Premium luxury detailers (high-end correction, coatings, enthusiast-focused)",
    "Self-serve washes and DIY alternatives (cheap, quick, poor deep-cleaning outcome)",
  ],

  competitors: {
    fixedLocationShops: {
      name: "Fixed-location detail shops",
      positioning: "Professional results, in-shop equipment, trusted detailing quality",
      strength: "May appear more established, broader service menus, stronger authority signals, premium paint services",
      blindSpot: "They assume customers will tolerate inconvenience if quality is good enough. Many will not — especially for a non-emergency service.",
      opportunityForCochrane Master Builders: "Win on convenience without sacrificing transformation.",
    },
    cheapMobileCleaners: {
      name: "Cheap mobile car cleaners",
      positioning: "Fast, affordable, mobile, basic car cleaning",
      strength: "Low entry pricing, simple offer, convenience",
      blindSpot: "They sell mobility, not outcome. They sound interchangeable.",
      opportunityForCochrane Master Builders: "Differentiate through restoration-level transformation, especially for dirty cars and overdue vehicles.",
    },
    premiumLuxuryDetailers: {
      name: "Premium luxury detailers",
      positioning: "High-end correction, coatings, showroom-level finish, premium vehicle care",
      strength: "Aspirational branding, strong visuals, premium pricing power, authority among enthusiasts",
      blindSpot: "They optimize for the car enthusiast or premium owner, not the everyday overwhelmed driver with a messy interior.",
      opportunityForCochrane Master Builders: "Own the middle ground: serious results for normal people with real messes.",
    },
    diyAlternatives: {
      name: "Self-serve washes and DIY alternatives",
      positioning: "Cheap, quick, under customer control",
      strength: "Lower cost, instant access, habitual behavior",
      blindSpot: "DIY is only attractive until the car is too far gone.",
      opportunityForCochrane Master Builders: "Market the service as the moment when the vehicle has moved beyond 'quick clean' and needs a real reset.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. STRATEGIC MARKET POSITION
  // ═══════════════════════════════════════════════════════════════════
  strategicPosition: {
    nicheClaim: "Mobile vehicle restoration for busy Calgary drivers with dirty, neglected, or heavily used cars.",
    positioningStatement: "Cochrane Master Builders helps Calgary drivers get their car back through mobile detailing that restores dirty, heavily used vehicles to a cleaner, fresher, pride-worthy condition — without the hassle of leaving home or work.",
    brandPillars: {
      convenience: "We come to you. No drop-off. No lost time. No extra friction.",
      transformation: "This is not a light clean. This is a visible, satisfying reset.",
      restoration: "The goal is to move the car back toward a like-new feel.",
      honesty: "Straightforward pricing, direct service, real local trust.",
    },
  },

  messagingAngles: {
    strong: [
      "Get your car back",
      "We come to you",
      "From neglected to refreshed",
      "A full reset for dirty vehicles",
      "Deep interior restoration without the hassle",
      "Calgary mobile detailing for cars that need more than a wash",
    ],
    weak: [
      "Quality service",
      "Attention to detail",
      "Best detailing in Calgary",
      "Affordable and professional",
      "Customer satisfaction guaranteed",
    ],
    weakReason: "Too generic and crowded. Every competitor claims these.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // 5. SEO RESEARCH
  // ═══════════════════════════════════════════════════════════════════
  seo: {
    keywordClusters: {
      coreTransactional: [
        "mobile auto detailing Calgary",
        "mobile car detailing Calgary",
        "car detailing Calgary",
        "auto detailing Calgary",
        "mobile detailing Calgary",
        "mobile car cleaning Calgary",
        "full car detail Calgary",
        "interior car detailing Calgary",
        "exterior car detailing Calgary",
      ],
      highIntentProblem: [
        "car interior shampoo Calgary",
        "car seat shampoo Calgary",
        "stain removal car detailing Calgary",
        "odor removal car Calgary",
        "deep interior car cleaning Calgary",
        "dirty car detailing Calgary",
        "neglected car detailing Calgary",
        "extractor car detailing Calgary",
        "pet hair removal car Calgary",
        "work truck detailing Calgary",
      ],
      segmentSpecific: [
        "family vehicle detailing Calgary",
        "SUV detailing Calgary",
        "truck detailing Calgary",
        "commuter car detailing Calgary",
        "rideshare vehicle detailing Calgary",
        "pre-sale car detailing Calgary",
        "used car detailing Calgary",
      ],
      convenience: [
        "car detailing at home Calgary",
        "mobile car detailer near me",
        "car detailing that comes to you Calgary",
        "on-site car detailing Calgary",
        "mobile interior detailing Calgary",
      ],
      informational: [
        "how often should you detail your car in Calgary",
        "how to remove salt stains from car interior",
        "how to get rid of car odor",
        "when does a car need interior extraction",
        "should you detail your car before selling it",
        "mobile detailing vs shop detailing",
        "how much does car detailing cost in Calgary",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 6. SEO EXECUTION PLAN
  // ═══════════════════════════════════════════════════════════════════
  seoExecutionPlan: {
    siteStructure: {
      corePages: [
        "/ (Home — target: mobile auto detailing Calgary)",
        "/services/full-detail (Mobile Full Detail — target: full car detail Calgary)",
        "/services/interior-reset (Interior Detailing — target: interior car detailing Calgary, deep interior car cleaning Calgary)",
        "/services/exterior-refresh (Exterior Detailing — target: exterior car detailing Calgary, paint enhancement Calgary)",
        "/services/neglected-vehicle-reset (Neglected Vehicle Reset — target: dirty car detailing Calgary, neglected car detailing Calgary)",
        "/services/work-truck-detailing (Work Truck / Heavy-Use — target: truck detailing Calgary, work truck detailing Calgary)",
        "/services/pre-sale-detail (Pre-Sale Vehicle Detail — target: pre-sale car detailing Calgary)",
        "/service-area/calgary (Service Area — expandable to district-specific pages)",
        "/gallery (Before & After Gallery)",
        "/reviews (Reviews / Testimonials)",
        "/pricing (Pricing)",
        "/faq (FAQ)",
        "/contact (Contact / Book Now)",
      ],
      contentPages: [
        "Mobile detailing vs shop detailing in Calgary",
        "How to know when your vehicle needs a full detail",
        "The best detailing option for family vehicles",
        "Why neglected interiors need extraction, not just vacuuming",
        "How detailing can help before selling your car",
      ],
    },
    onPageSEO: {
      homepage: {
        suggestedHeadlines: [
          "Mobile Auto Detailing in Calgary for Cars That Need a Real Reset",
          "We Bring Your Car Back — Mobile Detailing in Calgary",
        ],
        mustInclude: [
          "Clear service outcome",
          "Calgary mention high on page",
          "Mobile convenience",
          "Before/after proof",
          "Target use cases",
          "Reviews",
          "Price anchoring or 'starting from'",
          "Easy CTA",
        ],
      },
      servicePages: {
        eachPageMustHave: [
          "One core keyword theme",
          "One main customer problem",
          "One clear promise",
          "Process summary",
          "What is included",
          "Who it is for",
          "FAQs",
          "Service area mention",
          "CTA",
        ],
      },
      imageSEO: {
        rules: [
          "Descriptive filename (e.g., interior-car-detailing-calgary-before-after.jpg)",
          "Alt text tied to service and city",
          "Compressed size for speed",
          "Georelevance in page context where appropriate",
        ],
      },
      schema: [
        "Local business schema",
        "Service schema",
        "FAQ schema",
        "Review markup within guidelines",
      ],
    },
    googleBusinessProfile: {
      category: "Auto detailing service",
      postContent: [
        "Before/after transformations",
        "Seasonal tips",
        "Featured jobs",
        "Specific customer use cases",
      ],
      reviewStrategy: "Encourage reviews that mention: Calgary, mobile convenience, interior detailing, stains/smell/neglected vehicle transformation, professionalism, speed and ease of booking.",
      idealReviewLanguage: [
        "Cochrane Master Builders came right to my house in Calgary and completely transformed the interior.",
        "My truck had been neglected for months and it feels new again.",
        "The convenience was amazing and the results were way beyond a normal clean.",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 7. CONTENT STRATEGY
  // ═══════════════════════════════════════════════════════════════════
  contentStrategy: {
    bestAngle: "Build content around pain-state scenarios, buying decisions, use cases, transformation proof, and local conditions — not generic educational fluff.",
    highValueContent: [
      { title: "When your car needs more than a vacuum", target: "People whose vehicle has crossed into problem-state." },
      { title: "Mobile detailing vs shop detailing in Calgary", target: "Frame convenience as a core advantage." },
      { title: "How family vehicles get restored after months of mess", target: "Parents with messy vehicles." },
      { title: "What a full interior reset actually includes", target: "Move people from price-shopping to outcome-buying." },
      { title: "Should you detail your car before selling it?", target: "Pre-sale traffic." },
      { title: "What extraction cleaning does that basic interior cleaning cannot", target: "Support premium perception and educate on real value." },
    ],
    beforeAfterEngine: {
      purpose: "Repeated proof content built around actual job stories",
      elements: [
        "What condition the vehicle was in",
        "What problems were solved",
        "What was done",
        "What changed",
        "Where in Calgary",
        "Customer reaction",
      ],
      powers: [
        "Site pages",
        "Google posts",
        "Instagram / TikTok / Reels",
        "Local SEO image relevance",
        "Ad creative",
        "Conversion trust",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 8. CONVERSION STRATEGY
  // ═══════════════════════════════════════════════════════════════════
  conversionStrategy: {
    coreElements: [
      "Headline with clear outcome",
      "Real before/after proof above the fold",
      "'We come to you anywhere in Calgary'",
      "Pricing clarity or starting price",
      "Easy booking CTA",
      "Trust signals",
      "Service inclusions",
      "FAQ around time, condition, and mobile logistics",
    ],
    objectionsToAnswer: [
      "Is this just a basic clean?",
      "Can you handle really dirty cars?",
      "Do I need to provide water or power?",
      "How long does it take?",
      "What does the starting price include?",
      "Is paint restoration really included?",
      "Do you charge more for worse condition?",
      "Do you service my part of Calgary?",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 9. STRATEGIC RISKS
  // ═══════════════════════════════════════════════════════════════════
  strategicRisks: [
    {
      risk: "Underpricing the transformation",
      detail: "If the service is truly high-impact, pricing too low may reduce trust or make the brand seem basic rather than restorative.",
    },
    {
      risk: "Sounding too generic",
      detail: "If the messaging stays at 'quality detailing at affordable prices,' Cochrane Master Builders will blur into the market.",
    },
    {
      risk: "Overpromising 'factory quality'",
      detail: "This phrase is powerful but needs definition. Translate into believable outcomes, not vague perfection.",
    },
    {
      risk: "Trying to speak to everyone",
      detail: "The broad market exists, but sharper demand comes from clear use cases.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // 10. POSITIONING UPGRADE — Copy Direction
  // ═══════════════════════════════════════════════════════════════════
  positioningUpgrade: {
    leadMessage: "Get your car back.",
    bestMarketPosition: "Calgary's mobile detailer for dirty, neglected, and heavily used vehicles that need a true reset.",
    emotionalPromise: "From stale, dirty, and overdue to fresh, restored, and satisfying.",
    practicalPromise: "We come to you anywhere in Calgary and handle the full reset without adding friction.",
    coreNarrative: "Cochrane Master Builders exists to restore pride of ownership: you get your car back because someone capable came to you and handled the full transformation — from neglected and overdue to fresh, clean, and satisfying.",
  },
} as const;
