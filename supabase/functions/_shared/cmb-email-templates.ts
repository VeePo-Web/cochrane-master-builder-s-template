/**
 * Cochrane Master Builders — Email Template System
 *
 * Single source of truth for every customer-facing and internal email.
 * Editorial dark palette · Copper accents · Space Grotesk / Jost.
 * Slogan: "Building strong foundations for those who come after us."
 */

// ─── BRAND ──────────────────────────────────────────────────────────────────

export const BRAND = {
  name: "Cochrane Master Builders",
  shortName: "Cochrane Master Builders",
  wordmark: "Cochrane Master Builders",
  monogram: "CMB",
  slogan: "Building strong foundations for those who come after us.",
  establishedLine: "Cochrane, Alberta",
  websiteUrl: "https://cochranemasterbuilders.com",
  storyUrl: "https://cochranemasterbuilders.com/brand-story",

  phone: {
    display: "(403) 899-0000",
    href: "tel:4038990000",
  },
  email: {
    display: "inquiry@cochranemasterbuilders.com",
    href: "mailto:inquiry@cochranemasterbuilders.com",
  },
  address: {
    formatted: "Cochrane, Alberta, Canada",
  },
  hours: {
    short: "Mon–Fri · 8 AM – 5 PM MT",
  },
  trust: {
    guarantee: "15-Year Structural Guarantee",
    turnaround: "24-Hour Written Quote",
    coverage: "$5M Liability Coverage",
  },
} as const;

// Absolute HTTPS URLs — required by Gmail, Outlook, Apple Mail.
// Hosted in the public `booking-media` bucket for stable delivery
// independent of any custom-domain state.
export const LOGO = {
  onLight:
    "https://bbpgnqkwafmaaulzrqqv.supabase.co/storage/v1/object/public/booking-media/brand%2Fcmb-logo-onlight.png",
  onDark:
    "https://bbpgnqkwafmaaulzrqqv.supabase.co/storage/v1/object/public/booking-media/brand%2Fcmb-logo-ondark.png",
} as const;

export const VERSE = {
  text: "Whatever your hand finds to do, do it with all your might.",
  citation: "Ecclesiastes 9 : 10",
} as const;

export const OWNER = {
  name: "The Cochrane Master Builders team",
  title: "Cochrane Master Builders · Cochrane, Alberta",
  signoff: "The CMB team",
} as const;

// Palette — Dark editorial with copper accents
export const C = {
  asphalt: "#0E0E0E",
  graphite: "#161616",
  ink: "#1B1B1B",
  copper: "#C47D26",
  copperSoft: "#D89B52",
  bone: "#F5EFE6",
  boneSoft: "#FBF7EE",
  white: "#FFFFFF",
  body: "#3A3A3A",
  bodyOnDark: "rgba(245,239,230,0.72)",
  muted: "#7A7370",
  mutedOnDark: "rgba(245,239,230,0.44)",
  hairline: "#E6E1D6",
  hairlineDark: "rgba(245,239,230,0.14)",
} as const;

const DISPLAY = `'Space Grotesk', Georgia, 'Times New Roman', serif`;
const SANS = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Jost', Inter, 'Helvetica Neue', Arial, sans-serif`;

// ─── UTIL ───────────────────────────────────────────────────────────────────

export function escapeHtml(str: string): string {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c] || c));
}

export function firstName(name?: string | null): string {
  if (!name) return "there";
  const n = name.trim().split(/\s+/)[0];
  return n || "there";
}

export function nowMT(): string {
  return new Date().toLocaleString("en-CA", {
    timeZone: "America/Edmonton",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|heic|heif|avif)(\?.*)?$/i;
const VIDEO_EXT = /\.(mp4|mov|webm|m4v|avi|mkv)(\?.*)?$/i;

export interface SortedAttachments {
  images: string[];
  videos: string[];
  others: string[];
}

export function sortAttachments(urls?: string[] | null): SortedAttachments {
  const list = Array.isArray(urls) ? urls.filter(Boolean) : [];
  const images: string[] = [];
  const videos: string[] = [];
  const others: string[] = [];
  for (const u of list) {
    if (IMAGE_EXT.test(u)) images.push(u);
    else if (VIDEO_EXT.test(u)) videos.push(u);
    else others.push(u);
  }
  return { images, videos, others };
}

function filenameFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname;
    const last = decodeURIComponent(path.split("/").pop() || "file");
    return last.length > 60 ? last.slice(0, 57) + "…" : last;
  } catch {
    return "file";
  }
}

