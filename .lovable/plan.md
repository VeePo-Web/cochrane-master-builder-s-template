
## Goal

Every email that leaves `send.cochranemasterbuilders.com` should feel like it came off a Master-Builder's desk: a large, visible **Cochrane Master Builders** logo at the top, **Ecclesiastes 9:10** anchoring the tone, sharpened editorial copy, and subject lines you can read in a glance from the phone lock screen.

---

## 1. Real hosted logo (big, unmissable)

Right now the email header uses a tiny inline "CMB" text block (44×44). Emails need a real image because CSS/SVG monograms don't render reliably across Gmail/Outlook/Apple Mail.

- Generate a **premium wordmark lockup** — stacked bespoke `C · M · B` monogram over the full "COCHRANE MASTER BUILDERS" wordmark with a copper hairline rule, rendered on a transparent background at 1200×600 (2× retina for a 600×300 display size).
- Also generate a **light-on-dark version** for the asphalt hero header, and a **dark-on-light version** for the light body header and footer.
- Upload both via `lovable-assets create` and reference the CDN URLs directly in the email HTML (Gmail/Outlook require absolute `https` image URLs).
- New helper `logoImage(variant: "onDark" | "onLight", width = 260)` in `cmb-email-templates.ts`.

Layout changes:
- `brandBar()` becomes a **centered 260px logo lockup** on white with generous 44px padding above/below and a copper hairline underneath.
- `emailHeader()` becomes a **centered 220px onDark logo** at the top of the asphalt hero block, above the eyebrow and headline. On Apple Mail Dark Mode the transparent PNG still reads correctly.
- `emailFooter()` swaps the tiny monogram tile for a **180px onDark wordmark**, still left-aligned but visually anchoring the sign-off.

---

## 2. Ecclesiastes 9:10 verse block

New helper `verseBlock()` — appears once per email, between `ownerSignature()` and `trustBar()` on the customer email, and just above `emailFooter()` on the internal email as a quiet closing note.

```
─────────
"Whatever your hand finds to do, do it with all your might."
                                    — ECCLESIASTES 9:10
```

Design spec:
- 32px copper hairline above.
- Serif italic verse in Space Grotesk, 20px, `line-height 1.55`, ink color, max-width ~440px, centered.
- Attribution in tracked 10px caps copper (`ECCLESIASTES 9 : 10`), 22px below the verse.
- Wrapped in a `<tr>` with 48px top / 44px bottom padding on the body region.

The verse is quoted once, verbatim, never paraphrased. It replaces the previous "we're building strong foundations for those who come after us" line inside `reassuranceCard` (the slogan already appears in the header, footer and preheader — the verse is what carries the emotional weight now).

---

## 3. Copy rewrite — worldclass Master-Builder voice

Rules that apply across every string:
- **No exclamations. No "excited to". No emoji.** Quiet confidence.
- Sentences shaped like a foreman speaking to a homeowner at the kitchen table: short, specific, warm.
- Every paragraph ends on a verb the customer/team can act on.
- Address the reader by first name once, in the lead paragraph, never again.

### Customer confirmation — rewritten sections

**Preheader** — `A real builder reads every message. We'll come back with a clear next step within one business day.`

**Lead paragraph** — `{FirstName}, your request is in front of us. We're reading it the way we read a set of plans: slowly, with a pencil, looking for the detail that changes everything. You'll hear back within one business day.`

**Body paragraph** — `If a measurement, another photo, or a deadline comes to mind between now and then, hit reply. This inbox is read by the person who will be on your site — not a queue, not a bot.`

**Sections**
- `On File / Here's what we have on record` (was `Here's what we have`)
- `Before we arrive / Three quiet things that make the visit sharper` (was `Three small things that help`)
- `Reassurance card` — replaced with: `Nothing here is on a script. If anything changes — access, timing, a new question, a new room — reply to this note and it lands on the same desk.`
- `CTA` — Primary: `Read how we build` → `/brand-story`. Secondary: `See the trades we take on` → `/services`.
- `Owner signature` — remains `— The CMB team`, subtitle changes to `Cochrane Master Builders · Cochrane, Alberta`.
- `Verse block` — as spec above.
- `Trust bar` — unchanged content, new spacing.

