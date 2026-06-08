import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let session:
    | Awaited<ReturnType<typeof auth.getSession>>["data"]
    | undefined;
  let authError = false;

  try {
    const result = await auth.getSession();
    session = result.data;
  } catch (error) {
    authError = true;
    console.error("Dashboard auth-state check failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
  }

  const user = session?.user;

  return (
    <main className="min-h-screen px-6 py-6 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <Link className="font-semibold" href="/">
            Link-in-Bio Page Builder
          </Link>
          <Button asChild variant="secondary">
            <Link href="/b/demo">Public scaffold</Link>
          </Button>
        </nav>

        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--primary)]">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Auth-state check
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            This page verifies the server helper can read the current Neon Auth
            session before the profile editor is introduced.
          </p>
        </section>

        <Card className="p-5">
          {authError ? (
            <div>
              <h2 className="text-lg font-semibold">Auth service unavailable</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                The dashboard rendered, but the session check could not reach
                Neon Auth. Server logs include a sanitized error class.
              </p>
            </div>
          ) : user ? (
            <div>
              <h2 className="text-lg font-semibold">Authenticated session</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Signed in as {user.email ?? user.name ?? "current user"}.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold">No active session</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                The auth route is mounted and ready. Full sign-in screens arrive
                with the dashboard workflow phase.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/api/auth/get-session">Check session API</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/">Back home</Link>
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
