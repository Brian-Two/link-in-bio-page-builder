import { describe, expect, it } from "vitest";

import {
  linkInputSchema,
  linkReorderPayloadSchema,
  profileInputSchema,
} from "@/lib/validation";

describe("profileInputSchema", () => {
  it("parses and normalizes a valid profile", () => {
    const profile = profileInputSchema.parse({
      displayName: "Jane Studio",
      slug: "Jane Studio",
      bio: "Ceramics and classes.",
      avatarUrl: "https://example.com/avatar.png",
      accentColor: "#d94758",
      theme: "warm",
      published: true,
    });

    expect(profile.slug).toBe("jane-studio");
    expect(profile.published).toBe(true);
  });

  it("rejects missing display names and malformed colors", () => {
    expect(() =>
      profileInputSchema.parse({
        displayName: "",
        slug: "valid-slug",
        accentColor: "blue",
      }),
    ).toThrow();
  });
});

describe("linkInputSchema", () => {
  it("parses a valid link and canonicalizes the URL", () => {
    const link = linkInputSchema.parse({
      title: "Portfolio",
      url: "https://example.com",
      position: 0,
    });

    expect(link.url).toBe("https://example.com/");
    expect(link.visible).toBe(true);
  });

  it("rejects unsafe outbound URLs", () => {
    expect(() =>
      linkInputSchema.parse({
        title: "Bad",
        url: "javascript:alert(1)",
        position: 0,
      }),
    ).toThrow();
  });
});

describe("linkReorderPayloadSchema", () => {
  it("accepts unique positions", () => {
    expect(() =>
      linkReorderPayloadSchema.parse({
        links: [
          { id: "123e4567-e89b-12d3-a456-426614174000", position: 0 },
          { id: "123e4567-e89b-12d3-a456-426614174001", position: 1 },
        ],
      }),
    ).not.toThrow();
  });

  it("rejects duplicate positions", () => {
    expect(() =>
      linkReorderPayloadSchema.parse({
        links: [
          { id: "123e4567-e89b-12d3-a456-426614174000", position: 0 },
          { id: "123e4567-e89b-12d3-a456-426614174001", position: 0 },
        ],
      }),
    ).toThrow();
  });
});
