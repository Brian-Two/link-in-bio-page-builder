import { afterEach, describe, expect, it, vi } from "vitest";
import { ZodError } from "zod";

import { getPublicBaseUrl } from "@/lib/urls";

const validEnv = {
  DATABASE_URL: "postgresql://user:pass@example.neon.tech/db",
  NEON_AUTH_BASE_URL: "https://auth.example.neon.tech",
  NEON_AUTH_COOKIE_SECRET: "abcdefghijklmnopqrstuvwxyz123456",
  GOOGLE_CLIENT_ID: "",
  GOOGLE_CLIENT_SECRET: "",
  NEXT_PUBLIC_BASE_URL: "localhost:3000",
  NODE_ENV: "test",
};

async function loadEnvModule() {
  vi.stubEnv("DATABASE_URL", validEnv.DATABASE_URL);
  vi.stubEnv("NEON_AUTH_BASE_URL", validEnv.NEON_AUTH_BASE_URL);
  vi.stubEnv("NEON_AUTH_COOKIE_SECRET", validEnv.NEON_AUTH_COOKIE_SECRET);
  vi.stubEnv("NEXT_PUBLIC_BASE_URL", validEnv.NEXT_PUBLIC_BASE_URL);
  vi.stubEnv("NODE_ENV", validEnv.NODE_ENV);

  return import("@/lib/env");
}

describe("parseEnv", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("parses the required environment contract", async () => {
    const { parseEnv } = await loadEnvModule();
    const env = parseEnv(validEnv);

    expect(env.DATABASE_URL).toBe(validEnv.DATABASE_URL);
    expect(env.NEON_AUTH_BASE_URL).toBe(validEnv.NEON_AUTH_BASE_URL);
    expect(env.GOOGLE_CLIENT_ID).toBeUndefined();
    expect(env.NODE_ENV).toBe("test");
  });

  it("rejects missing required database configuration", async () => {
    const { parseEnv } = await loadEnvModule();

    expect(() =>
      parseEnv({ ...validEnv, DATABASE_URL: undefined }),
    ).toThrow(ZodError);
  });

  it("rejects short Neon Auth cookie secrets", async () => {
    const { parseEnv } = await loadEnvModule();

    expect(() =>
      parseEnv({ ...validEnv, NEON_AUTH_COOKIE_SECRET: "short" }),
    ).toThrow(ZodError);
  });

  it("normalizes localhost base URLs when a full origin is needed", () => {
    expect(getPublicBaseUrl(validEnv.NEXT_PUBLIC_BASE_URL)).toBe(
      "http://localhost:3000",
    );
  });
});
