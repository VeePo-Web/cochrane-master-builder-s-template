/**
 * SEO utilities for per-page meta tags.
 * Call setPageMeta() in each page's useEffect to set title, description, and OG tags.
 */

interface PageMeta {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const BASE_URL = "https://cochranedrywall.ca";

export function setPageMeta({ title, description, path, ogImage = "/og-image.jpg" }: PageMeta) {
  // Title
  document.title = title;

  // Meta description
  setMetaTag("name", "description", description);

  // Canonical
  setLinkTag("canonical", `${BASE_URL}${path}`);

  // Open Graph
  setMetaTag("property", "og:title", title);
  setMetaTag("property", "og:description", description);
  setMetaTag("property", "og:url", `${BASE_URL}${path}`);
  setMetaTag("property", "og:image", ogImage);

  // Twitter
  setMetaTag("name", "twitter:title", title);
  setMetaTag("name", "twitter:description", description);
  setMetaTag("name", "twitter:image", ogImage);
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}
