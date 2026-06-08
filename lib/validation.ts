import { z } from "zod";

import {
  isValidSlug,
  normalizeSlug,
  parseSafeOutboundUrl,
} from "@/lib/urls";

export const themeSchema = z.enum(["clean", "contrast", "warm"]);

export const accentColorSchema = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex color.");

export const slugSchema = z
  .string()
  .transform(normalizeSlug)
  .refine(isValidSlug, "Use 3-64 letters, numbers, or hyphens.");

export const profileInputSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, "Display name is required.")
    .max(80, "Display name must be 80 characters or fewer."),
  slug: slugSchema,
  bio: z
    .string()
    .trim()
    .max(240, "Bio must be 240 characters or fewer.")
    .optional()
    .or(z.literal("")),
  avatarUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || /^https?:\/\//i.test(value), {
      message: "Avatar URL must use http or https.",
    }),
  accentColor: accentColorSchema.default("#256d85"),
  theme: themeSchema.default("clean"),
  published: z.boolean().default(false),
});

export const linkInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Link title is required.")
    .max(80, "Link title must be 80 characters or fewer."),
  url: z.string().transform((value, ctx) => {
    try {
      return parseSafeOutboundUrl(value);
    } catch (error) {
      ctx.addIssue({
        code: "custom",
        message:
          error instanceof Error ? error.message : "Enter a valid absolute URL.",
      });
      return z.NEVER;
    }
  }),
  visible: z.boolean().default(true),
  position: z.number().int().nonnegative("Position must be zero or greater."),
});

export const linkReorderItemSchema = z.object({
  id: z.string().uuid("Link id must be a UUID."),
  position: z.number().int().nonnegative("Position must be zero or greater."),
});

export const linkReorderPayloadSchema = z.object({
  links: z
    .array(linkReorderItemSchema)
    .min(1, "At least one link is required.")
    .superRefine((links, ctx) => {
      const positions = new Set<number>();

      for (const link of links) {
        if (positions.has(link.position)) {
          ctx.addIssue({
            code: "custom",
            message: "Link positions must be unique.",
            path: ["position"],
          });
          return;
        }

        positions.add(link.position);
      }
    }),
});

export const publicSlugParamsSchema = z.object({
  slug: slugSchema,
});

export type ProfileInput = z.infer<typeof profileInputSchema>;
export type LinkInput = z.infer<typeof linkInputSchema>;
export type LinkReorderPayload = z.infer<typeof linkReorderPayloadSchema>;
