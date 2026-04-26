/**
 * ═══════════════════════════════════════════════════════════════════════════
 * REMIX CHECKLIST — the definitive roadmap for every Masters sub-service site
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This is NOT an automated test runner. It is a **typed, phased, tiered plan**
 * that Lovable (or Claude Code) reads to generate deep, in-depth implementation
 * plans for each step of remixing the master template into a fully bespoke
 * trade site (Drywall, Roofing, Plumbing, Electrical, …).
 *
 * HOW TO USE IT
 *   1. The operator uploads the trade brief, service catalogue, areas
 *      spreadsheet, and brand inputs (see Phase 1).
 *   2. For each `CheckItem`, the AI agent reads `description`, the linked
 *      `playbook`, and the `inputsNeeded` list, then generates an in-depth
 *      plan for that step. The agent then executes the plan.
 *   3. The operator confirms each item before moving on. P0 items are required
 *      to ship; P1 are strong-recommend; P2 is polish.
 *
 * GUARANTEE
 *   Walking this list end-to-end produces a fully bespoke Masters site —
 *   never a re-skinned template. No leftover sister-site fingerprints, every
 *   page SEO-strong, conversion-tuned, and legally clean.
 *
 * SEE ALSO
 *   - src/master/README.md            (how the master folder is organized)
 *   - src/master/playbooks/           (deep-dive guides for each phase)
 *   - src/master/trades.ts            (the network of sister sites)
 *   - src/master/brand/BRAND_BIBLE.md (canonical brand contract)
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ───────────────────────────────────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────────────────────────────────────

/** Priority tier — drives what's required to ship vs. what's polish. */
export type ChecklistTier = "P0" | "P1" | "P2";

/** Who is responsible for this item. */
export type ChecklistOwner =
  | "ai-plan"   // AI agent generates the plan and executes
  | "human"     // taste / content / legal / commercial decision
  | "hybrid";   // AI drafts, human reviews & edits

/** Phases run in order. Don't start phase N until N-1 is green. */
export type ChecklistPhase =
  | "1-intake"
  | "2-brand"
  | "3-ia"
  | "4-copy"
  | "5-visual"
  | "6-seo"
  | "7-conversion"
  | "8-legal"
  | "9-launch";

export type ChecklistPlaybook =
  | "REMIX_PLAYBOOK"
  | "BRAND_AUDIT"
  | "AI_IMAGE_RULES"
  | "COPY_GUIDE"
  | "SEO_PLAYBOOK"
  | "PERFORMANCE_PLAYBOOK"
  | "INTAKE_BRIEF"
  | "IA_WIREFRAME_GUIDE"
  | "LEGAL_TRUST_GUIDE";

/** Legacy grouping (kept for any existing UI consumers). */
export type ChecklistGroupLegacy = "setup" | "brand" | "content" | "seo" | "quality";

/**
 * Every check id. Names are kebab-case and stable — UIs and reports key off them.
 * The original 30 ids from the v1 checklist are preserved at the top so any
 * existing consumers keep working.
 */
export type CheckId =
  // ── v1 ids (preserved) ────────────────────────────────────────────────
  | "wireframe-matches"
  | "trade-config-edited"
  | "palette-swapped"
  | "logo-generated"
  | "master-logo-rendering"
  | "master-logo-colorway-set"
  | "master-logo-binaries-embedded"
  | "master-emblem-binaries-embedded"
  | "master-tiles-binaries-embedded"
  | "master-monogram-binaries-embedded"
  | "master-wordmark-binaries-embedded"
  | "master-wordmark-ground-binaries-embedded"
  | "master-favicon-pwa-pack-embedded"
  | "master-share-pack-embedded"
  | "master-brand-bible-embedded"
  | "master-brand-kit-page-live"
  | "master-source-artwork-archived"
  | "master-logo-slot-map-followed"
  | "copy-unique"
  | "story-rewritten"
  | "brand-audit-passed"
  | "ai-images-generated"
  | "no-faces-no-people"
  | "perf-budget-green"
  | "navigation-lean"
  | "service-bespoke"
  | "service-areas-rendering"
  | "sister-backlinks-present"
  | "booking-routes-to-master-email"
  | "sitemap-generated"
  | "og-image-generated"
  | "favicon-generated"
  | "schema-localbusiness-present"
  | "leftover-drywall-references-zero"

  // ── Phase 1: Intake & Trade Foundation ───────────────────────────────
  | "intake-trade-master-brief"
  | "intake-service-catalogue"
  | "intake-service-area-spreadsheet"
  | "intake-sister-backlink-map"
  | "intake-compliance-docs"
  | "intake-founder-bio-and-work-photos"
  | "intake-competitor-audit"
  | "intake-color-and-mood-direction"
  | "intake-pricing-model-and-quote-policy"
  | "intake-warranty-and-guarantee-terms"
  | "intake-do-and-dont-list"

  // ── Phase 2: Brand & Identity Bespoking ──────────────────────────────
  | "brand-trade-config-fully-edited"
  | "brand-logo-colorway-verified"
  | "brand-trade-sub-wordmark-generated"
  | "brand-favicon-pwa-pack-regenerated"
  | "brand-share-pack-regenerated-with-trade-name"
  | "brand-voice-and-tone-doc-written"
  | "brand-zero-leftover-references-scan"
  | "brand-style-guide-contrast-matrix-green"
  | "brand-typography-pair-locked"
  | "brand-motion-and-micro-interactions-respected"

  // ── Phase 3: Information Architecture & Wireframes ───────────────────
  | "ia-sitemap-drafted"
  | "ia-page-wireframes-approved"
  | "ia-navigation-locked"
  | "ia-footer-architecture-locked"
  | "ia-booking-cta-entry-point-map"
  | "ia-url-slug-map-locked"
  | "ia-breadcrumb-strategy-defined"
  | "ia-mobile-flow-walked-on-real-device"

  // ── Phase 4: Copy & Storytelling ─────────────────────────────────────
  | "copy-founder-origin-story"
  | "copy-home-hero"
  | "copy-problems-we-solve"
  | "copy-why-us-differentiators"
  | "copy-process-method-walkthrough"
  | "copy-per-service-pages"
  | "copy-about-page"
  | "copy-faq-master-list-20-plus"
  | "copy-service-area-template-and-intros"
  | "copy-microcopy-pass"
  | "copy-cta-sales-pass"
  | "copy-anti-paraphrase-audit"
  | "copy-readability-grade-checked"

  // ── Phase 5: Visual Craft & AI Imagery ───────────────────────────────
  | "visual-hero-set-generated"
  | "visual-per-service-hero"
  | "visual-process-stage-imagery"
  | "visual-before-after-pairs"
  | "visual-ambient-backdrops"
  | "visual-gallery-min-12-shots"
  | "visual-og-card-trade-specific"
  | "visual-image-weight-audit"
  | "visual-alt-text-pass"
  | "visual-filename-audit"
  | "visual-format-modern-webp-avif"

  // ── Phase 6: SEO Depth ───────────────────────────────────────────────
  | "seo-keyword-research-mapped"
  | "seo-titles-and-metas-unique-per-page"
  | "seo-h1-h2-outline-semantic"
  | "seo-canonical-urls-set"
  | "seo-jsonld-organization-localbusiness"
  | "seo-jsonld-service-per-service-page"
  | "seo-jsonld-faqpage-where-applicable"
  | "seo-jsonld-breadcrumblist-everywhere"
  | "seo-jsonld-aboutpage"
  | "seo-area-pages-every-area-has-page"
  | "seo-area-pages-unique-intros"
  | "seo-area-pages-localbusiness-areaserved"
  | "seo-internal-linking-matrix"
  | "seo-sister-site-cross-linking"
  | "seo-external-backlink-targets"
  | "seo-sitemap-xml-complete"
  | "seo-robots-txt-sane"
  | "seo-og-twitter-cards-per-page"
  | "seo-nap-consistency-audit"
  | "seo-google-business-profile-claimed"
  | "seo-search-console-verified"
  | "seo-bing-webmaster-verified"
  | "seo-core-web-vitals-pass"
  | "seo-eeat-signals-rendered"

  // ── Phase 7: Conversion, Forms & Booking ─────────────────────────────
  | "conv-booking-modal-from-every-cta"
  | "conv-form-fields-minimized"
  | "conv-service-prefill-from-service-pages"
  | "conv-tel-link-on-every-page"
  | "conv-email-routes-to-master-inbox-tagged"
  | "conv-success-state-bespoke"
  | "conv-spam-protection-live"
  | "conv-form-analytics-events"
  | "conv-mobile-time-to-book-under-60s"

  // ── Phase 8: Legal, Trust & Compliance ───────────────────────────────
  | "legal-privacy-policy-accurate"
  | "legal-terms-of-service-trade-specific"
  | "legal-cookie-notice-if-needed"
  | "legal-license-insurance-wcb-rendered"
  | "legal-real-address-and-hours"
  | "legal-warranty-page"
  | "legal-accessibility-statement"

  // ── Phase 9: Quality Gate, Analytics & Launch ────────────────────────
  | "qa-wcag-aa-pass"
  | "qa-performance-budget-mobile-green"
  | "qa-cross-browser-smoke-test"
  | "qa-404-and-500-branded"
  | "qa-analytics-installed-and-events-firing"
  | "qa-conversion-goal-configured"
  | "qa-agency-credit-rendered"
  | "qa-master-version-pinned"
  | "qa-trade-added-to-trades-ts"
  | "qa-sister-network-rerendered"
  | "qa-prelaunch-human-walkthrough"
  | "qa-postlaunch-search-console-submit"
  | "qa-postlaunch-cwv-monitor-7-days";

