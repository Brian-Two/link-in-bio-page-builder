import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-6 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col">
        <nav className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <Link className="text-base font-semibold" href="/">
            Link-in-Bio Page Builder
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/api/health">Health</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </nav>

        <section className="grid flex-1 items-center gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--primary)]">
              Project foundation
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Build a focused public link page with a durable full-stack base.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Phase 1 wires the app shell, authentication route, database
              schema, validation, health checks, and the reusable UI pieces
              future builder flows will use.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/b/demo">View public scaffold</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="size-12 rounded-full bg-[var(--primary)]" />
              <div>
                <p className="font-semibold">Demo creator</p>
                <p className="text-sm text-[var(--muted)]">@demo</p>
              </div>
            </div>
            <div className="space-y-3">
              {["Portfolio", "Newsletter", "Booking"].map((label) => (
                <div
                  className="rounded-md border border-[var(--border)] px-4 py-3 text-sm font-medium"
                  key={label}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