### Internal notification — rewritten sections

**Preheader** — `{Name} · {Service} · {Received time MT}. Reply to thread directly with the customer.`

**Lead paragraph** — `{Name} just sent a request about {Service}. Everything they told us is below. Reply to this email and it threads back to them.`

**Body paragraph** — `Answer within one business day. If you need to send them a written quote, put the submission ID in the subject line so the trail stays clean.`

**Sections**
- `Submission / Contact details` unchanged structure, adds a `Source` row (page slug + referrer if present).
- `Message / What they told us` unchanged.
- `Files / N attachment(s)` unchanged.
- `CTA` — Primary: `Call {phone}`. Secondary: `Reply by email`.
- `Verse block` — quiet closing note before the footer.

---

## 4. Subject lines — crystal clear

Rules:
- Front-load the recognizable brand word or the recipient's name.
- One em-dash separator max.
- Never a colon, never a bracket, never a hashtag.
- Under 60 chars so nothing gets truncated on mobile.

| Email | Subject |
|---|---|
| Internal lead notification | `New lead — {Service} — {Name}` |
| Internal lead (no service) | `New lead — {Name}` |
| Customer confirmation | `Your request is in, {FirstName} — Cochrane Master Builders` |
| Customer confirmation (fallback if no name) | `Your request is in — Cochrane Master Builders` |

The registry-based `booking-confirmation` React Email template (currently only wired for the Lovable pgmq path, unused by `submit-booking`) gets its `subject` updated to the same pattern so the two paths stay consistent if either is ever invoked.

---

## 5. Files touched

- `src/assets/cmb-logo-lockup-onlight.png.asset.json` — new hosted asset pointer.
- `src/assets/cmb-logo-lockup-ondark.png.asset.json` — new hosted asset pointer.
- `supabase/functions/_shared/cmb-email-templates.ts`
  - Add `LOGO_URL` constants (imported from the two `.asset.json` pointers by inlining the CDN URL — Deno reads JSON with `import ... assert { type: "json" }`).
  - Add `logoImage(variant, width)` helper.
  - Rewrite `brandBar()`, `emailHeader()`, `emailFooter()` to use the big logo.
  - Add `verseBlock()` helper.
  - Reduce `reassuranceCard` usage (verse replaces the emotional beat).
- `supabase/functions/submit-booking/index.ts`
  - New copy for both emails (preheader, lead, body, section titles, reassurance, CTAs).
  - New subject-line functions.
  - Insert `verseBlock()` at the correct position in both bodies.
- `supabase/functions/_shared/transactional-email-templates/booking-confirmation.tsx` — align subject line and add a small hosted `<Img>` logo at the top so the pgmq-path email also carries the mark.
- Deploy `submit-booking` after changes.

---

## 6. Verification

- `curl` `submit-booking` with a realistic payload.
- Confirm HTTP 200 on both internal and customer sends, capture Resend message IDs.
- Render the two HTML bodies to `/tmp/cmb-email-preview/*.html` and screenshot with Playwright at 620px wide so I can visually confirm: **logo is large**, verse renders cleanly, spacing is right, subject lines match.
- Report Resend message IDs back so you can check the inbox at `inquiry@cochranemasterbuilders.com`.

---

## Technical detail

- Deno `import ... assert { type: "json" }` works in edge functions for `.asset.json` files — the `url` field is the absolute CDN URL, so email clients get a proper `https` src.
- Image is rendered as PNG with `transparent_background: true` so it composes cleanly on both the bone `#F5EFE6` white body and the asphalt `#0E0E0E` hero block. The onLight variant has an ink `#0E0E0E` monogram and asphalt wordmark; the onDark variant has a bone monogram and copper wordmark rule.
- Verse block uses a `<blockquote>`-style `<td>` with `role="presentation"` to preserve semantics without triggering Outlook's spam heuristics on `<blockquote>` tags.
- Nothing in `submit-booking`'s routing contract (`REQUIRED_INTERNAL_RECIPIENTS`, `SENDER_FROM`, `assertInternalRecipients`) changes — the immutable inquiry@ delivery rule stays intact.
