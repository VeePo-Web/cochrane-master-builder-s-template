## Plan: Embed `4._cochrane_masters_all_115_ideal_customer_brain.xlsx` as the canonical ICP companion to the Master Plan

Third file in the Cochrane family-of-sites paired set. Same 116-row spine, joined on `Master Row` to v1.0 (Master Plan / SEO) and v2.0 (Services & Pricing). This file supplies the **per-site Ideal Customer Profile (ICP) brain** — who the buyer is, what they want, what they fear, the language to speak in.

### Where it lives

```
src/master/knowledge/
  source-documents/brands/cochrane-master-builders/strategy/
    4.0_cochrane_masters_all_115_ideal_customer_brain.xlsx        ← verbatim binary
    4.0_cochrane_masters_all_115_ideal_customer_brain.source.md   ← verbatim 1:1 markdown mirror
  partner-documents/brands/cochrane-master-builders/strategy/
    4.0_cochrane_masters_all_115_ideal_customer_brain.partner.md
```

(Filename normalized to `4.0_…` to match the v1.0 / v2.0 numbering convention already in the index.)

### Sheet inventory (1 sheet · 116 rows × 3 cols, captured verbatim)

`Ideal Customers` columns:

1. **Master Row** — join key back to `01 Master Tracker` of v1.0 and to v2.0 Services & Pricing.
2. **Recommended Domain** — same `.ca` domain as the other two files (must stay in sync).
3. **Ideal Customer Description** — long-form narrative ICP for that specific site (WHO THEY ARE, what they want, fears, language patterns, etc.).

### Partner document — what it tells the system

- **Title:** Cochrane Masters — All-115 Ideal Customer Brain Companion.
- **Category:** brands/cochrane-master-builders → strategy → ICP brain (third file in the paired set).
- **Purpose:** Canonical per-site Ideal Customer Profile narrative. The "voice + emotion + intent" leg of the remix tripod. v1.0 = positioning/SEO/linking, v2.0 = offers/pricing/compliance, **v4.0 = who you're talking to and how to speak to them**.
- **What it influences:**
  - Hero copy + sub-hero promise on every spin-off site.
  - Section headlines, microcopy, and value-prop framing.
  - Tone of voice on a per-site basis (Mothers vs Grandfathers vs Subcontractors etc., layered with cross-brand Cochrane ICP docs).
  - Trust language, fear-reversal copy, objection handling.
  - Form labels, CTA verbs, confirmation states.
  - FAQ topic selection and phrasing (pairs with FAQ-SEO persona).
  - Image direction prompts (the ICP narrative shapes mood/subject choices, within the brand's image rules).
  - Lead-qualification tone (how the quote form *feels*, not just what it asks).
- **Triggers (when AI should consult this):** any prompt about *who is this for, ICP, ideal customer, target buyer, persona for site X, voice, tone, emotional driver, fear, objection, hero copy, headline, subhead, microcopy, CTA wording, trust language, value prop, message, narrative, pain point, "who they are", buyer intent, audience, segment.*
- **Adaptation rules / firewall:**
  - Brand context = Cochrane Master Builders. **No** automotive vocabulary firewall.
  - The narrative is **per-site**, not a master ICP — never blend rows. Always look up by `Master Row`.
  - Use the row's narrative as the **voice source**, not as ship-ready copy. All copy must still pass the cross-brand storytelling/copywrite persona and the brand's voice memories before going live.
  - Cross-brand Cochrane ICP docs (`1.4.1` Subcontractor, `1.4.2` Mothers, `1.4.3` Grandfathers) sit *above* this file when their archetype is the primary buyer for the site — this file is the per-site nuance layer on top.
  - **Join discipline:** any per-site copywriting work must reference the same `Master Row` across v1.0 + v2.0 + v4.0. Drift in `Recommended Domain` between files = Sync Discrepancy flag.
  - Snapshot: treat the narratives as "indicative ICP, audited [date]"; flag if the row contradicts a more recent ICP doc.
- **Mode-OS pairing:**
  - **Architect** uses this when designing the IA / page structure for a new spin-off (the ICP narrative drives section ordering and what to put above the fold).
  - **Mapper** can render per-cluster ICP affinity diagrams or per-site emotional-journey flows.
  - **Auditor** pressure-tests generated copy against (a) the row's ICP narrative (does the headline actually speak to this person?) and (b) the join across v1.0/v2.0/v4.0. Tone misalignment with the ICP narrative = High bug.
- **Dependencies:** v1.0 Master Plan, v2.0 Services & Pricing, Cochrane brand-identity docs (Family Legacy Standard, Foundations report), Cochrane ICP archetype docs (`1.4.1` / `1.4.2` / `1.4.3`), Cochrane bespoke/traditional UX phase report, cross-brand storytelling / round-two copywrite persona, FAQ-SEO persona, SEO Virtuoso, 3-mode OS personas.
- **Guidance type:** Brand-global for Cochrane Master Builders only.
- **Practical examples:**
  - *"Write the hero for the Basement Suite Masters site."* → Pull that row's ICP narrative as the voice + emotional driver source; structure the headline around their stated WHO/WANTS/FEARS.
  - *"What FAQs should this site have?"* → Mine the row's narrative for fears/objections, then route through the FAQ-SEO persona for structure.
  - *"Pick a hero image direction."* → Use the ICP narrative to set mood/subject; image rules from Cochrane brand-identity still bind.
  - *"Tone-check this draft."* → Compare draft against the row's narrative; surface mismatches as Auditor findings.

### INDEX update

Update the existing **Strategy** table for Cochrane and the family-of-sites callout:

- Extend the callout to name **three paired files** joined on `Master Row` (v1.0 = SEO/positioning, v2.0 = services/pricing/compliance, v4.0 = ICP brain). All three must be consulted together for any new spin-off site.
- Add two rows for the new `.xlsx` (`source-only`) and `.source.md` + partner (`partnered`), with keywords: *ICP, ideal customer, target buyer, persona, voice, tone, hero copy, headline, microcopy, CTA wording, trust language, fear reversal, objection, value prop, audience, "who they are", buyer intent, per-site persona, narrative, emotional driver.*

### Out of scope

No frontend changes. No edits to the `.xlsx`. The `.source.md` is a 1:1 cell mirror — no synthesis. No copy gets written or shipped from this embed; it only powers future copy decisions.