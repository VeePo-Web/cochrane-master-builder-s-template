/**
 * submit-booking — Universal Booking Edge Function (CMB)
 *
 * Validates form input, persists to `booking_submissions`, then delivers TWO
 * emails via the Resend connector gateway using the CMB editorial templates:
 *
 *   1. Internal lead notification → inquiry@cochranemasterbuilders.com
 *      (Reply-To set to the customer so an admin reply threads back to them.)
 *   2. Customer confirmation → the submitter's email
 *      (Reply-To set to inquiry@cochranemasterbuilders.com.)
 *
 * Sender is hard-coded to `bookings@send.cochranemasterbuilders.com` and the
 * internal recipient is hard-coded and guarded by `assertInternalRecipients()`
 * so no env override can silently reroute leads.
 */

// @ts-ignore — Deno
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore — Deno
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.104.1";
import { bookingSubmissionSchema } from "../_shared/booking-schema.ts";
import {
  BRAND,
  emailWrapper,
  emailHeader,
  brandBar,
  leadParagraph,
  bodyParagraph,
  sectionTitle,
  serviceBadges,
  infoCard,
  messageBlock,
  preparationSteps,
  reassuranceCard,
  attachmentGallery,
  ctaBlock,
  ownerSignature,
  trustBar,
  verseBlock,
  emailFooter,
  spacer,
  sortAttachments,
  firstName,
  nowMT,
  escapeHtml,
} from "../_shared/cmb-email-templates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Immutable routing contract ─────────────────────────────────────────────
const REQUIRED_INTERNAL_RECIPIENTS = Object.freeze([
  "inquiry@cochranemasterbuilders.com",
] as const);

const SENDER_FROM = "Cochrane Master Builders <bookings@send.cochranemasterbuilders.com>";
const CUSTOMER_REPLY_TO = "inquiry@cochranemasterbuilders.com";

function assertInternalRecipients(to: readonly string[]): void {
  const norm = (s: string) => s.trim().toLowerCase();
  const required = REQUIRED_INTERNAL_RECIPIENTS.map(norm);
  const got = to.map(norm);
  const ok =
    got.length === required.length &&
    required.every((r) => got.includes(r)) &&
    got.every((g) => required.includes(g));
  if (!ok) {
    throw new Error(
      `Internal recipient contract violated. Expected [${required.join(", ")}], got [${got.join(", ")}].`,
    );
  }
}

const RATE_LIMIT = 5;
const RATE_WINDOW_MINUTES = 10;

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend/emails";

// ── Helpers ────────────────────────────────────────────────────────────────

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function hashIp(ip: string): string {
  return btoa(ip).slice(0, 32);
}

