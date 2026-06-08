import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { parsePublicSlug } from "@/lib/urls";

type PublicSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PublicSlugPage({ params }: PublicSlugPageProps) {
  const { slug: rawSlug } = await params;
  let slug: string;

  try {
    slug = parsePublicSlug(rawSlug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col justify-center">
        <Card className="p-6 text-center">
          <div className="mx-auto mb-5 size-20 rounded-full bg-[var(--primary)]" />
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--primary)]">
            /b/{slug}
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Public page scaffold</h1>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            The slug is valid and ready for the published profile renderer in a
            later phase.
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild variant="secondary">
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
