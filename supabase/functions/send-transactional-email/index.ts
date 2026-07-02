import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { TEMPLATES } from '../_shared/transactional-email-templates/registry.ts'

/**
 * send-transactional-email — Universal app email sender for CMB.
 *
 * Sends synchronously via the Lovable Resend connector gateway.
 * Single verified sender subdomain (send.cochranemasterbuilders.com) and
 * single inbound reply address (inquiry@cochranemasterbuilders.com) — hard
 * defaults so every remix behaves identically without per-project wiring.
 */

const BRAND_NAME = 'Cochrane Master Builders'
const SEND_SUBDOMAIN = 'send.cochranemasterbuilders.com'
const REPLY_TO = 'inquiry@cochranemasterbuilders.com'
const FROM_ADDRESS = `noreply@${SEND_SUBDOMAIN}`

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const lovableKey = Deno.env.get('LOVABLE_API_KEY')
  const resendKey = Deno.env.get('RESEND_API_KEY')

  if (!lovableKey || !resendKey) {
    console.error('Missing LOVABLE_API_KEY or RESEND_API_KEY')
    return json({ error: 'Email transport not configured' }, 500)
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON in request body' }, 400)
  }

  const templateName: string = body.templateName || body.template_name
  const recipientEmail: string = body.recipientEmail || body.recipient_email
  const idempotencyKey: string =
    body.idempotencyKey || body.idempotency_key || crypto.randomUUID()
  const templateData: Record<string, any> =
    body.templateData && typeof body.templateData === 'object'
      ? body.templateData
      : {}

  if (!templateName) {
    return json({ error: 'templateName is required' }, 400)
  }

  const template = TEMPLATES[templateName]
  if (!template) {
    return json(
      {
        error: `Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(', ')}`,
      },
      404,
    )
  }

  const effectiveRecipient = (template as any).to || recipientEmail
  if (!effectiveRecipient) {
    return json(
      {
        error:
          'recipientEmail is required (unless the template defines a fixed recipient)',
      },
      400,
    )
  }

  // Render React Email template to HTML + text
  const html = await renderAsync(
    React.createElement(template.component, templateData),
  )
  const plainText = await renderAsync(
    React.createElement(template.component, templateData),
    { plainText: true },
  )

  const resolvedSubject =
    typeof template.subject === 'function'
      ? (template.subject as any)(templateData)
      : template.subject

  const payload = {
    from: `${BRAND_NAME} <${FROM_ADDRESS}>`,
    to: [effectiveRecipient],
    reply_to: REPLY_TO,
    subject: resolvedSubject,
    html,
    text: plainText,
    headers: { 'X-Entity-Ref-ID': idempotencyKey },
  }

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${lovableKey}`,
      'X-Connection-Api-Key': resendKey,
    },
    body: JSON.stringify(payload),
  })

  const respText = await res.text()
  if (!res.ok) {
    console.error('Resend gateway error', {
      status: res.status,
      body: respText,
      templateName,
      recipient: effectiveRecipient,
    })
    return json(
      { error: 'Failed to send email', status: res.status, detail: respText },
      502,
    )
  }

  let respJson: any = {}
  try {
    respJson = JSON.parse(respText)
  } catch {}

  console.log('Transactional email sent', {
    templateName,
    recipient: effectiveRecipient,
    id: respJson?.id,
  })

  return json({ success: true, id: respJson?.id ?? null })
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