function titleCase(s?: string | null): string | null {
  if (!s) return null;
  return String(s)
    .split(/\s+/)
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

async function sendViaResend(payload: Record<string, unknown>, lovableKey: string, resendKey: string) {
  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let body: unknown = null;
  try { body = JSON.parse(text); } catch { body = text; }
  return { ok: res.ok, status: res.status, body };
}

// ── Main handler ───────────────────────────────────────────────────────────

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let raw: unknown;
  try { raw = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }

  const rawObj = raw as Record<string, unknown>;
  if (rawObj.website) return json({ ok: true, id: crypto.randomUUID() }); // honeypot

  const parsed = bookingSubmissionSchema.safeParse(raw);
  if (!parsed.success) return json({ error: "Validation failed", issues: parsed.error.issues }, 422);
  const data = parsed.data;

  const supabase = createClient(
    // @ts-ignore Deno
    Deno.env.get("SUPABASE_URL") ?? "",
    // @ts-ignore Deno
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  // Rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = hashIp(ip);
  const windowStart = new Date(Date.now() - RATE_WINDOW_MINUTES * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("booking_rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", windowStart);
  if ((count ?? 0) >= RATE_LIMIT) {
    return json({ error: "We have received several messages from this address. Please wait a few minutes and try again." }, 429);
  }
  await supabase.from("booking_rate_limits").insert({ ip_hash: ipHash });

  const submissionId = data.submissionId ?? crypto.randomUUID();
  const { error: insertError } = await supabase.from("booking_submissions").insert({
    submission_id: submissionId,
    site_slug: data.siteSlug ?? "master",
    service_slug: data.serviceSlug ?? null,
    name: data.name,
    email: data.email.toLowerCase(),
    phone: data.phone,
    details: data.projectDetails ?? null,
    media_urls: data.mediaUrls ?? [],
    metadata: {
      source: (rawObj as any).source ?? null,
      userAgent: data.userAgent ?? null,
      referrer: data.referrer ?? null,
      submittedAt: data.submittedAt ?? new Date().toISOString(),
    },
  });
  if (insertError) {
    console.error("DB insert error:", insertError);
    return json({ error: "Submission could not be saved. Please try again." }, 500);
  }

  // ── Compose ─────────────────────────────────────────────────────────────
  // @ts-ignore Deno
  const resendKey = Deno.env.get("RESEND_API_KEY");
  // @ts-ignore Deno
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  if (!resendKey || !lovableKey) {
    console.warn("Skipping email — missing RESEND_API_KEY or LOVABLE_API_KEY");
    return json({ ok: true, id: submissionId, emailed: false });
  }

  const att = sortAttachments(data.mediaUrls);
  const ts = nowMT();
  const serviceLabel = data.serviceSlug ? titleCase(data.serviceSlug.replace(/-/g, " ")) ?? "General" : "General";
  const servicesList = serviceLabel === "General" ? [] : [serviceLabel];

  // ── INTERNAL EMAIL ──────────────────────────────────────────────────────
  const internalSubject = data.serviceSlug
    ? `New lead — ${serviceLabel} — ${data.name}`
    : `New lead — ${data.name}`;
  const internalPreheader = `${data.name} · ${serviceLabel} · received ${ts} MT. Reply to thread directly with the customer.`;
  const internalRows = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email, href: `mailto:${data.email}` },
    { label: "Phone", value: data.phone, href: `tel:${String(data.phone).replace(/[^\d+]/g, "")}` },
    data.serviceSlug ? { label: "Service", value: serviceLabel } : null,
    data.siteSlug ? { label: "Site", value: data.siteSlug } : null,
    data.referrer ? { label: "Source", value: data.referrer } : null,
    { label: "Submission ID", value: submissionId },
    { label: "Received", value: `${ts} MT` },
  ];

  const internalBody =
    brandBar() +
    emailHeader("New Lead", data.name) +
    leadParagraph(
      `${escapeHtml(data.name)} just sent a request about <strong>${escapeHtml(serviceLabel)}</strong>. Everything they told us is below.`,
    ) +
    bodyParagraph(
      `Answer within one business day. Reply to this email and it threads back to them. If you send a written quote, put the submission ID in the subject line so the trail stays clean.`,
    ) +
    (servicesList.length ? serviceBadges(servicesList) : "") +
    sectionTitle("Submission", "Contact details") +
    infoCard(internalRows) +
    (data.projectDetails
      ? sectionTitle("Message", "What they told us") + messageBlock(data.projectDetails)
      : "") +
    (att.images.length + att.videos.length + att.others.length > 0
      ? sectionTitle("Files", `${att.images.length + att.videos.length + att.others.length} attachment${att.images.length + att.videos.length + att.others.length > 1 ? "s" : ""}`) +
        attachmentGallery(att)
      : "") +
    ctaBlock({
      primaryText: `Call ${data.phone}`,
      primaryUrl: `tel:${String(data.phone).replace(/[^\d+]/g, "")}`,
      secondaryText: "Reply by email",
      secondaryUrl: `mailto:${data.email}?subject=${encodeURIComponent(`Re: Your ${serviceLabel} inquiry — Cochrane Master Builders`)}`,
    }) +
    verseBlock() +
    emailFooter("an inquiry was submitted on cochranemasterbuilders.com");

  const internalHtml = emailWrapper(internalBody, internalPreheader);

  // ── CUSTOMER EMAIL ──────────────────────────────────────────────────────
  const fname = firstName(data.name);
  const customerSubject = data.name
    ? `Your request is in, ${fname} — Cochrane Master Builders`
    : `Your request is in — Cochrane Master Builders`;
  const customerPreheader = `A real builder reads every message. We'll come back with a clear next step within one business day.`;
  const customerOnFile = [
    servicesList.length ? { label: "Service Requested", value: serviceLabel } : null,
    data.phone ? { label: "Phone on File", value: data.phone } : null,
    data.email ? { label: "Email on File", value: data.email } : null,
  ];

  const customerBody =
    brandBar() +
    emailHeader("Request Received", `Thank you, ${fname}`) +
    leadParagraph(
      `${escapeHtml(fname)}, your request is in front of us. We're reading it the way we read a set of plans: slowly, with a pencil, looking for the detail that changes everything. You'll hear back within one business day.`,
    ) +
    bodyParagraph(
      `If a measurement, another photo, or a deadline comes to mind between now and then, hit reply. This inbox is read by the person who will be on your site — not a queue, not a bot.`,
    ) +
    (servicesList.length ? serviceBadges(servicesList) : "") +
    (customerOnFile.some(Boolean) ? sectionTitle("On File", "Here's what we have on record") : "") +
    infoCard(customerOnFile) +
    sectionTitle("Before we arrive", "Three quiet things that make the visit sharper") +
    bodyParagraph(
      `None of these are required — we'll work with whatever we find. But sites that do a few of them tend to move faster, with less guesswork on either side.`,
    ) +
    preparationSteps() +
    reassuranceCard(
      `Nothing here is on a script. If anything changes — access, timing, a new question, a new room — reply to this note and it lands on the same desk.`,
    ) +
    ctaBlock({
      primaryText: "Read how we build",
      primaryUrl: BRAND.storyUrl,
      secondaryText: "See the trades we take on",
      secondaryUrl: `${BRAND.websiteUrl}/services`,
    }) +
    ownerSignature() +
    verseBlock() +
    trustBar() +
    spacer(32) +
    emailFooter("you sent a request through cochranemasterbuilders.com");

  const customerHtml = emailWrapper(customerBody, customerPreheader);

  // ── Deliver ─────────────────────────────────────────────────────────────
  const internalTo = [...REQUIRED_INTERNAL_RECIPIENTS];
  assertInternalRecipients(internalTo);
  console.log("submit-booking internal recipients:", internalTo.join(", "));

  const internalRes = await sendViaResend({
    from: SENDER_FROM,
    to: internalTo,
    reply_to: data.email,
    subject: internalSubject,
    html: internalHtml,
    headers: { "X-Entity-Ref-ID": `${submissionId}:internal` },
  }, lovableKey, resendKey);
  console.log(`submit-booking internal status=${internalRes.status}`, internalRes.body);

  const customerRes = await sendViaResend({
    from: SENDER_FROM,
    to: [data.email],
    reply_to: CUSTOMER_REPLY_TO,
    subject: customerSubject,
    html: customerHtml,
    headers: { "X-Entity-Ref-ID": `${submissionId}:customer` },
  }, lovableKey, resendKey);
  console.log(`submit-booking customer status=${customerRes.status}`, customerRes.body);

  return json({
    ok: true,
    id: submissionId,
    emailed: internalRes.ok,
    confirmationSent: customerRes.ok,
    debug: { internalStatus: internalRes.status, customerStatus: customerRes.status },
  });
});
