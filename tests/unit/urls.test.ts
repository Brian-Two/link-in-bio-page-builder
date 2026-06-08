import { describe, expect, it } from "vitest";

import {
  isValidSlug,
  normalizeSlug,
  parsePublicSlug,
  parseSafeOutboundUrl,
} from "@/lib/urls";

describe("slug helpers", () => {
  it("normalizes uppercase text, whitespace, symbols, and repeated separators", () => {
    expect(normalizeSlug("  Jane's Studio --- Links  ")).toBe(
      "jane-s-studio-links",
    );
  });

  it("validates practical URL-safe slugs", () => {
    expect(isValidSlug("janes-studio")).toBe(true);
    expect(isValidSlug("ab")).toBe(false);
    expect(isValidSlug("-janes-studio")).toBe(false);
    expect(isValidSlug("janes--studio")).toBe(false);
  });

  it("rejects slugs that normalize to an invalid value", () => {
    expect(() => parsePublicSlug("!!!")).toThrow("Slug must be");
  });
});

describe("parseSafeOutboundUrl", () => {
  it("accepts http and https absolute URLs", () => {
    expect(parseSafeOutboundUrl("https://example.com/path")).toBe(
      "https://example.com/path",
    );
    expect(parseSafeOutboundUrl("http://example.com")).toBe(
      "http://example.com/",
    );
  });

  it("rejects unsafe or unsupported URLs", () => {
    for (const value of [
      "javascript:alert(1)",
      "data:text/html;base64,abc",
      "ftp://example.com",
      "//example.com",
      "/relative",
      "",
      "not a url",
    ]) {
      expect(() => parseSafeOutboundUrl(value), value).toThrow();
    }
  });
});
