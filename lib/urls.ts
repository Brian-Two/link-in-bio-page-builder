const SLUG_MIN_LENGTH = 3;
const SLUG_MAX_LENGTH = 64;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function normalizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, SLUG_MAX_LENGTH)
    .replace(/-+$/g, "");
}

export function isValidSlug(slug: string): boolean {
  return (
    slug.length >= SLUG_MIN_LENGTH &&
    slug.length <= SLUG_MAX_LENGTH &&
    slugPattern.test(slug)
  );
}

export function parsePublicSlug(input: string): string {
  const slug = normalizeSlug(input);

  if (!isValidSlug(slug)) {
    throw new Error("Slug must be 3-64 lowercase letters, numbers, or hyphens.");
  }

  return slug;
}

export function parseSafeOutboundUrl(input: string): string {
  const value = input.trim();

  if (value.startsWith("//")) {
    throw new Error("URL must include http:// or https://.");
  }

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error("Enter a valid absolute URL.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("URL must use http or https.");
  }

  return url.toString();
}

export function getPublicBaseUrl(input: string): string {
  const value = input.trim();
  const withProtocol = /^https?:\/\//i.test(value) ? value : `http://${value}`;

  return new URL(withProtocol).origin;
}
