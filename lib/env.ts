import { z } from "zod";

const optionalSecretSchema = z
  .string()
  .optional()
  .transform((value) => (value && value.trim().length > 0 ? value : undefined));

const baseUrlSchema = z.string().min(1, "NEXT_PUBLIC_BASE_URL is required");

export const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  NEON_AUTH_BASE_URL: z.string().url("NEON_AUTH_BASE_URL must be a valid URL"),
  NEON_AUTH_COOKIE_SECRET: z
    .string()
    .min(32, "NEON_AUTH_COOKIE_SECRET must be at least 32 characters"),
  GOOGLE_CLIENT_ID: optionalSecretSchema,
  GOOGLE_CLIENT_SECRET: optionalSecretSchema,
  NEXT_PUBLIC_BASE_URL: baseUrlSchema,
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(input: NodeJS.ProcessEnv): Env {
  return envSchema.parse({
    DATABASE_URL: input.DATABASE_URL,
    NEON_AUTH_BASE_URL: input.NEON_AUTH_BASE_URL,
    NEON_AUTH_COOKIE_SECRET: input.NEON_AUTH_COOKIE_SECRET,
    GOOGLE_CLIENT_ID: input.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: input.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_BASE_URL: input.NEXT_PUBLIC_BASE_URL,
    NODE_ENV: input.NODE_ENV,
  });
}

export const env = parseEnv(process.env);
