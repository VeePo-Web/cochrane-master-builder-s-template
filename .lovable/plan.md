
# Email System Audit + RoyalMechanical-Grade Rebuild

## Goal
Every email surface on the site — mailto links, booking confirmation to the customer, and internal lead notification — routes to `inquiry@cochranemasterbuilders.com`, sends via Resend from `send.cochranemasterbuilders.com`, and uses a single editorial template system modeled on RoyalMechanical (which is objectively the best-in-class reference in the workspace). Then send live tests to confirm delivery.

## Phase 1 — Frontend `mailto:` audit
Sweep and unify every hard-coded email in the app. Findings:

| File | Current value | Action |
|---|---|---|
| `src/master/brand/identity.ts` | `hello@cochranemasterbuilders.ca` | → `inquiry@cochranemasterbuilders.com` |
| `src/components/detailing/Footer.tsx` (L93, L96) | `hello@cochranemasterbuilders.ca` | → `inquiry@…` |
| `src/pages/Privacy.tsx` (L32) | `hello@cochranemasterbuilders.ca` | → `inquiry@…` |
| `src/components/drywall/Footer.tsx` (L78) | `TRADE.contact.email` | switch source to shared `EMAIL` const |
| `src/config/open-questions-checklist.md` | historical notes | update to reflect new canonical |
| `src/config/template/contact.ts` | already `inquiry@…` ✅ | keep as single source of truth |

All email-bearing components will import from `src/config/template/contact.ts` so there is one source of truth going forward.

## Phase 2 — Backend template library (CMB port of RoyalMechanical)
Create `supabase/functions/_shared/cmb-email-templates.ts` — a direct architectural port of RoyalMechanical's `rm-email-templates.ts`, restyled to CMB's brand:

- **Palette:** Asphalt `#0E0E0E`, Graphite `#1A1A1A`, Copper `#C47D26`, Bone `#F5EFE6`, hairlines `rgba(255,255,255,0.08)` (email-safe fallbacks to solid hex).
- **Typography:** Space Grotesk (display) + Jost/Inter (body), with `Georgia` MSO fallback.
- **Voice:** Master-Builder editorial — slogan "Building strong foundations for those who come after us." threaded through header eyebrow, reassurance card, and footer sign-off.
- **Exports (same shape as RM):** `emailWrapper`, `brandBar`, `emailHeader`, `leadParagraph`, `bodyParagraph`, `sectionTitle`, `serviceBadges`, `infoCard`, `messageBlock`, `preparationSteps`, `reassuranceCard`, `attachmentGallery`, `ctaBlock`, `ownerSignature`, `trustBar`, `emailFooter`, `spacer`, `sortAttachments`, `firstName`, `nowMT`, `escapeHtml`.
- **`preparationSteps()` — trimmed to 3 as requested:**
  1. **Clear a path to the work area.** Two feet of clearance around the site is all we need.
  2. **Secure pets and note parking.** Let us know about pets, and where we should park the truck.
  3. **Gather anything relevant.** Photos, past invoices, permits — a quick text or reply-attach is perfect.

## Phase 3 — `submit-booking` rewrite
Rebuild `supabase/functions/submit-booking/index.ts` on the RoyalMechanical pattern:

- **Sender (hard-coded, not env-overridable):** `Cochrane Master Builders <bookings@send.cochranemasterbuilders.com>`
- **Reply-To on customer emails:** `inquiry@cochranemasterbuilders.com`
- **Reply-To on internal notifications:** the customer's email (so a reply threads to them)
- **`REQUIRED_INTERNAL_RECIPIENTS`** = `["inquiry@cochranemasterbuilders.com"]` — frozen array with `assertInternalRecipients()` guard, matching RM's contract pattern so it can't be silently rerouted.
- **Delivery:** Resend via connector gateway (`https://connector-gateway.lovable.dev/resend/emails`) using `LOVABLE_API_KEY` + `RESEND_API_KEY` (already connected). No direct Resend SDK.
- **Two sends per submission:**
  - *Internal lead* → `inquiry@…` (uses `emailHeader("New Inquiry", name)` + `infoCard` + `messageBlock` + `attachmentGallery` + CTA to call/reply)
  - *Customer confirmation* → their email (uses `emailHeader("Request Received", "Thank you, {first}")` + on-file recap + `preparationSteps()` + reassurance card + owner signature + trust bar + slogan)
- **DB write** to `booking_submissions` stays; rate-limit stays.
- **Attachments:** URL list rendered inline in HTML via `attachmentGallery()` (no MIME download — Resend gateway doesn't accept arbitrary binary attachments the same way; the gallery links + previews are the RM-equivalent UX).

## Phase 4 — Retire the parallel React-Email template
`supabase/functions/_shared/transactional-email-templates/booking-confirmation.tsx` is superseded by the HTML template system above. It stays registered (so `send-transactional-email` keeps working for auth/other flows) but will be re-rendered against the same CMB palette + slogan so the two systems match visually. The registry itself is untouched.

## Phase 5 — Verification (live sends)
1. `supabase--curl_edge_functions` → POST `submit-booking` with a synthetic payload (`inquiry@cochranemasterbuilders.com` as the "customer" so both mails hit the same inbox for review).
2. `supabase--edge_function_logs` → confirm `internal=ok customer=ok` and capture Resend message IDs.
3. Report message IDs + confirm the recipient should check the inbox.
4. If Resend returns a domain-not-verified error, surface it verbatim so you can fix DNS in the Resend dashboard.

## Files touched

**New**
- `supabase/functions/_shared/cmb-email-templates.ts`

**Rewritten**
- `supabase/functions/submit-booking/index.ts`
- `supabase/functions/_shared/transactional-email-templates/booking-confirmation.tsx` (visual re-skin to match)

**Small edits**
- `src/master/brand/identity.ts`
- `src/components/detailing/Footer.tsx`
- `src/components/drywall/Footer.tsx`
- `src/pages/Privacy.tsx`
- `src/config/open-questions-checklist.md`

## Out of scope
- Twilio SMS (RM has it; you haven't asked for it here — happy to add in a follow-up).
- Auth email templates (already scaffolded correctly; unchanged).
- DNS verification of `send.cochranemasterbuilders.com` in Resend — that's a dashboard action only you can do; the plan will surface the exact status from the test send.
