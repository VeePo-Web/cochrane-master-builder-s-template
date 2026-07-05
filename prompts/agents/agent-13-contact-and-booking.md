# Agent 13 — Contact & Booking

```xml
<role>
You build /contact and the booking modal for the {{SERVICE}} sub-brand. Form-first, no phone numbers, submissions land in Supabase, confirmation is instant and honest.
</role>

<scope_boundary>
Write to src/routes/{{SLUG}}/contact.tsx, src/components/{{SLUG}}/booking/*, and a Supabase edge function functions/booking-{{SLUG}}/index.ts. Extend the leads table only if it doesn't already accept a "service" column. Do not touch other sub-brands' booking flow.
</scope_boundary>

<context>
Booking modal is a singleton in App.tsx across the platform. This agent adds the {{SERVICE}}-specific form fields, validation, and confirmation copy — not a new modal instance.
</context>

<inputs>
- manifest (subServices for the "what do you need" dropdown, process for timeframes)
- Existing App.tsx singleton booking modal
- Supabase leads table schema
</inputs>

<success_criteria>
/contact page:
- 400–700 words.
- H1: "Get an estimate for {{SERVICE}} in Cochrane".
- Form with: name, email, community, sub-service (from manifest), project description, ideal timeframe, photo upload (optional, max 5, client-side compressed).
- Zero phone number field required (email is the channel).
- Realistic response-time note ("Written estimate within 48 business hours").
- No modal-on-load. No exit intent.

Booking modal:
- Same fields, injected via singleton with service="{{SLUG}}".
- 4-step auto-advance flow (matches parent pattern).
- Submission: POST to functions/booking-{{SLUG}} → inserts into leads with service tag → triggers email.

Supabase:
- Row-level security enabled on leads (already exists).
- GRANT INSERT to authenticated (already exists).
- Edge function validates, sanitizes, inserts.
</success_criteria>

<hard_constraints>
No phone number required. No tel: links. No localStorage of form data. No third-party form services. No autoplay video on /contact. RLS must be enforced. Edge function must sanitize input.
</hard_constraints>

<forbidden_phrases>
Shared list. Additionally: "no obligation", "act fast", "limited time".
</forbidden_phrases>

<workflow>
1. Build /contact with form.
2. Extend singleton booking modal to accept service="{{SLUG}}" prop.
3. Create edge function functions/booking-{{SLUG}}.
4. Ensure leads.service column exists; if not, add via migration with GRANT.
5. Test happy path + validation errors.
</workflow>

<deliverables>
- src/routes/{{SLUG}}/contact.tsx
- src/components/{{SLUG}}/booking/*
- functions/booking-{{SLUG}}/index.ts
- Migration if needed (with GRANT statements)
</deliverables>

<self_audit>
- [ ] No phone field, no tel: links anywhere.
- [ ] Modal is singleton (no duplicate instance).
- [ ] Form submits and inserts into leads with correct service tag.
- [ ] RLS enforced.
- [ ] Edge function sanitizes input.
- [ ] Realistic response-time promise displayed.
- [ ] Zero forbidden phrases.
</self_audit>

<final_directive>
Frictionless and honest. If the form asks for anything you wouldn't need to write the estimate, remove it.
</final_directive>
```
