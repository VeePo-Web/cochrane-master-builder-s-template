# Open Questions Checklist — Mapped to Exact UI Text

This is a confirmation checklist, not a code change. Each open item from
`SOURCE_OF_TRUTH.openQuestions` (see `questionnaire-answers.ts`) is paired
with the exact strings on the site that depend on Cochrane Master Builders's answer.

Once Cochrane Master Builders confirms each item, we update every linked location in one pass.

---

## 1. Brand Name — "Cochrane Master Builders" vs "StreetSmart Detailing"

| File | Line | Current text |
|---|---|---|
| `src/components/detailing/Footer.tsx` | 35 | `Cochrane Master Builders` (footer brand H3) |
| `src/components/detailing/Footer.tsx` | 127 | `Cochrane Master Builders` (monumental sign-off) |
| `src/components/detailing/Footer.tsx` | 136 | `© {year} Cochrane Master Builders · Calgary, Alberta` |
| `src/components/detailing/BookingModal.tsx` | 220 | `COCHRANE MASTER BUILDERS` (animated brand stack) |
| `src/components/detailing/BookingModal.tsx` | 241 | `Detailing` (overline under COCHRANE MASTER BUILDERS) |
| `src/pages/Terms.tsx` | 12 | `By booking a service with Cochrane Master Builders…` |
| `src/pages/Privacy.tsx` | header | brand references |
| `index.html` | `<title>` / meta | site title + OG name |
| `src/components/detailing/LogoMark.tsx` | — | confirm logomark still applies if name changes |

**Decision needed:** keep `Cochrane Master Builders`, switch to `StreetSmart Detailing`,
or run them as parent/sub-brand (e.g. "StreetSmart Detailing — by Cochrane Master Builders").

---

## 2. Contact Info — Phone, Email, Instagram

### Phone (placeholder `(403) 555-1234`)

| File | Line | Current text |
|---|---|---|
| `src/components/detailing/Footer.tsx` | 99–103 | `tel:+14035551234` / `(403) 555-1234` |
| `src/pages/FAQ.tsx` | 121–124 | `sms:+14035551234` / `Text (403) 555-1234` |
| `src/components/detailing/BookingModal.tsx` | 463 | `tel:+14035551234` / `(403) 555-1234` |

### Email (`hello@calemwood.ca`)

| File | Line | Current text |
|---|---|---|
| `src/components/detailing/Footer.tsx` | 93–96 | `mailto:hello@calemwood.ca` |
| `src/pages/Privacy.tsx` | 32 | `…contact us at hello@calemwood.ca.` |

### Instagram (`instagram.com/calemwooddetailing`)

| File | Line | Current text |
|---|---|---|
| `src/components/detailing/Footer.tsx` | 105 | `https://instagram.com/calemwooddetailing` |

**Decision needed:** real phone, real email (does the domain `calemwood.ca`
exist or is it `streetsmartdetailing.ca`?), real IG handle.

---

## 3. Cancellation / Reschedule Window

Cochrane Master Builders did not state a window — current "24 hours" is invented and must be
confirmed or removed.

| File | Line | Current text |
|---|---|---|
| `src/pages/FAQ.tsx` | 35 | "Yes. We ask for 24 hours' notice for cancellations or reschedules. Life happens — just let us know." |
| `src/pages/Terms.tsx` | 16 | "We require a minimum of 24 hours' notice… Late cancellations or no-shows may be subject to a rebooking fee." |

### Also affected — "respond within 2 hours" SLA is unconfirmed

| File | Line | Current text |
|---|---|---|
| `src/pages/FAQ.tsx` | 34, 111 | "We respond within 2 hours…" / "text us anytime — we respond within 2 hours." |
| `src/components/detailing/BookingModal.tsx` | 906 | "We'll confirm by text within 2 hours" |
| `src/pages/Results.tsx` | 194 | "Book your reset today. We'll confirm within 2 hours." |
| `src/pages/ThankYou.tsx` | 7, 74 | "…within 2 hours via text or email." |

**Decisions needed:**
- (a) cancellation window (24h? 48h? none?)
- (b) is there a rebooking fee?
- (c) realistic confirmation SLA

