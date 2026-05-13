/**
 * Slugify a free-text string for use as an organization slug.
 * - Lowercases + strips diacritics (NFKD + \p{Diacritic})
 * - Collapses anything non-[a-z0-9] into single dashes
 * - Trims dashes from edges
 * - Caps length at 48
 * - Falls back to "org" if the result is empty (e.g. all-emoji input)
 */
export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 48) || "org"
  );
}
