import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";
import { env } from "@/lib/env";

export const sqlClient = neon(env.DATABASE_URL);

export const db = drizzle(sqlClient, { schema });