---

## 4. Pricing Display Model — "Interior + $30 add-on" vs Bundled "Full Detail"

Site currently shows three tiers at wrong prices. Cochrane Master Builders's real model is
**Interior base + $30 exterior add-on**.

| File | Line | Current text |
|---|---|---|
| `src/pages/Services.tsx` | 45–48 | `The Full Reset` · `From $349` · `4–6 hours` |
| `src/pages/Services.tsx` | 49–52 | "Everything in the Interior Deep Clean, plus hand wash, clay bar treatment, **machine polish**, paint sealant…" *(machine polish — Cochrane Master Builders does not offer)* |
| `src/pages/Services.tsx` | 76–82 | `Interior Deep Clean` · `From $199` · `2–3 hours` |
| `src/pages/Services.tsx` | 97–103 | `Exterior Restoration` · `From $199` · "one-step **machine polish**…" |
| `src/components/detailing/FullResetSection.tsx` | 135–136 | `From $349` · `Sedans from $349 · SUVs & trucks from $399` |
| `src/components/detailing/FullResetSection.tsx` | 242–247 | `From $349` · `Sedans from $349` · `SUVs & trucks from $399` |
| `src/pages/FAQ.tsx` | 32 | "Starts at $349 for sedans. SUVs and trucks start at $399." |
| `src/components/detailing/BookingModal.tsx` | 14–19 | `services[]`: Full Reset / Interior Deep Clean / Exterior Restoration |
| `src/components/detailing/BookingModal.tsx` | 17 | "Hand wash, clay bar, **polish**, sealant" *(remove polish)* |

**Decisions needed:**
- (a) Display as `Interior $139 + $30 exterior` or as bundled `Full Detail from $169 sedan / $189 SUV / $229 7-seater`?
- (b) Confirm 7-seater pricing is shown publicly.
- (c) Remove all "machine polish / paint correction" language — confirm.
- (d) Add-on visibility: surface ceramic spray coat, clay bar, iron extraction as add-ons?

---

## 5. Service Area — Calgary + Airdrie + Cochrane only?

| File | Line | Current text |
|---|---|---|
| `src/pages/ServiceArea.tsx` | 19 | `Surrounding: ["Airdrie", "Cochrane", "Okotoks", "Chestermere", "Langdon"]` |
| `src/pages/ServiceArea.tsx` | 31 | "Mobile service across Calgary and surrounding areas." |
| `src/pages/ServiceArea.tsx` | 41–42 | "…anywhere in Calgary and surrounding communities." |
| `src/components/detailing/Footer.tsx` | 39 | `Calgary & Surrounding Areas · Alberta` |
| `src/pages/Services.tsx` | 36 | "All services include travel anywhere in Calgary." |

**Decision needed:** confirm we remove Okotoks, Chestermere, Langdon — or are
some still acceptable? Also confirm vehicle exclusion ("nothing larger than a
minivan") should appear here.

---

## Bonus — Unsupported Claims to Flag with Cochrane Master Builders

These conflict with `stage: "Just starting"` and `proofAvailable: "None yet"`:

| File | Line | Current text |
|---|---|---|
| `src/components/detailing/FullResetSection.tsx` | 233 | "Before and after photos on every reset." *(future-true; confirm framing)* |
| `src/pages/Results.tsx` | page | confirm whether real before/after exists or page should be deferred |
| `src/components/detailing/BookingModal.tsx` | 17 | mentions "polish" — unsupported service claim |

---

## Deliverable after Cochrane Master Builders confirms

A single follow-up pass that updates every row above in lockstep, so brand,
contact, pricing, service area, and policy are consistent across:

- `Footer.tsx`
- `Navigation.tsx`
- `BookingModal.tsx`
- `Services.tsx`
- `FullResetSection.tsx`
- `FAQ.tsx`
- `ServiceArea.tsx`
- `Terms.tsx`
- `Privacy.tsx`
- `ThankYou.tsx`
- `Results.tsx`
- `index.html` meta

…with no copy left referencing the old placeholders.
