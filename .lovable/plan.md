
## Goal

Every email surface on the site — mailto links, footer, nav, sticky bar, contact page, booking submissions, and every scaffolded email template — routes to **inquiry@cochranemasterbuilders.com** and is delivered by **Resend** from the verified sender **send.cochranemasterbuilders.com**. Confirm end‑to‑end with a real test send.

## Current State (audit)

**Inbound "contact us" address (mailto):** `parker@veepo.ca` in `src/config/template/contact.ts` → surfaces in:
- `src/components/template/TemplateNavigation.tsx` (mobile drawer)
- `src/components/template/TemplateFooter.tsx` (mobile footer link)
- `src/components/drywall/StickyCTA.tsx` (mobile sticky bar)
- `src/pages/template/Contact.tsx` (contact cards)
- `src/pages/CommunityPage.tsx`

**Booking form → email:** `supabase/functions/submit-booking/index.ts` sends via Resend directly, but reads destination from env `BOOKING_TO_EMAIL` and `BOOKING_FROM_EMAIL` — neither is currently set, so **no notification email is being sent today**. Sender defaults to `noreply@cochrane-master-builders.com` (wrong hyphenated domain).

**Transactional email pipeline (Lovable Emails / pgmq):** `supabase/functions/send-transactional-email/index.ts` is hardcoded to `SENDER_DOMAIN = "notify.cochranemasterbuilders.com"` and `FROM_DOMAIN = "notify.cochranemasterbuilders.com"`. Registered templates: `booking-confirmation` (customer receipt). Uses Lovable's managed API, not raw Resend.

**Two parallel email paths exist** — the direct-Resend path in `submit-booking` and the Lovable managed queue path in `send-transactional-email`. This is the root inconsistency to resolve.

## Plan

### 1. Change the public contact address (frontend)
- Edit `src/config/template/contact.ts`: `EMAIL = "inquiry@cochranemasterbuilders.com"`. Every mailto surface (nav, footer, sticky, contact, community) updates automatically.

### 2. Wire Resend as the single email transport
- Connect Resend via `standard_connectors--connect` (connector_id `resend`) so `RESEND_API_KEY` is injected as a project secret. If already connected, verify with `fetch_secrets`.
- Ensure the user has added and verified the **`send.cochranemasterbuilders.com`** domain in Resend (SPF/DKIM/DMARC records at their DNS host). I cannot verify DNS on their behalf — I'll surface the exact records to add if verification is pending.

### 3. Route the booking form to inquiry@ via Resend
- In `supabase/functions/submit-booking/index.ts`:
  - Hard-default `BOOKING_TO_EMAIL` → `inquiry@cochranemasterbuilders.com`
  - Hard-default `BOOKING_FROM_EMAIL` → `bookings@send.cochranemasterbuilders.com`
  - Hard-default `BOOKING_FROM_NAME` → `Cochrane Master Builders`
  - Keep `reply_to = data.email` so replying from inquiry@ goes straight to the customer.
- Deploy the edge function.

### 4. Move transactional templates onto Resend @ send.cochranemasterbuilders.com
- Update `supabase/functions/send-transactional-email/index.ts`:
  - `SENDER_DOMAIN = "send.cochranemasterbuilders.com"`
  - `FROM_DOMAIN = "send.cochranemasterbuilders.com"`
  - Switch send path to Resend REST (`https://api.resend.com/emails`) using `RESEND_API_KEY`, so both the booking notification and the customer confirmation share one provider/domain.
  - `From: Cochrane Master Builders <noreply@send.cochranemasterbuilders.com>`, `Reply-To: inquiry@cochranemasterbuilders.com`.
- Audit `supabase/functions/_shared/transactional-email-templates/booking-confirmation.tsx` for any hardcoded addresses/domains and align to `inquiry@cochranemasterbuilders.com` for support/reply text.
- Deploy affected functions.

### 5. Verify (live test)
- Post a real submission to `submit-booking` with a test payload → confirm 200, DB row in `bookings`, and delivery event in `email_send_log` / Resend logs. Ask user to confirm receipt at inquiry@.
- Send a test through `send-transactional-email` (`booking-confirmation` template) to a user-supplied test address → confirm delivery.
- Report Resend message IDs + `email_send_log` rows.

### 6. Documentation
- Update `.env` comments / plan.md note: single provider (Resend), single inbound inbox (inquiry@), single sender subdomain (send.cochranemasterbuilders.com).

## Prerequisites I need from you

1. **Confirm** `send.cochranemasterbuilders.com` is added in Resend with DNS records published (SPF, DKIM, DMARC) — or say "not yet" and I'll produce the exact records to paste at your DNS host.
2. **Test recipient email** for the customer-side confirmation test (can be your personal email).
3. Confirm I should **retire the Lovable-managed queue path** and standardize on **direct Resend** for both booking notifications and customer confirmations (recommended for consistency).