// ─── WRAPPER ────────────────────────────────────────────────────────────────

export function emailWrapper(content: string, preheader: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${escapeHtml(BRAND.shortName)}</title>
  <!--[if mso]><style type="text/css">body,table,td{font-family:Georgia,'Times New Roman',serif !important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${C.bone};font-family:${SANS};-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.bone};">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;background-color:${C.white};border:1px solid ${C.hairline};">
          ${content}
        </table>
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;">
          <tr><td align="center" style="padding:22px 12px 0;color:${C.muted};font-family:${SANS};font-size:11px;line-height:1.7;letter-spacing:0.5px;">
            ${escapeHtml(BRAND.shortName)} · ${escapeHtml(BRAND.address.formatted)}
          </td></tr>
          <tr><td align="center" style="padding:8px 12px 0;color:${C.muted};font-family:${DISPLAY};font-size:11px;letter-spacing:1.8px;text-transform:uppercase;">
            ${escapeHtml(BRAND.slogan)}
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── HEADER ─────────────────────────────────────────────────────────────────


export function brandBar(): string {
  return `
<tr>
  <td align="center" style="background-color:${C.white};padding:44px 40px 36px;border-bottom:1px solid ${C.hairline};">
    <img src="${LOGO.onLight}" alt="${escapeHtml(BRAND.wordmark)}" width="300" style="display:block;width:300px;max-width:78%;height:auto;border:0;outline:none;" />
    <p style="margin:22px 0 0;font-family:${SANS};font-size:10px;letter-spacing:2.6px;text-transform:uppercase;color:${C.copper};font-weight:600;">${escapeHtml(BRAND.establishedLine)}</p>
  </td>
</tr>`;
}

export function emailHeader(eyebrow: string, title: string): string {
  return `
<tr>
  <td align="center" style="background-color:${C.asphalt};padding:56px 40px 48px;text-align:center;">
    <img src="${LOGO.onDark}" alt="${escapeHtml(BRAND.wordmark)}" width="360" style="display:block;margin:0 auto 34px;width:360px;max-width:82%;height:auto;border:0;outline:none;" />
    <div style="width:32px;height:1px;background-color:${C.copper};margin:0 auto 24px;"></div>
    <p style="margin:0 0 18px;font-family:${SANS};font-size:10px;letter-spacing:3.4px;text-transform:uppercase;color:${C.copper};font-weight:600;">${escapeHtml(eyebrow)}</p>
    <h1 style="margin:0;font-family:${DISPLAY};font-weight:400;color:${C.bone};font-size:34px;line-height:1.1;letter-spacing:-0.4px;">${escapeHtml(title)}</h1>
    <p style="margin:22px 0 0;font-family:${DISPLAY};font-size:11px;letter-spacing:2.6px;text-transform:uppercase;color:rgba(245,239,230,0.5);">${escapeHtml(BRAND.slogan)}</p>
  </td>
</tr>`;
}

export function verseBlock(): string {
  return `
<tr>
  <td align="center" style="padding:48px 56px 44px;">
    <div style="width:48px;height:1px;background-color:${C.copper};margin:0 auto 26px;"></div>
    <p style="margin:0 auto;max-width:440px;font-family:${DISPLAY};font-style:italic;font-weight:400;font-size:20px;line-height:1.55;color:${C.ink};text-align:center;">&ldquo;${escapeHtml(VERSE.text)}&rdquo;</p>
    <p style="margin:22px 0 0;font-family:${SANS};font-size:10px;letter-spacing:2.8px;text-transform:uppercase;color:${C.copper};font-weight:600;text-align:center;">— ${escapeHtml(VERSE.citation)}</p>
  </td>
</tr>`;
}

export function divider(): string {
  return `
<tr>
  <td style="padding:36px 56px 0;">
    <div style="height:1px;background-color:${C.hairline};line-height:1px;font-size:1px;">&nbsp;</div>
  </td>
</tr>`;
}

// ─── SECTIONS ───────────────────────────────────────────────────────────────

export function leadParagraph(html: string): string {
  return `
<tr>
  <td style="padding:44px 56px 0;">
    <p style="margin:0;font-family:${DISPLAY};font-size:21px;line-height:1.5;color:${C.ink};font-weight:400;">${html}</p>
  </td>
</tr>`;
}

export function bodyParagraph(html: string): string {
  return `
<tr>
  <td style="padding:22px 56px 0;">
    <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.75;color:${C.body};">${html}</p>
  </td>
</tr>`;
}

export function sectionTitle(eyebrow: string, title: string): string {
  return `
<tr>
  <td style="padding:44px 56px 0;">
    <p style="margin:0 0 8px;font-family:${SANS};font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${C.copper};font-weight:600;">${escapeHtml(eyebrow)}</p>
    <h2 style="margin:0;font-family:${DISPLAY};font-size:22px;line-height:1.3;color:${C.ink};font-weight:400;letter-spacing:-0.2px;">${escapeHtml(title)}</h2>
    <div style="width:32px;height:1px;background-color:${C.copper};margin-top:14px;"></div>
  </td>
</tr>`;
}

export function serviceBadges(services: string[]): string {
  if (!services || services.length === 0) return "";
  const pills = services
    .map(
      (s) =>
        `<span style="display:inline-block;margin:0 6px 8px 0;padding:7px 14px;font-family:${SANS};font-size:12px;letter-spacing:0.6px;color:${C.asphalt};border:1px solid ${C.copper};background-color:${C.boneSoft};">${escapeHtml(s)}</span>`,
    )
    .join("");
  return `
<tr>
  <td style="padding:22px 56px 0;">
    ${pills}
  </td>
</tr>`;
}

export function infoCard(rows: Array<{ label: string; value?: string | null; href?: string } | null | false>): string {
  const visible = rows.filter(
    (r): r is { label: string; value?: string | null; href?: string } =>
      !!r && !!r.value && String(r.value).trim().length > 0,
  );
  if (visible.length === 0) return "";
  const body = visible
    .map((r, i) => {
      const isLast = i === visible.length - 1;
      const borderStyle = isLast ? "" : `border-bottom:1px solid ${C.hairline};`;
      const valueHtml = r.href
        ? `<a href="${escapeHtml(r.href)}" style="color:${C.asphalt};text-decoration:none;border-bottom:1px solid ${C.copper};">${escapeHtml(r.value!)}</a>`
        : escapeHtml(r.value!);
      return `
      <tr>
        <td style="padding:14px 0;width:38%;vertical-align:top;${borderStyle}font-family:${SANS};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};">${escapeHtml(r.label)}</td>
        <td style="padding:14px 0;vertical-align:top;${borderStyle}font-family:${SANS};font-size:14px;line-height:1.6;color:${C.ink};">${valueHtml}</td>
      </tr>`;
    })
    .join("");
  return `
<tr>
  <td style="padding:26px 56px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.boneSoft};border:1px solid ${C.hairline};">
      <tr><td style="padding:8px 22px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${body}</table>
      </td></tr>
    </table>
  </td>
</tr>`;
}

export function messageBlock(message: string): string {
  return `
<tr>
  <td style="padding:36px 56px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="border-left:2px solid ${C.copper};padding:6px 0 6px 20px;">
        <p style="margin:0;font-family:${DISPLAY};font-style:italic;font-size:17px;line-height:1.7;color:${C.ink};white-space:pre-wrap;">${escapeHtml(message)}</p>
      </td></tr>
    </table>
  </td>
</tr>`;
}

/**
 * Three preparation steps — trimmed at the client's request from the RM five.
 * Master-Builder voice: quiet, specific, no jargon.
 */
export function preparationSteps(): string {
  const steps: Array<[string, string]> = [
    [
      "Clear a path to the work area.",
      "A couple of feet of clearance around the space is all we need — nothing heavy to move, just an unblocked line to the wall, hallway, or exterior we're working on.",
    ],
    [
      "Note pets and where we should park.",
      "Let us know if there's a dog we should keep in mind, and whether the driveway, street, or alley works best for the truck and trailer.",
    ],
    [
      "Gather anything that helps us plan.",
      "Photos of the space, past invoices, sketches, permits — a quick reply to this email with anything attached lets us come prepared.",
    ],
  ];

  const rows = steps
    .map(
      ([title, body], i) => `
        <tr>
          <td style="padding:${i === 0 ? "0" : "24px"} 0 0;vertical-align:top;width:54px;">
            <span style="display:inline-block;font-family:${DISPLAY};font-size:28px;line-height:1;color:${C.copper};font-weight:400;">${String(i + 1).padStart(2, "0")}</span>
          </td>
          <td style="padding:${i === 0 ? "0" : "24px"} 0 0;vertical-align:top;">
            <p style="margin:0 0 6px;font-family:${DISPLAY};font-size:17px;line-height:1.35;color:${C.ink};font-weight:400;">${escapeHtml(title)}</p>
            <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.7;color:${C.body};">${escapeHtml(body)}</p>
          </td>
        </tr>`,
    )
    .join("");

  return `
<tr>
  <td style="padding:26px 56px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
  </td>
</tr>`;
}

export function reassuranceCard(html: string): string {
  return `
<tr>
  <td style="padding:40px 56px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.boneSoft};border:1px solid ${C.copper};">
      <tr><td style="padding:22px 26px;">
        <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.75;color:${C.asphalt};">${html}</p>
      </td></tr>
    </table>
  </td>
</tr>`;
}

// ─── ATTACHMENTS ────────────────────────────────────────────────────────────

export function attachmentGallery(att: SortedAttachments): string {
  const { images, videos, others } = att;
  if (!images.length && !videos.length && !others.length) return "";

  let imageRows = "";
  if (images.length) {
    const chunks: string[] = [];
    for (let i = 0; i < images.length; i += 2) {
      const pair = images
        .slice(i, i + 2)
        .map(
          (url) => `
        <td width="50%" align="center" valign="top" style="padding:0 6px 12px;">
          <a href="${escapeHtml(url)}" style="display:block;text-decoration:none;">
            <img src="${escapeHtml(url)}" alt="${escapeHtml(filenameFromUrl(url))}" width="260" style="width:100%;max-width:260px;height:auto;display:block;border:1px solid ${C.hairline};" />
          </a>
        </td>`,
        )
        .join("");
      const filler = images.slice(i, i + 2).length === 1 ? `<td width="50%"></td>` : "";
      chunks.push(`<tr>${pair}${filler}</tr>`);
    }
    imageRows = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${chunks.join("")}</table>`;
  }

  const fileCard = (url: string, kind: "video" | "file") => {
    const label = kind === "video" ? "Open video" : "Open file";
    const glyph = kind === "video" ? "▶" : "⇩";
    return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.boneSoft};border:1px solid ${C.hairline};margin-bottom:10px;">
        <tr>
          <td width="56" valign="middle" style="padding:14px 0 14px 16px;">
            <span style="display:inline-block;width:34px;height:34px;line-height:34px;text-align:center;border:1px solid ${C.copper};color:${C.copper};font-family:${DISPLAY};font-size:14px;">${glyph}</span>
          </td>
          <td valign="middle" style="padding:14px 12px;font-family:${SANS};">
            <p style="margin:0;font-size:13px;color:${C.ink};font-weight:600;">${escapeHtml(filenameFromUrl(url))}</p>
            <p style="margin:2px 0 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${C.muted};">${kind === "video" ? "Video attachment" : "File attachment"}</p>
          </td>
          <td valign="middle" align="right" style="padding:14px 16px 14px 0;">
            <a href="${escapeHtml(url)}" style="display:inline-block;padding:8px 14px;font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:0.5px;color:${C.asphalt};border:1px solid ${C.asphalt};text-decoration:none;">${label}</a>
          </td>
        </tr>
      </table>`;
  };

  const videoCards = videos.map((u) => fileCard(u, "video")).join("");
  const otherCards = others.map((u) => fileCard(u, "file")).join("");
  const total = images.length + videos.length + others.length;

  return `
<tr>
  <td style="padding:36px 56px 0;">
    <p style="margin:0 0 14px;font-family:${SANS};font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${C.copper};font-weight:600;">Attachments (${total})</p>
    ${imageRows}
    ${videoCards}
    ${otherCards}
  </td>
</tr>`;
}

// ─── CTA ────────────────────────────────────────────────────────────────────

export interface CtaOptions {
  primaryText: string;
  primaryUrl: string;
  secondaryText?: string;
  secondaryUrl?: string;
}

export function ctaBlock(opts: CtaOptions): string {
  const { primaryText, primaryUrl, secondaryText, secondaryUrl } = opts;
  const primary = `<a href="${escapeHtml(primaryUrl)}" style="display:inline-block;padding:15px 30px;background-color:${C.copper};color:${C.asphalt};font-family:${SANS};font-weight:700;font-size:13px;letter-spacing:1.2px;text-transform:uppercase;text-decoration:none;">${escapeHtml(primaryText)}</a>`;
  const secondary = secondaryText && secondaryUrl
    ? `<a href="${escapeHtml(secondaryUrl)}" style="display:inline-block;margin-left:8px;padding:14px 26px;background-color:transparent;color:${C.asphalt};border:1px solid ${C.asphalt};font-family:${SANS};font-weight:600;font-size:13px;letter-spacing:1.2px;text-transform:uppercase;text-decoration:none;">${escapeHtml(secondaryText)}</a>`
    : "";
  return `
<tr>
  <td style="padding:44px 56px 0;text-align:left;">
    ${primary}${secondary}
  </td>
</tr>`;
}

// ─── SIGNATURE / TRUST / FOOTER ─────────────────────────────────────────────

export function ownerSignature(): string {
  return `
<tr>
  <td style="padding:44px 56px 0;">
    <p style="margin:0 0 4px;font-family:${DISPLAY};font-size:22px;color:${C.asphalt};font-style:italic;font-weight:400;">— ${escapeHtml(OWNER.signoff)}</p>
    <p style="margin:0;font-family:${SANS};font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:${C.muted};">${escapeHtml(OWNER.title)}</p>
  </td>
</tr>`;
}

export function trustBar(): string {
  return `
<tr>
  <td style="padding:40px 56px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.hairline};">
      <tr><td style="padding:20px 0 0;font-family:${SANS};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};text-align:center;">
        ${escapeHtml(BRAND.trust.guarantee)} &nbsp;·&nbsp; ${escapeHtml(BRAND.trust.turnaround)} &nbsp;·&nbsp; ${escapeHtml(BRAND.trust.coverage)}
      </td></tr>
    </table>
  </td>
</tr>`;
}

export function emailFooter(reason: string): string {
  const year = new Date().getFullYear();
  return `
<tr>
  <td style="background-color:${C.asphalt};padding:46px 56px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td width="56" valign="middle" style="padding-right:18px;padding-bottom:22px;">
          <div style="width:40px;height:40px;background-color:${C.graphite};color:${C.copper};font-family:${DISPLAY};font-size:13px;letter-spacing:1.5px;text-align:center;line-height:40px;font-weight:500;">${BRAND.monogram}</div>
        </td>
        <td valign="middle" style="padding-bottom:22px;">
          <p style="margin:0;font-family:${DISPLAY};font-size:18px;line-height:1.1;color:${C.bone};font-weight:500;letter-spacing:-0.2px;">${escapeHtml(BRAND.wordmark)}</p>
          <p style="margin:4px 0 0;font-family:${SANS};font-size:10px;letter-spacing:2.4px;text-transform:uppercase;color:${C.copper};font-weight:600;">${escapeHtml(BRAND.establishedLine)}</p>
        </td>
      </tr>
      <tr><td colspan="2" style="padding-top:4px;border-top:1px solid ${C.hairlineDark};">
        <p style="margin:20px 0 6px;font-family:${SANS};font-size:13px;line-height:1.75;color:${C.bodyOnDark};">
          <a href="${BRAND.email.href}" style="color:${C.copper};text-decoration:none;">${escapeHtml(BRAND.email.display)}</a>
        </p>
        <p style="margin:0 0 22px;font-family:${SANS};font-size:13px;line-height:1.75;color:${C.mutedOnDark};">
          ${escapeHtml(BRAND.address.formatted)} &nbsp;·&nbsp; ${escapeHtml(BRAND.hours.short)}
        </p>
        <div style="width:32px;height:1px;background-color:${C.copper};margin:0 0 18px;"></div>
        <p style="margin:0 0 10px;font-family:${DISPLAY};font-size:12px;letter-spacing:1.8px;text-transform:uppercase;color:${C.copperSoft};">${escapeHtml(BRAND.slogan)}</p>
        <p style="margin:0;font-family:${SANS};font-size:11px;line-height:1.75;color:${C.mutedOnDark};">
          You received this because ${escapeHtml(reason)}.<br>
          © ${year} ${escapeHtml(BRAND.name)}.
        </p>
      </td></tr>
    </table>
  </td>
</tr>`;
}

export function spacer(px = 8): string {
  return `<tr><td style="line-height:${px}px;height:${px}px;font-size:${px}px;">&nbsp;</td></tr>`;
}