export interface CheckItem {
  id: CheckId;
  /** Human-readable label for dashboards. */
  label: string;
  /** Plan-able description — rich enough for an AI agent to expand into a deep plan. */
  description: string;
  /** Phase ordering. Don't start phase N until N-1 is green. */
  phase: ChecklistPhase;
  /** Required to ship (P0), strongly recommended (P1), or polish (P2). */
  tier: ChecklistTier;
  /** Who owns this step. */
  owner: ChecklistOwner;
  /** Linked deep-dive playbook. AI consults this before planning. */
  playbook?: ChecklistPlaybook;
  /** Concrete inputs the operator must supply before the AI can plan this. */
  inputsNeeded?: string[];
  /** Legacy group, kept for any existing dashboard UI. */
  group: ChecklistGroupLegacy;
  /**
   * `true` if a deterministic check could verify this (regex scan, schema parse,
   * file presence). Currently informational only — no auto-runner is wired.
   */
  automated?: boolean;
}

export const CHECKLIST_PHASES = [
  "1-intake",
  "2-brand",
  "3-ia",
  "4-copy",
  "5-visual",
  "6-seo",
  "7-conversion",
  "8-legal",
  "9-launch",
] as const;

export const CHECKLIST_PHASE_META: Record<
  ChecklistPhase,
  { title: string; goal: string; gate: string }
> = {
  "1-intake": {
    title: "Intake & Trade Foundation",
    goal: "Capture everything bespoke about THIS trade before touching code.",
    gate: "Every intake doc uploaded; no fabricated facts downstream.",
  },
  "2-brand": {
    title: "Brand & Identity Bespoking",
    goal: "Every visible brand decision matched to THIS trade — zero leftover fingerprints.",
    gate: "Repo scan shows zero references to any prior trade; /brand + /style-guide green.",
  },
  "3-ia": {
    title: "Information Architecture & Wireframes",
    goal: "Pages and structure designed for THIS trade before any copy is written.",
    gate: "Sitemap, navigation, footer, URL map, and CTA entry-points are signed off.",
  },
  "4-copy": {
    title: "Copy & Storytelling",
    goal: "Every word bespoke. Zero paraphrasing between sister sites — Google penalizes it.",
    gate: "Anti-paraphrase audit passes; readability grade in target band; no Lorem.",
  },
  "5-visual": {
    title: "Visual Craft & AI Imagery",
    goal: "Photography ultra-realistic, no faces/people, every slot filled with trade-specific imagery.",
    gate: "Every image swapped, alt-texted, weight-audited, modern format.",
  },
  "6-seo": {
    title: "SEO Depth",
    goal: "Search is the moat. Every page indexable, schema-rich, locally relevant.",
    gate: "Per-page titles/metas/JSON-LD live; every area has its page; CWV pass.",
  },
  "7-conversion": {
    title: "Conversion, Forms & Booking",
    goal: "Make the booking flow frictionless from any CTA on any device.",
    gate: "Mobile time-to-book < 60s; events fire; emails land tagged.",
  },
  "8-legal": {
    title: "Legal, Trust & Compliance",
    goal: "Real business signals: privacy, terms, license, insurance, warranty, address, hours.",
    gate: "Every legal page accurate; trust signals rendered site-wide.",
  },
  "9-launch": {
    title: "Quality Gate, Analytics & Launch",
    goal: "Final QA, analytics live, sister network re-rendered, post-launch monitoring planned.",
    gate: "All P0 across phases 1–8 green; pre-launch walkthrough complete; sitemap submitted.",
  },
};

// ───────────────────────────────────────────────────────────────────────────
// THE CHECKLIST
// ───────────────────────────────────────────────────────────────────────────

