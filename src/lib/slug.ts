/**
 * slugify — stable, URL-safe key generation.
 *
 * Used to derive addressable slugs for sub-services and to normalise any
 * string into a matrix-safe path segment. Deterministic: same input → same
 * output across builds (the index must not churn).
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")   // strip accents
    .replace(/['"]/g, "")               // drop quotes
    .replace(/[^a-z0-9]+/g, "-")        // non-alnum → hyphen
    .replace(/^-+|-+$/g, "")            // trim hyphens
    .replace(/-{2,}/g, "-");            // collapse repeats
}
