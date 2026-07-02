## Goal

1. Soften the email voice — still Master-Builder, but a bit warmer and more human (fewer "we assess", more "we read every one").
2. Fully retire the phone number as a contact surface. Email + booking form are the only ways to reach Cochrane Master Builders.

## 1 · Remove phone from the booking form

**`src/components/template/BookingForm.tsx`**
- Delete the Phone `<Field>`, the `phone` register, the `trigger(["name","email","phone"])` step guard becomes `["name","email"]`, and the "Phone" row in the review summary.
- Contact step collapses to Name + Email only.

**`src/config/template/booking-schema.ts`**
- Drop `phone` from the schema, `PHONE_RE`, and the step field map.

**`src/lib/booking-validation.ts`**
- Drop `phone` from the draft type, remove `phoneSchema`, and remove the `contact` step's phone entry.

**`src/test/booking-validation.test.ts`**
- Remove the phone field from `happyDraft()` and delete the two "phone with <10 digits" tests.

## 2 · Remove phone from emails

**`supabase/functions/submit-booking/index.ts`**
- Remove `phone` from the parsed payload, from the internal facts table ("Phone" row + tel: href), from the customer facts table ("Phone on File" row), and from the "Call {phone}" secondary CTA. Replace that CTA with a single "Reply to this email" primary action.

**`supabase/functions/_shared/cmb-email-templates.ts`**
- Delete `BRAND.phone` and the phone line in the footer helper.

**`supabase/functions/_shared/transactional-email-templates/booking-confirmation.tsx`**
- No phone references today — verify and leave alone.

## 3 · Warmer copy (emails)

Rewrites in `submit-booking/index.ts` and the React Email template.

- Customer subject stays `Your request is in, {FirstName} — Cochrane Master Builders`.
- Customer lead paragraph → *"Thanks for reaching out — your note is sitting in front of a real builder right now, not a queue. We read every one carefully, the way we'd read a set of plans, and we'll come back with a clear next step within one business day."*
- "Three small things that help" intro → *"Whenever it's easy, these three details make our first conversation a lot smoother:"*
- Sign-off → *"Talk soon, — The Cochrane Master Builders team"*
- Internal subject stays `New lead — {Service} — {Name}`; preheader softens to *"A new homeowner just reached out. Here's what they sent."*

Verse block (Ecclesiastes 9:10) and big logo stay exactly as they are.

## 4 · Remove phone from the rest of the website

**`src/pages/template/Privacy.tsx`** — drop "phone" from the list of collected data.
**`src/pages/template/Home.tsx`** — "From your phone" → "From your camera roll".
**`src/pages/template/FAQ.tsx`** — "Phone camera quality is fine" → "A camera-roll photo is fine".
**`src/config/template/remix-variables.ts`** — remove `PHONE` field from the type and value (and its comment about JSON-LD).
**`src/config/template/contact.ts`** — delete `PHONE_E164`, `PHONE_TEL`, `PHONE_DISPLAY` exports.
**`src/config/trade.config.ts`** — set `phone` to empty / drop from the shape.

**Legacy (imported but not rendered on any live route):**
- `src/components/drywall/BookingModal.tsx`, `src/components/drywall/Footer.tsx`, `src/components/detailing/BookingModal.tsx`, `src/components/detailing/Footer.tsx` — remove the "Or call us"/tel: blocks and the hard-coded `tel:+13062097804` / `tel:+14035551234` so no stray phone can leak in later remixes.

## 5 · Verify

- `tsgo` clean.
- `rg -n "tel:|\(403\)|1-8\d\d|PHONE_"` returns only docs/knowledge references, no live UI/email hits.
- POST `/submit-booking` without a `phone` field → 200, both emails deliver, and neither email contains a phone number or "Call" CTA.

## Not changed

- Ecclesiastes 9:10 verse block, big logo, subject-line pattern.
- Knowledge / strategy / SEO markdown docs under `src/knowledge/` and `src/master/` (reference material only — no user-facing surface).
