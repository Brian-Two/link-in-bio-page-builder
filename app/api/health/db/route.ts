import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.execute(sql`select 1 as ok`);

    return NextResponse.json({ status: "healthy", database: "reachable" });
  } catch (error) {
    console.error("Database health check failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return NextResponse.json(
      { status: "unhealthy", database: "unreachable" },
      { status: 503 },
    );
  }
}