export const REMIX_CHECKLIST: CheckItem[] = [
  // ════════════════════════════════════════════════════════════════════
  // PHASE 1 — INTAKE & TRADE FOUNDATION
  // ════════════════════════════════════════════════════════════════════
  {
    id: "intake-trade-master-brief",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Trade master brief uploaded",
    description:
      "Operator uploads a single brief covering: legal business name, trading name, kebab-case slug, parent category (interior-finishing | exterior | structural | mechanical | electrical | landscape | specialty), founding story (≥150 words), 3–5 USPs, pricing model (hourly | fixed | per-sqft | quote-based), scope of work (what they DO), explicit list of what they REFUSE to do, target customer profile, and 5-year vision. Without this brief, every downstream item is guesswork.",
    inputsNeeded: ["Trade brief document (.md / .pdf / .docx)"],
  },
  {
    id: "intake-service-catalogue",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Service catalogue uploaded",
    description:
      "Spreadsheet or doc listing every service + sub-service with: scope description, what's included, what's NOT included, materials/brands used, typical timeline, price band (low/mid/high), seasonality, prerequisites. This drives Phase 4 service-page copy and Phase 6 keyword mapping.",
    inputsNeeded: ["Service catalogue spreadsheet"],
  },
  {
    id: "intake-service-area-spreadsheet",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Service-area master spreadsheet uploaded",
    description:
      "Spreadsheet with EVERY city, town, hamlet, and neighborhood served — columns: name, type (city/town/neighborhood), priority rank (1=primary, 2=secondary, 3=opportunistic), distance/drive-time from HQ, lat/lng if available, notable landmarks or local references. Drives Phase 6 area-page generation (one page per area, never templated intros).",
    inputsNeeded: ["Service-area spreadsheet"],
  },
  {
    id: "intake-sister-backlink-map",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Sister-site backlink map confirmed",
    description:
      "From the master spreadsheet plan: which other Masters sites should backlink to this one and vice versa. Each row: source site, target site, anchor-text variants (3+), placement (footer | body | area-page widget). Drives Phase 6 cross-linking and Phase 9 sister-network re-render.",
    inputsNeeded: ["Backlink plan rows from master spreadsheet"],
  },
  {
    id: "intake-compliance-docs",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Compliance documents collected",
    description:
      "License number, WCB / workers' comp number, liability insurance certificate (carrier + policy #), trade-specific certifications, any required municipal permits language. Drives Phase 8 legal/trust render and Phase 6 E-E-A-T signals.",
    inputsNeeded: ["License #", "Insurance certificate", "WCB #", "Certification list"],
  },
  {
    id: "intake-founder-bio-and-work-photos",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Founder bio + real photos of work collected",
    description:
      "Short founder bio (≥120 words: years in trade, why they started, philosophy) + a folder of REAL photos of completed work (no faces, no people — per master image rule). Real work photos are gold for Phase 5 gallery and Phase 6 E-E-A-T.",
    inputsNeeded: ["Founder bio text", "Folder of work photos (no people)"],
  },
  {
    id: "intake-competitor-audit",
    phase: "1-intake", tier: "P1", owner: "hybrid", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Competitor audit (3 best-in-class sites)",
    description:
      "Pick 3 best-in-class sites in this trade (local + national). For each: full-page screenshot, what they do well (hero, trust, services, booking, copy tone), what they do poorly. Used to set the bar for Phase 3 IA and Phase 4 copy without copying.",
    inputsNeeded: ["3 competitor URLs"],
  },
  {
    id: "intake-color-and-mood-direction",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "BRAND_AUDIT",
    label: "Color & mood direction chosen",
    description:
      "One accent HSL chosen for this trade (overrides master default only if justified). Hero mood: residential | industrial | luxury | utilitarian. Photography palette: warm | cool | neutral. Documented in trade.config.ts comment.",
    inputsNeeded: ["Accent HSL", "Mood word", "Photography palette word"],
  },
  {
    id: "intake-pricing-model-and-quote-policy",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Pricing model & quote policy locked",
    description:
      "Are quotes free? In-person required? Same-day callback? Min job size? Travel charge outside primary area? Drives Phase 4 microcopy and Phase 7 booking modal copy.",
    inputsNeeded: ["Pricing & quote policy answers"],
  },
  {
    id: "intake-warranty-and-guarantee-terms",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Warranty & guarantee terms collected",
    description:
      "Years covered, what's covered, what's NOT, claim process, transferability. Drives Phase 8 warranty page + Phase 4 trust copy.",
    inputsNeeded: ["Warranty terms document"],
  },
  {
    id: "intake-do-and-dont-list",
    phase: "1-intake", tier: "P1", owner: "human", group: "setup",
    playbook: "COPY_GUIDE",
    label: "Voice do's & don'ts list",
    description:
      "5 things this trade SHOULD say (e.g. 'plumb-and-true'), 5 things it must NEVER say (jargon, slang, claims it can't back). Feeds Phase 2 voice doc and Phase 4 anti-paraphrase audit.",
    inputsNeeded: ["Do/don't list (10 lines)"],
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 2 — BRAND & IDENTITY BESPOKING
  // ════════════════════════════════════════════════════════════════════
  {
    id: "brand-trade-config-fully-edited",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true,
    playbook: "REMIX_PLAYBOOK",
    label: "trade.config.ts fully edited",
    description:
      "Identity (name, shortName, trade slug, tagline, location, founded, logoColorway), contact (email, phone, address, hours), services array (from intake catalogue), palette accent HSL, SEO title (≤60 char) and description (≤155 char), voice arrays. Every field traceable to a Phase 1 input.",
  },
  {
    id: "brand-logo-colorway-verified",
    phase: "2-brand", tier: "P0", owner: "hybrid", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    label: "Logo colorway verified at /brand",
    description:
      "logoColorway is one of black | navy | white. Verified against nav, footer, hero, OG, and favicon surfaces using /brand contrast preview. Per-surface overrides via <MasterLogo colorway='…' /> documented if used.",
  },
  {
    id: "brand-trade-sub-wordmark-generated",
    phase: "2-brand", tier: "P1", owner: "ai-plan", group: "brand",
    playbook: "REMIX_PLAYBOOK",
    label: "Per-trade sub-wordmark generated (if needed)",
    description:
      "If the master CMB lockup needs a trade-specific sub-wordmark (e.g. 'Cochrane Roofing' under the diamond), generate it via the trade-logo edge function using the master logo as reference. Save to /public/ and wire via trade-config override.",
  },
  {
    id: "brand-favicon-pwa-pack-regenerated",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    label: "Favicon + PWA pack matches chosen colorway",
    description:
      "Confirm the master favicon ladder (16/32/48/64/96/128/144/152/180/192/256/512) + reverse-colorway ladder are the right colorway for this trade and that index.html + site.webmanifest reference them. Re-generate only if colorway changed from master default.",
  },
  {
    id: "brand-share-pack-regenerated-with-trade-name",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    label: "Share pack carries trade name",
    description:
      "OG (1200×630), Twitter (1200×600), LinkedIn (1584×396), Instagram (1080×1080), Profile (400×400) cards all show this trade's name and tagline (not the master 'CMB' default). Wire og:image / twitter:image meta to navy 1200×630.",
  },
  {
    id: "brand-voice-and-tone-doc-written",
    phase: "2-brand", tier: "P0", owner: "hybrid", group: "brand",
    playbook: "COPY_GUIDE",
    label: "Voice & tone doc written for this trade",
    description:
      "1-pager: 5 do's, 5 don'ts, sample paragraph (3 sentences), 5 power words, 5 banned words. Lives at src/master/brand/<trade>/voice.md and is referenced by every Phase 4 copy plan.",
  },
  {
    id: "brand-zero-leftover-references-scan",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    label: "Zero leftover references from prior trade",
    description:
      "rg the entire repo (excluding /master/) for: previous trade name, previous services, previous city-quirks, previous accent hex/HSL, previous OG copy. Every hit must be 0 or explicitly justified. Run before Phase 4 begins.",
  },
  {
    id: "brand-style-guide-contrast-matrix-green",
    phase: "2-brand", tier: "P0", owner: "human", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    label: "/style-guide contrast matrix all-green",
    description:
      "Visit /style-guide. Every text-on-surface combo passes WCAG AA (4.5:1 body, 3:1 large). If any chip is red, adjust accent or surface tokens before continuing.",
  },
  {
    id: "brand-typography-pair-locked",
    phase: "2-brand", tier: "P1", owner: "human", group: "brand",
    playbook: "BRAND_AUDIT",
    label: "Typography pair locked (or master inherited)",
    description:
      "Default = master pair (Space Grotesk display + Jost body per memory). Override only with documented reason. If overridden, update index.html font links and trade.config typography block.",
  },
  {
    id: "brand-motion-and-micro-interactions-respected",
    phase: "2-brand", tier: "P1", owner: "human", group: "brand",
    playbook: "BRAND_AUDIT",
    label: "Motion philosophy respected",
    description:
      "Master cinematic motion (light reveals material, cloth-wipe transitions, reduced-motion respected) inherited unless trade explicitly demands a different feel. Document any deviation.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 3 — INFORMATION ARCHITECTURE & WIREFRAMES
  // ════════════════════════════════════════════════════════════════════
  {
    id: "ia-sitemap-drafted",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Sitemap drafted",
    description:
      "Pages: / (home), /services (index), /services/<slug> per service, /areas (index), /areas/<slug> per area cluster, /about, /story, /process, /gallery, /faq, /contact, /privacy, /terms, /warranty, /accessibility. Confirm count matches Phase 1 service catalogue + area spreadsheet.",
  },
  {
    id: "ia-page-wireframes-approved",
    phase: "3-ia", tier: "P0", owner: "hybrid", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Page wireframes approved",
    description:
      "Per page: section order, hero pattern, trust block placement, CTA placement, footer variant. Low-fi sketch or Figma is fine. Approval gates Phase 4 copy generation.",
  },
  {
    id: "ia-navigation-locked",
    phase: "3-ia", tier: "P0", owner: "human", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Navigation locked (≤6 top items)",
    description:
      "Top nav items, order, mobile drawer order. Master rule: 6 max. Resist 'one more link' — link from footer instead.",
  },
  {
    id: "ia-footer-architecture-locked",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Footer architecture locked",
    description:
      "Three-tier (per master memory): Top (brand + CTA), Middle (nav columns: services / areas / company / legal / sister sites), Bottom (license #, insurance #, NAP, agency credit, year).",
  },
  {
    id: "ia-booking-cta-entry-point-map",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Booking CTA entry-point map",
    description:
      "Document EVERY CTA in the site that opens the booking modal. Each row: page, section, button copy, pre-filled service slug (if any). Phase 7 audits against this map.",
  },
  {
    id: "ia-url-slug-map-locked",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "URL / slug map locked",
    description:
      "Clean, lowercase, hyphenated, keyword-aware slugs. No /page-2 patterns, no IDs in URLs. Trailing-slash policy (chosen + consistent) documented. Drives Phase 6 sitemap + canonicals.",
  },
  {
    id: "ia-breadcrumb-strategy-defined",
    phase: "3-ia", tier: "P1", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Breadcrumb strategy defined",
    description:
      "Where breadcrumbs render (services, areas, individual service/area pages). BreadcrumbList JSON-LD on every level-2+ page.",
  },
  {
    id: "ia-mobile-flow-walked-on-real-device",
    phase: "3-ia", tier: "P1", owner: "human", group: "quality",
    label: "Mobile flow walked on a real device",
    description:
      "Open the wireframes on a real phone (390px viewport target per memory). Tap every nav item, scroll every page. Confirm thumb-zones and safe-area before copy lands.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 4 — COPY & STORYTELLING
  // ════════════════════════════════════════════════════════════════════
  {
    id: "copy-founder-origin-story",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Founder origin story (≥250 words, bespoke)",
    description:
      "Drafted from Phase 1 founder bio. ≥250 words. This trade's pain points, this trade's wins. Voice matches Phase 2 doc. NEVER paraphrased from a sister site.",
    inputsNeeded: ["Founder bio (Phase 1)"],
  },
  {
    id: "copy-home-hero",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Home hero copy bespoke",
    description:
      "Headline (≤8 words, benefit-led), sub (≤22 words, who/where/proof), primary CTA (verb-led, 2–4 words), secondary CTA (text link). Pass: would a competitor's customer recognize this as obviously NOT from the template?",
  },
  {
    id: "copy-problems-we-solve",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Problems-we-solve block (5–8 trade-specific pains)",
    description:
      "Each pain: 4–8 word headline + 1 sentence elaboration. Pulled from real homeowner language for THIS trade (Phase 7 of competitor audit + founder interview).",
  },
  {
    id: "copy-why-us-differentiators",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Why-us block (3–5 true differentiators with proof)",
    description:
      "Each differentiator must be TRUE and PROVABLE for this trade (license #, years, warranty, certification, response time). No 'family-owned since forever' fluff unless backed.",
  },
  {
    id: "copy-process-method-walkthrough",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Process / method (3–6 stages, this trade's workflow)",
    description:
      "Each stage: name, 1-sentence what-happens, 1-sentence what-the-customer-does. Specific to this trade — drywall stages ≠ roofing stages ≠ plumbing stages.",
  },
  {
    id: "copy-per-service-pages",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Per-service page copy complete",
    description:
      "For each service: hero (headline + sub), scope, what's included, what's NOT included, materials, timeline, price band, FAQ × 5, CTA. Pulled from Phase 1 service catalogue. Each page ≥600 unique words for SEO.",
  },
  {
    id: "copy-about-page",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "About page copy",
    description:
      "Team/founder, values, license/insurance/WCB rendered, warranty summary, service area summary, link to story page.",
  },
  {
    id: "copy-faq-master-list-20-plus",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "FAQ master list (≥20 Q&A)",
    description:
      "Sourced from real customer questions for THIS trade (founder interview + 'People also ask' for top keywords). Each answer 40–120 words. Used by /faq page and as FAQPage JSON-LD on relevant service pages.",
  },
  {
    id: "copy-service-area-template-and-intros",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Service-area template + per-cluster intros",
    description:
      "ONE area-page template (sections), but each area gets a UNIQUE 80–150-word intro referencing local landmarks/neighborhoods from Phase 1 spreadsheet. NEVER ship the same intro on multiple area pages — Google will demote.",
  },
  {
    id: "copy-microcopy-pass",
    phase: "4-copy", tier: "P1", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Microcopy pass (forms, buttons, empty/success/404)",
    description:
      "Form labels, placeholders, helper text, button text, empty states, success states, 404 + 500 pages, error toasts. All in voice. No 'Submit' or 'Click here'.",
  },
  {
    id: "copy-cta-sales-pass",
    phase: "4-copy", tier: "P1", owner: "hybrid", group: "content",
    playbook: "COPY_GUIDE",
    label: "Sales-copy pass (AIDA + 'so what?')",
    description:
      "Walk every CTA: scored against AIDA (Attention/Interest/Desire/Action). Walk every section: 'so what?' test — does the user know why they should care by line 3?",
  },
  {
    id: "copy-anti-paraphrase-audit",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content", automated: true,
    playbook: "COPY_GUIDE",
    label: "Anti-paraphrase audit vs. sister sites",
    description:
      "For every long-form block (hero sub, why-us, process, about, story, FAQ): diff against sister sites in src/master/trades.ts. Any block with >40% n-gram overlap rewritten. Google's duplicate-content filter is unforgiving.",
  },
  {
    id: "copy-readability-grade-checked",
    phase: "4-copy", tier: "P1", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Readability grade in band (Flesch 60–75)",
    description:
      "Body copy in the 60–75 Flesch reading-ease band (8th–10th grade). Marketing copy can dip lower for punch; legal pages can go higher.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 5 — VISUAL CRAFT & AI IMAGERY
  // ════════════════════════════════════════════════════════════════════
  {
    id: "visual-hero-set-generated",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Hero image set generated (3–5 candidates → 1)",
    description:
      "Generate 3–5 hero candidates per the master AI rules: ultra-realistic, no faces, no people, trade-specific subject (drywall = smooth wall + light, roofing = shingles + sky, plumbing = chrome + water bead). Pick one.",
  },
  {
    id: "visual-per-service-hero",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Per-service hero generated",
    description:
      "Each service page gets its own hero. Same rules. Same mood. Different subject.",
  },
  {
    id: "visual-process-stage-imagery",
    phase: "5-visual", tier: "P1", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Process / method imagery (one per stage)",
    description:
      "Macro detail shots of each process stage. No people. Match master photography palette.",
  },
  {
    id: "visual-before-after-pairs",
    phase: "5-visual", tier: "P0", owner: "hybrid", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Before/after pairs per service",
    description:
      "Real photos preferred (from Phase 1 founder folder). AI fallback only if no real options, and clearly marked as illustrative.",
  },
  {
    id: "visual-ambient-backdrops",
    phase: "5-visual", tier: "P1", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Ambient backdrops / parallax dividers",
    description:
      "Section dividers and parallax sections per master spec (130% height, -15% top offset per memory).",
  },
  {
    id: "visual-gallery-min-12-shots",
    phase: "5-visual", tier: "P1", owner: "human", group: "content",
    label: "Gallery: ≥12 finished-work shots",
    description:
      "Real photos of completed work. Sorted by service category. Each captioned with location (city only, never address) and service.",
  },
  {
    id: "visual-og-card-trade-specific",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "OG card hero swapped to trade-specific",
    description:
      "OG / Twitter / LinkedIn card hero imagery is from THIS trade, not the master template default.",
  },
  {
    id: "visual-image-weight-audit",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "PERFORMANCE_PLAYBOOK",
    label: "Every image < 300KB",
    description:
      "Scan /public + /src/assets. Any image >300KB compressed or re-sized. Hero may go to 500KB only if AVIF.",
  },
  {
    id: "visual-alt-text-pass",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "AI_IMAGE_RULES",
    label: "Alt-text pass (every image)",
    description:
      "Every <img> has descriptive alt. alt='' allowed only for purely decorative. Alt copy includes keyword + context, not stuffing.",
  },
  {
    id: "visual-filename-audit",
    phase: "5-visual", tier: "P1", owner: "ai-plan", group: "quality", automated: true,
    label: "Filename audit",
    description:
      "All assets kebab-case, descriptive. No image1.png, no IMG_3492.jpg, no hero-final-FINAL-v2.jpg.",
  },
  {
    id: "visual-format-modern-webp-avif",
    phase: "5-visual", tier: "P1", owner: "ai-plan", group: "quality", automated: true,
    playbook: "PERFORMANCE_PLAYBOOK",
    label: "Modern image formats (WebP / AVIF)",
    description:
      "Photos served as WebP or AVIF with JPG fallback where needed. PNG only for transparency. SVG for icons/marks.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 6 — SEO DEPTH (the moat)
  // ════════════════════════════════════════════════════════════════════
  {
    id: "seo-keyword-research-mapped",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Keyword research mapped to pages",
    description:
      "Per service: top 10 head terms (e.g. 'roof replacement Cochrane') + 30 long-tails ('asphalt shingle roof replacement cost Cochrane'). Mapped to a specific page. Per area: top 5 'service + area' patterns. Source: founder interview, competitor audit, 'People also ask', autocomplete.",
  },
  {
    id: "seo-titles-and-metas-unique-per-page",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Unique <title> + meta description per page",
    description:
      "Title ≤60 chars, primary keyword first half, brand at end. Meta description ≤155 chars, benefit-led, includes city. Zero duplicates across the sitemap. Verified by scan.",
  },
  {
    id: "seo-h1-h2-outline-semantic",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Semantic H1 / H2 outline per page",
    description:
      "Exactly one H1 per page (matches keyword intent). H2s map to sections. No skipped levels (no H1→H3). Verified by scan.",
  },
  {
    id: "seo-canonical-urls-set",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Canonical URL set on every page",
    description:
      "<link rel='canonical'> on every page pointing to itself (absolute URL). Trailing-slash policy consistent with sitemap.",
  },
  {
    id: "seo-jsonld-organization-localbusiness",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "JSON-LD: Organization + LocalBusiness on home",
    description:
      "Organization (name, url, logo, sameAs[]) + LocalBusiness (name, address, geo, telephone, openingHours, priceRange) on home page. Validated against schema.org with Rich Results Test.",
  },
  {
    id: "seo-jsonld-service-per-service-page",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "JSON-LD: Service on every service page",
    description:
      "Service schema per service page: name, provider (LocalBusiness ref), areaServed, serviceType, description, offers (priceRange).",
  },
  {
    id: "seo-jsonld-faqpage-where-applicable",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "JSON-LD: FAQPage on /faq + service pages",
    description:
      "FAQPage schema with the service-relevant Q&A subset on each service page; full master FAQ on /faq.",
  },
  {
    id: "seo-jsonld-breadcrumblist-everywhere",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "JSON-LD: BreadcrumbList on every level-2+ page",
    description:
      "BreadcrumbList on /services/<slug>, /areas/<slug>, and other deep pages. Matches visible breadcrumbs from Phase 3.",
  },
  {
    id: "seo-jsonld-aboutpage",
    phase: "6-seo", tier: "P1", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "JSON-LD: AboutPage on /about",
    description:
      "AboutPage schema referencing the LocalBusiness and the founder (Person sub-entity if comfortable).",
  },
  {
    id: "seo-area-pages-every-area-has-page",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Every area from the spreadsheet has a page",
    description:
      "Cross-check Phase 1 area spreadsheet against /areas/* routes. 100% coverage. Priority-1 areas get extra-rich pages (gallery, testimonial, neighborhood-specific FAQ).",
  },
  {
    id: "seo-area-pages-unique-intros",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Area pages have UNIQUE intros (no duplicates)",
    description:
      "n-gram diff every area page intro against every other. >40% overlap = rewrite. References real local landmarks from Phase 1 spreadsheet.",
  },
  {
    id: "seo-area-pages-localbusiness-areaserved",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Area pages: LocalBusiness with areaServed",
    description:
      "Each area page emits LocalBusiness JSON-LD with areaServed set to the specific area (not the catch-all city).",
  },
  {
    id: "seo-internal-linking-matrix",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Internal linking matrix",
    description:
      "Every service ↔ every relevant area (drives long-tail). Every service → 2 sibling services ('related services'). Every area → 3 nearest areas. Documented as a matrix; rendered as 'Related' widgets.",
  },
  {
    id: "seo-sister-site-cross-linking",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Sister-site cross-linking per master plan",
    description:
      "Footer + body widget link to sister Masters sites per Phase 1 backlink map, using approved anchor text. Updates `src/master/trades.ts` with this site's URL once live.",
  },
  {
    id: "seo-external-backlink-targets",
    phase: "6-seo", tier: "P1", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "External backlink target list (10 directories)",
    description:
      "Submission checklist: Google Business Profile, Yelp, BBB, HomeStars, Houzz, trade-specific dirs (e.g. roofing contractor association). Owner submits within 7 days of launch.",
  },
  {
    id: "seo-sitemap-xml-complete",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "sitemap.xml complete",
    description:
      "Every page + every service + every area in /sitemap.xml with accurate lastmod. No 404s. Submitted to Search Console in Phase 9.",
  },
  {
    id: "seo-robots-txt-sane",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "robots.txt sane",
    description:
      "Allow all by default, disallow /brand and any internal /admin routes, reference sitemap. No accidental Disallow: /.",
  },
  {
    id: "seo-og-twitter-cards-per-page",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "OG / Twitter cards per page (not just home)",
    description:
      "Every page has its own og:title, og:description, og:image, twitter:* tags. Service pages use service hero; area pages use area-specific imagery.",
  },
  {
    id: "seo-nap-consistency-audit",
    phase: "6-seo", tier: "P0", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "NAP consistency audit",
    description:
      "Name / Address / Phone IDENTICAL across site footer, contact page, schema markup, GBP, and all directory listings. Local SEO penalizes drift.",
  },
  {
    id: "seo-google-business-profile-claimed",
    phase: "6-seo", tier: "P0", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Google Business Profile claimed/verified",
    description:
      "Profile claimed, primary + secondary categories chosen, services listed, hours accurate, ≥10 photos uploaded, Q&A seeded with 5 entries.",
  },
  {
    id: "seo-search-console-verified",
    phase: "6-seo", tier: "P0", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Google Search Console verified",
    description:
      "Property added (domain or URL prefix), ownership verified, sitemap submitted (Phase 9), Core Web Vitals report enabled.",
  },
  {
    id: "seo-bing-webmaster-verified",
    phase: "6-seo", tier: "P2", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Bing Webmaster verified",
    description:
      "Often imported from GSC in one click. Free traffic — do it.",
  },
  {
    id: "seo-core-web-vitals-pass",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "PERFORMANCE_PLAYBOOK",
    label: "Core Web Vitals pass on mobile",
    description:
      "LCP <2.5s, INP <200ms, CLS <0.1 on mobile (Lighthouse + PageSpeed Insights). CWV is a ranking factor, not a nice-to-have.",
  },
  {
    id: "seo-eeat-signals-rendered",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "E-E-A-T signals rendered site-wide",
    description:
      "License #, insurance #, WCB #, years in business, real address, real phone, founder bio, photos of REAL work, warranty page, customer testimonials with name + city. All visible, not buried.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 7 — CONVERSION, FORMS & BOOKING
  // ════════════════════════════════════════════════════════════════════
  {
    id: "conv-booking-modal-from-every-cta",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Booking modal opens from every documented CTA",
    description:
      "Audit Phase 3 CTA entry-point map. Click every CTA listed; modal opens. Per master memory: exactly ONE booking-modal instance in the app, mounted at the root.",
  },
  {
    id: "conv-form-fields-minimized",
    phase: "7-conversion", tier: "P0", owner: "human", group: "quality",
    label: "Form fields minimized to true must-haves",
    description:
      "Every field justified by 'we will not respond well without this'. Default = name, phone OR email, service, free-text. Anything else moved to step 2 or post-booking.",
  },
  {
    id: "conv-service-prefill-from-service-pages",
    phase: "7-conversion", tier: "P1", owner: "ai-plan", group: "quality", automated: true,
    label: "Service pre-fills when launched from a service page",
    description:
      "Booking modal opened from /services/<slug> arrives with service pre-selected. Reduces friction by one tap.",
  },
  {
    id: "conv-tel-link-on-every-page",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "tel: link on every page (large mobile tap target)",
    description:
      "Header phone + footer phone are tel: links. Mobile tap target ≥44×44px. Phone visible above the fold on home and contact.",
  },
  {
    id: "conv-email-routes-to-master-inbox-tagged",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Email routes to master inbox tagged with siteSlug",
    description:
      "Form submissions land in central CMB inbox with site slug in subject + body, so the team knows which trade and which page produced the lead.",
  },
  {
    id: "conv-success-state-bespoke",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality",
    label: "Success state bespoke",
    description:
      "Per master memory: signature 'dirt-to-clean' submission animation respected. Success copy reassures with NEXT-STEP clarity ('we'll call within 4 business hours').",
  },
  {
    id: "conv-spam-protection-live",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Spam protection (honeypot or hCaptcha)",
    description:
      "Honeypot field minimum. hCaptcha if spam volume warrants. Don't lose leads to spam — but don't add captcha unless needed.",
  },
  {
    id: "conv-form-analytics-events",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Form analytics events fire (open/start/submit/success)",
    description:
      "Events: modal_open, form_start (first field touched), form_submit, form_success, form_error. Lets us tune funnel later.",
  },
  {
    id: "conv-mobile-time-to-book-under-60s",
    phase: "7-conversion", tier: "P0", owner: "human", group: "quality",
    label: "Mobile time-to-book < 60 seconds",
    description:
      "Time the flow on a real phone with a real thumb. Land → click CTA → fill → submit. <60s end-to-end. If not, simplify form, not the design.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 8 — LEGAL, TRUST & COMPLIANCE
  // ════════════════════════════════════════════════════════════════════
  {
    id: "legal-privacy-policy-accurate",
    phase: "8-legal", tier: "P0", owner: "hybrid", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Privacy policy reflects actual data + processors",
    description:
      "Lists actual data collected (name, phone, email, message, IP via analytics), actual processors (Lovable Cloud / Supabase, analytics provider, email provider), retention period, deletion request process, GDPR/PIPEDA basics if applicable.",
  },
  {
    id: "legal-terms-of-service-trade-specific",
    phase: "8-legal", tier: "P0", owner: "human", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Terms of service trade-specific",
    description:
      "Scope of work, change-order policy, payment terms, warranty reference, dispute resolution. Generic ToS is worse than none.",
  },
  {
    id: "legal-cookie-notice-if-needed",
    phase: "8-legal", tier: "P1", owner: "ai-plan", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Cookie notice if analytics/marketing pixels run",
    description:
      "Skip if site uses zero non-essential cookies. Otherwise: minimal, dismissible, links to privacy policy.",
  },
  {
    id: "legal-license-insurance-wcb-rendered",
    phase: "8-legal", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "LEGAL_TRUST_GUIDE",
    label: "License # + insurance # + WCB # rendered",
    description:
      "Footer + about page + contact page. Real numbers, not 'Licensed & Insured'.",
  },
  {
    id: "legal-real-address-and-hours",
    phase: "8-legal", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Real address + business hours",
    description:
      "Real local address (or service-area + 'by appointment' if no storefront). Real hours. Matches GBP and schema. Avoids Google's 'business may not exist' demotion.",
  },
  {
    id: "legal-warranty-page",
    phase: "8-legal", tier: "P0", owner: "ai-plan", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Warranty page with specifics",
    description:
      "Years covered, what's covered, what's NOT covered, claim process, transferability. From Phase 1 warranty terms.",
  },
  {
    id: "legal-accessibility-statement",
    phase: "8-legal", tier: "P1", owner: "ai-plan", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Accessibility statement (WCAG AA target)",
    description:
      "Page declaring WCAG AA target, known limitations, contact for accessibility issues. 200 words is enough.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 9 — QUALITY GATE, ANALYTICS & LAUNCH
  // ════════════════════════════════════════════════════════════════════
  {
    id: "qa-wcag-aa-pass",
    phase: "9-launch", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "WCAG AA pass",
    description:
      "Contrast 4.5:1 body / 3:1 large; visible focus rings; alt text; keyboard nav full coverage; modal ARIA (role=dialog, aria-modal, focus trap, Esc to close); prefers-reduced-motion respected.",
  },
  {
    id: "qa-performance-budget-mobile-green",
    phase: "9-launch", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "PERFORMANCE_PLAYBOOK",
    label: "Performance budget green on mobile + desktop",
    description:
      "Lighthouse mobile ≥ 90 on Performance / Accessibility / Best Practices / SEO. LCP <2.5s, CLS <0.1, INP <200ms. Repeat on desktop (≥95 expected).",
  },
  {
    id: "qa-cross-browser-smoke-test",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Cross-browser smoke test",
    description:
      "Safari iOS, Chrome Android, Safari macOS, Chrome desktop, Firefox desktop. Open every page, tap every CTA. Note any visual regressions.",
  },
  {
    id: "qa-404-and-500-branded",
    phase: "9-launch", tier: "P1", owner: "ai-plan", group: "quality",
    label: "404 + 500 pages branded",
    description:
      "Match brand. Helpful copy. Link back to home + popular services.",
  },
  {
    id: "qa-analytics-installed-and-events-firing",
    phase: "9-launch", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Analytics installed + events firing",
    description:
      "Events: page_view, cta_click, modal_open, form_start, form_submit, form_success, phone_tap. Verified live. No PII in event payloads.",
  },
  {
    id: "qa-conversion-goal-configured",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Conversion goal configured",
    description:
      "form_success = primary conversion. phone_tap = secondary. Goals visible in analytics dashboard from day 1.",
  },
  {
    id: "qa-agency-credit-rendered",
    phase: "9-launch", tier: "P1", owner: "ai-plan", group: "quality", automated: true,
    label: "Agency credit (VeePo) rendered",
    description:
      "Per existing brand memory — agency credit links to veepo.ca/case-studies in the documented locations.",
  },
  {
    id: "qa-master-version-pinned",
    phase: "9-launch", tier: "P1", owner: "ai-plan", group: "quality", automated: true,
    label: "Master version pinned in VERSION.ts",
    description:
      "This remix records which master version it forked from. Lets us diff and forward-port master improvements.",
  },
  {
    id: "qa-trade-added-to-trades-ts",
    phase: "9-launch", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Trade added to src/master/trades.ts with live URL",
    description:
      "Slug, name, category, adjacent[], live URL, blurb. Sister-site widgets across the network now surface this site.",
  },
  {
    id: "qa-sister-network-rerendered",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Sister network re-rendered so backlinks go live",
    description:
      "Every sister site re-builds and re-deploys (or fetches the trades registry at runtime) so the new backlinks land. Don't ship a one-way link.",
  },
  {
    id: "qa-prelaunch-human-walkthrough",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Pre-launch human walkthrough on real mobile",
    description:
      "Operator opens every page on a real phone, taps every CTA, submits every form (with [TEST] prefix). Treats it like a customer. Last chance to catch what scripts can't.",
  },
  {
    id: "qa-postlaunch-search-console-submit",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Post-launch: submit sitemap + request indexing",
    description:
      "Submit sitemap.xml in Search Console. Request indexing on the top 5 commercial pages (home + 4 top services). Same in Bing.",
  },
  {
    id: "qa-postlaunch-cwv-monitor-7-days",
    phase: "9-launch", tier: "P1", owner: "human", group: "quality",
    label: "Post-launch: monitor Core Web Vitals for 7 days",
    description:
      "Field data takes ~28 days to populate, but origin-level CWV in Search Console flags regressions early. Check daily for the first week.",
  },

  // ════════════════════════════════════════════════════════════════════
  // LEGACY v1 ITEMS (preserved for any existing UI consumer; superseded
  // above but kept so removing them doesn't break a consumer keying off id)
  // ════════════════════════════════════════════════════════════════════
  { id: "trade-config-edited", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, playbook: "REMIX_PLAYBOOK", label: "trade.config.ts updated", description: "Identity, services, and palette accent reflect the new trade. (Superseded by brand-trade-config-fully-edited.)" },
  { id: "logo-generated", phase: "2-brand", tier: "P1", owner: "ai-plan", group: "setup", automated: true, playbook: "REMIX_PLAYBOOK", label: "Trade logo generated", description: "AI-generated wordmark from the master CMB logo, saved to /public/. (Superseded by brand-trade-sub-wordmark-generated.)" },
  { id: "favicon-generated", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Favicon + PWA icons generated", description: "Derived from the trade logo. (Superseded by brand-favicon-pwa-pack-regenerated.)" },
  { id: "og-image-generated", phase: "5-visual", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "OG / social image generated", description: "Master Builders OG card embedded. (Superseded by visual-og-card-trade-specific + brand-share-pack-regenerated-with-trade-name.)" },
  { id: "master-logo-rendering", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master CMB logo rendering in nav + footer", description: "<MasterLogo slot='nav'> and slot='footer' resolve to a master file or per-trade override (see LOGO_USAGE.md)." },
  { id: "master-logo-colorway-set", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Logo colorway chosen", description: "TRADE.identity.logoColorway is one of: black | navy | white." },
  { id: "master-logo-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master logo binaries embedded (chosen colorway)", description: "Real PNGs in /src/master/assets/logo/ for the active colorway — no aliases." },
  { id: "master-emblem-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master emblem binaries embedded", description: "Square emblem-only PNGs (100/200/400/800/1200/2400) wired through <MasterLogo slot='emblem'>." },
  { id: "master-tiles-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master tiles binaries embedded", description: "Exploded/tiled emblem PNGs wired through <MasterLogo slot='tiles'>." },
  { id: "master-monogram-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master monogram binaries embedded", description: "Handwritten 'MB' signature PNGs wired through <MasterLogo slot='monogram'>." },
  { id: "master-wordmark-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master wordmark binaries embedded", description: "Pure-typography wordmark PNGs wired through <MasterLogo slot='wordmark'>." },
  { id: "master-wordmark-ground-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master wordmark Ground variant embedded", description: "Drafted plumb-line + base rule wordmark PNGs wired through <MasterLogo slot='wordmarkGround'>." },
  { id: "master-favicon-pwa-pack-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Favicon + PWA icon pack embedded", description: "Full navy MB-diamond ladder + white reverse-colorway ladder in /public/ with prefers-color-scheme media queries." },
  { id: "master-share-pack-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Social share + OG + profile pack embedded", description: "10-file share pack in /public/share/ with typed registry at src/master/brand/share-pack.ts." },
  { id: "master-brand-bible-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Brand bible embedded", description: "Canonical brand contract at src/master/brand/BRAND_BIBLE.md." },
  { id: "master-brand-kit-page-live", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "/brand brand-kit page live", description: "Internal brand-kit surface at /brand renders boards, swatches, mark families, share pack, clear-space + minimum-size demos. noindex." },
  { id: "master-source-artwork-archived", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master source artwork archived", description: "Both canonical compositions archived to src/master/assets/logo/source/. Archive-only; never <img>'d." },
  { id: "master-logo-slot-map-followed", phase: "2-brand", tier: "P0", owner: "human", group: "setup", label: "New logo surfaces follow the slot map", description: "Any new component using a logo is added to LOGO_SLOT_MAP.md and rendered via <MasterLogo slot='...'/> — never <img src='.../cmb-...png'> direct." },
  { id: "wireframe-matches", phase: "3-ia", tier: "P1", owner: "human", group: "brand", playbook: "REMIX_PLAYBOOK", label: "Wireframe matches the master pattern", description: "Hero → trust → services → process → before/after → FAQ → CTA. (Superseded by ia-page-wireframes-approved.)" },
  { id: "palette-swapped", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true, playbook: "BRAND_AUDIT", label: "Palette accent swapped", description: "One accent only. No leftover drywall accent values." },
  { id: "leftover-drywall-references-zero", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true, playbook: "BRAND_AUDIT", label: "Zero leftover 'drywall' references", description: "Codebase scan finds no stale references from the source template. (Superseded by brand-zero-leftover-references-scan.)" },
  { id: "brand-audit-passed", phase: "2-brand", tier: "P0", owner: "human", group: "brand", playbook: "BRAND_AUDIT", label: "Manual brand audit passed", description: "Walk the BRAND_AUDIT checklist; site feels like CMB." },
  { id: "copy-unique", phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content", playbook: "COPY_GUIDE", label: "Copy is unique to this trade", description: "No duplicated paragraphs from sister sites. (Superseded by copy-anti-paraphrase-audit.)" },
  { id: "story-rewritten", phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content", playbook: "COPY_GUIDE", label: "Story is bespoke", description: "Founding story / process / pain points are this trade's. (Superseded by copy-founder-origin-story.)" },
  { id: "service-bespoke", phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content", playbook: "COPY_GUIDE", label: "Services are bespoke", description: "Service cards reflect actual offerings. (Superseded by copy-per-service-pages.)" },
  { id: "ai-images-generated", phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content", playbook: "AI_IMAGE_RULES", label: "AI images generated for every photo slot", description: "Hero, before/afters, ambient backdrops — all replaced." },
  { id: "no-faces-no-people", phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content", automated: true, playbook: "AI_IMAGE_RULES", label: "No faces, no people in any image", description: "Filename + alt-text scan catches violations." },
  { id: "service-areas-rendering", phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "Service-area pages render", description: "/areas/* routes return all areas with LocalBusiness schema. (Superseded by seo-area-pages-every-area-has-page.)" },
  { id: "sister-backlinks-present", phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "Sister-site backlinks render", description: "Footer + area pages cross-link to deployed sister sites." },
  { id: "sitemap-generated", phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "sitemap.xml + robots.txt complete", description: "Every page + every area is in the sitemap." },
  { id: "schema-localbusiness-present", phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "LocalBusiness JSON-LD present", description: "On home + every service-area page." },
  { id: "navigation-lean", phase: "3-ia", tier: "P0", owner: "human", group: "quality", label: "Navigation is lean", description: "Top nav has ≤6 items; mobile menu is fast." },
  { id: "perf-budget-green", phase: "9-launch", tier: "P0", owner: "ai-plan", group: "quality", automated: true, playbook: "PERFORMANCE_PLAYBOOK", label: "Performance budget green", description: "Lighthouse mobile ≥ 90; LCP < 2.5s; CLS < 0.1." },
  { id: "booking-routes-to-master-email", phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true, label: "Booking routes to master email", description: "Form submissions reach the central CMB inbox with siteSlug tag." },
];

// ───────────────────────────────────────────────────────────────────────────
// HELPERS
// ───────────────────────────────────────────────────────────────────────────

export const CHECKLIST_GROUPS = ["setup", "brand", "content", "seo", "quality"] as const;
export type ChecklistGroup = typeof CHECKLIST_GROUPS[number];

export const getChecklistByPhase = (phase: ChecklistPhase) =>
  REMIX_CHECKLIST.filter((c) => c.phase === phase);

export const getChecklistByTier = (tier: ChecklistTier) =>
  REMIX_CHECKLIST.filter((c) => c.tier === tier);

export const getChecklistByOwner = (owner: ChecklistOwner) =>
  REMIX_CHECKLIST.filter((c) => c.owner === owner);

/** Counts for dashboard headers. */
export const checklistStats = () => {
  const byPhase: Record<ChecklistPhase, number> = {
    "1-intake": 0, "2-brand": 0, "3-ia": 0, "4-copy": 0, "5-visual": 0,
    "6-seo": 0, "7-conversion": 0, "8-legal": 0, "9-launch": 0,
  };
  const byTier: Record<ChecklistTier, number> = { P0: 0, P1: 0, P2: 0 };
  for (const c of REMIX_CHECKLIST) {
    byPhase[c.phase]++;
    byTier[c.tier]++;
  }
  return { total: REMIX_CHECKLIST.length, byPhase, byTier };
};
