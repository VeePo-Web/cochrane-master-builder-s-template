# SEO PLAYBOOK — How every CMB site ranks

## Per-page checklist

For every page (home, services, area pages, FAQ):

- [ ] One H1, keyword-rich, <60 chars
- [ ] `<title>` tag <60 chars, includes trade + city
- [ ] Meta description <160 chars, includes trade + primary city
- [ ] Canonical URL set
- [ ] One Open Graph image (16:9, branded)
- [ ] LocalBusiness JSON-LD (home + every area page)
- [ ] Service JSON-LD (every service page)
- [ ] Internal links to ≥3 other pages on this site
- [ ] Internal links to ≥1 sister site

## The service-area network

Every remix auto-renders one page per area (`/areas/<slug>`). Each page:
- H1: "<Trade> in <Area>"
- Mentions the area name 3–5x naturally
- Lists 5 named neighborhoods
- Links to 5 nearest areas (next/prev pattern)
- Links to 5 sister sites (from `backlink-network.ts`)
- Includes LocalBusiness schema with the area's lat/lng

This is the SEO moat: ~100 areas × ~100 sites = ~10,000 unique localized pages, all cross-linked.

## Sister-site backlinks

The `<SisterSites />` component renders in:
- The footer of every page
- Every area page

It picks 5 trades by `category` adjacency + explicit `adjacent` slugs (`src/master/trades.ts`).

## sitemap.xml + robots.txt

Generated at build time by reading `SERVICE_AREAS` and the route manifest. Do not hand-edit `public/sitemap.xml` — it gets overwritten.

## Performance is SEO

Core Web Vitals are a ranking signal. See `PERFORMANCE_PLAYBOOK.md`. Hero LCP < 2.5s is non-negotiable.

## What NOT to do

- Don't keyword-stuff. "Cochrane drywall Cochrane drywall installer Cochrane" gets you penalized.
- Don't duplicate paragraphs across sister sites.
- Don't use the same OG image across sites.
- Don't ship a site without its area in `SERVICE_AREAS` — orphaned schema.
