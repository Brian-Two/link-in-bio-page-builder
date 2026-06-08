# Feature: Phase 1 Project Foundation

The following plan should be complete, but it is important that you validate documentation and codebase patterns and task sanity before implementing.

Pay special attention to the environment variable names in `.env.example`. The matching values already exist in `.env.local`, so implementation should use those names exactly and should be able to run migrations, start the app, and perform full E2E testing immediately after code is written.

## Feature Description

Initialize the Link-in-Bio Page Builder application foundation. This phase turns the repository from product/spec scaffolding into a runnable Next.js TypeScript application with database/auth foundations, shared validation, base UI primitives, migration-ready schema, and validation scripts.

Phase 1 should not deliver the full profile builder, link manager, public page rendering, or analytics UI. It should establish the stable structure and primitives those later phases will build on.

## User Story

As a developer
I want a working full-stack Next.js foundation with database, auth, schema, and validation wired up
So that subsequent MVP phases can be implemented safely without reworking the project skeleton.

## Problem Statement

The repository currently contains requirements and agent workflow scaffolding, but no application code, `package.json`, framework files, database schema, tests, or runnable local server. Phase 2 depends on authenticated dashboard routes, profile persistence, ownership boundaries, and shared validation, so Phase 1 must create a stable technical base first.

## Solution Statement

Create a root-level Next.js App Router project using TypeScript, Tailwind CSS, ESLint, npm scripts, Neon Postgres, Neon Auth, Drizzle ORM, Zod validation, and focused tests. Add minimal routes for home, dashboard auth-state testing, public slug scaffolding, auth handler, and health checks. Add database schema definitions for profiles, links, and click events, generate SQL migrations, centralize env/auth/db helpers, document actual commands, and validate the result with unit/build checks plus Vercel Agent Browser CLI screenshots.

## Feature Metadata

**Feature Type**: New Capability
**Estimated Complexity**: High
**Primary Systems Affected**: Project root, Next.js app shell, auth, database, validation, tests, docs, E2E validation
**Dependencies**: Next.js, React, TypeScript, Tailwind CSS, ESLint, `@neondatabase/serverless`, `@neondatabase/auth`, Drizzle ORM, Drizzle Kit, Zod, Vitest, dotenv, tsx, Vercel Agent Browser CLI

---

## CONTEXT REFERENCES

### Relevant Codebase Files IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

- `PRD.md` (lines 45-80) - Defines MVP technical scope: Next.js, Neon Postgres, Neon Auth, ownership checks, responsive UI, seedable setup, Vercel compatibility.
- `PRD.md` (lines 139-182) - Defines intended directory structure and server-first architecture.
- `PRD.md` (lines 263-280) - Defines planned technology stack and notes versions should be pinned during initialization.
- `PRD.md` (lines 282-308) - Defines auth, env, security, and deployment expectations.
- `PRD.md` (lines 448-469) - Defines Phase 1 deliverables and validation criteria.
- `PRD.md` (lines 560-580) - Captures security and scope risks that Phase 1 must reduce.
- `CLAUDE.md` (lines 5-23) - Confirms this repo is pre-implementation and expected to become a Next.js App Router app.
- `CLAUDE.md` (lines 38-58) - Defines expected npm scripts and warns not to claim validation for scripts that do not exist.
- `CLAUDE.md` (lines 60-87) - Defines expected project structure.
- `CLAUDE.md` (lines 89-140) - Defines server-first, data access, validation, UI, and security conventions.
- `CLAUDE.md` (lines 142-173) - Defines expected testing and validation coverage after initialization.
- `.env.example` (lines 1-12) - Defines the exact environment variable contract. These same variable names are already present in `.env.local`.
- `.gitignore` (lines 3-47) - Already anticipates Next.js, env files, coverage, Vercel, TypeScript, and E2E artifacts.
- `.agents/skills/e2e-test/SKILL.md` - Defines the required Vercel Agent Browser CLI workflow: install/check agent-browser, start app, snapshot, interact, screenshot every step, inspect console/errors, validate database records, and test responsive viewports.
- `.agents/skills/agent-browser/SKILL.md` - Defines browser CLI commands for navigation, snapshots, clicks, fills, screenshots, viewport changes, console/errors, and saved auth state.

### Environment Contract

Use these environment variable names exactly:

```dotenv
DATABASE_URL=
NEON_AUTH_BASE_URL=
NEON_AUTH_COOKIE_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_BASE_URL=localhost:3000
```

Implementation notes:

- `.env.local` already contains values for the same keys listed in `.env.example`.
- Do not invent replacement names such as `POSTGRES_URL`, `AUTH_SECRET`, `BASE_URL`, or `NEXTAUTH_URL`.
- `DATABASE_URL` should be used by Drizzle migrations, the runtime database client, DB health checks, and database validation queries.
- `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET` should be used by the Neon Auth server helper and route handler.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` should remain production OAuth configuration values and should not be required for unit tests unless Neon Auth setup requires them in the current environment.
- `NEXT_PUBLIC_BASE_URL` should be used anywhere the app needs to construct local/public URLs in browser-safe code. If a fully qualified URL is required, normalize `localhost:3000` to `http://localhost:3000` inside a helper instead of changing the env name.
- Never print or commit `.env.local` values.

### New Files to Create

- `package.json` - npm scripts and pinned dependencies.
- `package-lock.json` - Locked dependency graph generated by npm.
- `next.config.ts` - Next.js configuration.
- `tsconfig.json` - TypeScript configuration with `@/*` path alias.
- `eslint.config.mjs` - ESLint flat config for Next.js/TypeScript.
- `postcss.config.mjs` - Tailwind PostCSS setup.
- `app/layout.tsx` - Root layout and metadata.
- `app/page.tsx` - Minimal home route with product-aware navigation.
- `app/globals.css` - Tailwind import and base tokens.
- `app/(dashboard)/dashboard/page.tsx` - Minimal authenticated route state test surface.
- `app/b/[slug]/page.tsx` - Minimal public route scaffold.
- `app/api/auth/[...path]/route.ts` - Neon Auth route handler.
- `app/api/health/route.ts` - App health endpoint.
- `app/api/health/db/route.ts` - Database connectivity endpoint.
- `components/ui/button.tsx` - Base button primitive.
- `components/ui/input.tsx` - Base input primitive.
- `components/ui/card.tsx` - Minimal card primitive for repeated items/modals only.
- `components/ui/label.tsx` - Accessible label primitive.
- `lib/env.ts` - Environment validation with Zod.
- `lib/db.ts` - Neon serverless + Drizzle database client.
- `lib/auth/server.ts` - Neon Auth server helper.
- `lib/validation.ts` - Profile/link/shared schemas.
- `lib/urls.ts` - Slug normalization and safe URL helpers.
- `db/schema.ts` - Drizzle schema for profiles, links, click events.
- `drizzle.config.ts` - Drizzle Kit migration configuration.
- `db/migrations/` - Generated SQL migrations from Drizzle Kit.
- `tests/unit/urls.test.ts` - Unit tests for slug and URL helpers.
- `tests/unit/validation.test.ts` - Unit tests for Zod schemas.
- `tests/unit/env.test.ts` - Unit tests for environment validation behavior.
- `README.md` - Local setup, env, scripts, migration, and development notes.
- `e2e-screenshots/` - Generated screenshot output from browser validation; ignored by git.
- Optional: `middleware.ts` - Only create if Neon Auth docs require middleware for route protection.

### Existing Files to Update

- `CLAUDE.md` - Update project state, commands, actual package manager, scripts, structure, test commands, migration workflow, and E2E validation workflow.
- `.env.example` - Preserve the exact variable names above. Add comments only if helpful.
- `.gitignore` - Add generated artifacts only if new tools introduce them.

### Relevant Documentation YOU SHOULD READ THESE BEFORE IMPLEMENTING!

- Next.js installation docs: https://nextjs.org/docs/pages/getting-started/installation
  - Specific sections: Create with CLI, manual installation, scripts, TypeScript, linting.
  - Why: Current docs state create-next-app recommended defaults include TypeScript, ESLint, Tailwind CSS, App Router, and agent docs.
- Neon Auth overview: https://neon.com/docs/auth/overview
  - Specific sections: Basic usage and Next.js server SDK.
  - Why: Shows the `createNeonAuth` helper and `app/api/auth/[...path]/route.ts` handler shape.
- Neon connection docs: https://neon.com/docs/get-started/connect-neon
  - Specific sections: Get your connection string and connect from your application.
  - Why: Confirms `DATABASE_URL` usage and recommends environment variables instead of hardcoding connection strings.
- Neon serverless driver docs: https://neon.com/docs/serverless/serverless-driver
  - Specific sections: Install, configure connection, HTTP usage, Drizzle usage.
  - Why: Confirms `@neondatabase/serverless` usage and safe SQL template patterns.
- Drizzle migrations docs: https://orm.drizzle.team/docs/migrations
  - Specific sections: Codebase-first schema, `generate`, `migrate`.
  - Why: Phase 1 needs a schema that can be migrated from a clean database.
- Drizzle Kit overview: https://orm.drizzle.team/docs/kit-overview
  - Specific sections: `drizzle.config.ts`, dialect, schema path, migration commands.
  - Why: Defines required config shape for generating Postgres migrations.

### Patterns to Follow

**Naming Conventions:**

- Use clear domain names from `CLAUDE.md`: `profile`, `link`, `clickEvent`, `slug`, `published`, `visible`.
- Use lowercase URL-safe slugs.
- Keep routes aligned with product concepts: `dashboard`, `b/[slug]`, `api/auth/[...path]`.

**File Organization:**

- Use root-level `app/`, `components/`, `lib/`, `db/`, and `tests/` directories.
- Do not use a `src/` directory unless Next.js tooling makes it unavoidable.
- Keep shared server utilities in `lib/`.

**Data Access:**

- Centralize the database client in `lib/db.ts`.
- Use Drizzle schema as the TypeScript source of truth and generated SQL migrations for deployable database changes.
- Include `userId` on `profiles` and index it so later private reads/writes can scope by authenticated user.

**Validation:**

- Centralize env, slug, URL, profile, and link validation.
- Use Zod for reusable schemas.
- Reject unsupported URL protocols. Permit only `http:` and `https:` for outbound public links.

**Auth:**

- Use Neon Auth server SDK according to official docs.
- Keep auth setup minimal in Phase 1: route handler, server helper, and a dashboard auth-state test page.
- Do not build full sign-in UX beyond what is necessary to verify authenticated/unauthenticated route states.

**UI:**

- Keep Phase 1 UI restrained and functional.
- Add base UI primitives but do not build a marketing page.
- Public route can be a scaffold; full public profile rendering belongs in Phase 3.

**Security:**

- Never commit `.env.local` or secrets.
- Validate env at the boundary.
- Do not expose internal user IDs in public routes.
- Do not add unsafe redirect logic in Phase 1.

---

## IMPLEMENTATION PLAN

### Phase 1: Framework Foundation

Create the Next.js app skeleton, npm scripts, TypeScript, ESLint, Tailwind, and root route files while preserving existing docs and untracked work.

**Tasks:**

- Initialize or manually create a Next.js App Router project at repo root.
- Prefer npm to match `CLAUDE.md`.
- Ensure `app/`, `components/`, `lib/`, `db/`, and `tests/` exist.
- Ensure generated files do not overwrite `PRD.md`, `CLAUDE.md`, `.agents/`, or `.claude/`.

### Phase 2: Database and Auth Foundation

Add Neon database connectivity, Neon Auth server setup, Drizzle schema, Drizzle migrations, and health endpoints.

**Tasks:**

- Add `@neondatabase/serverless`, `@neondatabase/auth`, `drizzle-orm`, `drizzle-kit`, `dotenv`, `tsx`, and `zod`.
- Add `lib/env.ts`, `lib/db.ts`, `lib/auth/server.ts`, `app/api/auth/[...path]/route.ts`.
- Add profile/link/click event tables and indexes in `db/schema.ts`.
- Generate SQL migrations and add migration scripts.

### Phase 3: Validation and Base UI

Add reusable validation and minimal UI primitives needed by future phases.

**Tasks:**

- Add `lib/urls.ts` for slug normalization and safe URL validation.
- Add `lib/validation.ts` for profile/link schemas.
- Add button/input/label/card primitives.
- Add minimal home, dashboard, public slug, and health routes.

### Phase 4: Testing, Browser Validation, and Documentation

Add focused unit tests, run migrations using existing `.env.local`, perform Vercel Agent Browser CLI E2E validation with screenshots, and update documentation.

**Tasks:**

- Add unit tests for env, slug, URL, and validation schemas.
- Run Drizzle migration against the configured `DATABASE_URL` from `.env.local`.
- Start the local app with `npm run dev`.
- Use Vercel Agent Browser CLI to test Phase 1 user journeys and capture screenshots.
- Add README setup instructions.
- Update `CLAUDE.md` to reflect actual initialized state and scripts.

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

### CREATE root Next.js application files

- **IMPLEMENT**: Initialize at repo root with TypeScript, ESLint, Tailwind CSS, App Router, npm, and alias `@/*`.
- **PATTERN**: `CLAUDE.md:60` expects root-level `app/`, `components/`, `lib/`, `db/`, and `tests/`.
- **GOTCHA**: The repository is not empty. If `create-next-app` refuses to run in place, create a temporary app in `/private/tmp/link-in-bio-next-template`, then copy only app/config/package files back into the repo without overwriting `PRD.md`, `CLAUDE.md`, `.agents/`, `.claude/`, `.gitignore`, or `.env.example`.
- **VALIDATE**: `test -f package.json && test -f app/layout.tsx && test -f tsconfig.json`

### UPDATE package.json

- **IMPLEMENT**: Ensure scripts include `dev`, `build`, `start`, `lint`, `lint:fix`, `test`, `test:watch`, `db:generate`, `db:migrate`, `db:check`, and `db:studio`.
- **PATTERN**: `CLAUDE.md:42` expects `npm run dev`, `npm run build`, `npm test`, and `npm run lint`.
- **IMPORTS**: Runtime dependencies should include `next`, `react`, `react-dom`, `@neondatabase/serverless`, `@neondatabase/auth`, `drizzle-orm`, `zod`, and `lucide-react` if icons are used. Dev dependencies should include `typescript`, `eslint`, `drizzle-kit`, `dotenv`, `tsx`, `vitest`, and relevant type packages.
- **GOTCHA**: Do not add scripts that depend on unavailable config files until those files exist.
- **VALIDATE**: `npm pkg get scripts`

### CREATE lib/env.ts

- **IMPLEMENT**: Define a Zod schema for `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_BASE_URL`, and `NODE_ENV`.
- **IMPLEMENT**: Export `parseEnv(input)` for tests and `env` for runtime.
- **PATTERN**: `.env.example` defines the exact env contract and `.env.local` already has matching values.
- **GOTCHA**: Do not rename variables. Do not require production-only OAuth variables in unit tests if they are intentionally blank in development.
- **VALIDATE**: `npm test -- --run tests/unit/env.test.ts`

### CREATE db/schema.ts

- **IMPLEMENT**: Define Drizzle Postgres tables for `profiles`, `links`, and `click_events`.
- **IMPLEMENT**: `profiles` fields: `id`, `userId`, `displayName`, `slug`, `bio`, `avatarUrl`, `accentColor`, `theme`, `published`, `createdAt`, `updatedAt`.
- **IMPLEMENT**: `links` fields: `id`, `profileId`, `title`, `url`, `visible`, `position`, `createdAt`, `updatedAt`.
- **IMPLEMENT**: `click_events` fields: `id`, `linkId`, `profileId`, `occurredAt`, `referrer`, `userAgent`, `ipHash`.
- **IMPLEMENT**: Add unique indexes on `profiles.userId` and `profiles.slug`; indexes for `links.profileId`, `links.profileId + position`, `click_events.linkId`, `click_events.profileId`, and `click_events.occurredAt`.
- **PATTERN**: `PRD.md:99` and `CLAUDE.md:99` define these core data concepts.
- **GOTCHA**: Do not create a local `users` table unless Neon Auth requires it. User identity is managed by Neon Auth; app tables should store a stable `userId` reference.
- **VALIDATE**: `npm run db:generate`

### CREATE drizzle.config.ts

- **IMPLEMENT**: Configure Drizzle Kit with `dialect: "postgresql"`, `schema: "./db/schema.ts"`, migration output under `./db/migrations`, and `DATABASE_URL` loaded from `.env.local` or `.env`.
- **IMPORTS**: Use `defineConfig` from `drizzle-kit`; load env with `dotenv/config` or equivalent.
- **GOTCHA**: `DATABASE_URL` already exists in `.env.local`; use that exact name for migrations.
- **VALIDATE**: `npm run db:check`

### CREATE lib/db.ts

- **IMPLEMENT**: Create a Neon HTTP client using `neon(env.DATABASE_URL)` and wrap it with `drizzle(sql, { schema })`.
- **IMPORTS**: `neon` from `@neondatabase/serverless`, `drizzle` from `drizzle-orm/neon-http`, schema from `@/db/schema`, env from `@/lib/env`.
- **PATTERN**: Neon docs show serverless `neon(process.env.DATABASE_URL)` and Drizzle `drizzle(sql)`.
- **GOTCHA**: Keep this server-only. Do not import `lib/db.ts` into client components.
- **VALIDATE**: `npm run build`

### CREATE lib/auth/server.ts

- **IMPLEMENT**: Create the Neon Auth server helper using `createNeonAuth` with `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET`.
- **IMPORTS**: `createNeonAuth` from `@neondatabase/auth/next/server`, env from `@/lib/env`.
- **PATTERN**: Neon Auth docs show `lib/auth/server.ts` and `auth.handler()`.
- **GOTCHA**: Neon Auth with Better Auth is beta; verify package import names against the installed version before finalizing.
- **VALIDATE**: `npm run build`

### CREATE app/api/auth/[...path]/route.ts

- **IMPLEMENT**: Re-export Neon Auth handler methods: `export const { GET, POST } = auth.handler();`.
- **PATTERN**: Neon Auth docs use this route shape for Next.js.
- **GOTCHA**: Route segment must be `[...path]` so nested auth paths resolve.
- **VALIDATE**: `npm run build`

### CREATE health endpoints

- **IMPLEMENT**: Add `app/api/health/route.ts` returning `{ "status": "healthy" }`.
- **IMPLEMENT**: Add `app/api/health/db/route.ts` that runs a minimal database query such as `select 1` and returns healthy/unhealthy JSON without leaking raw secrets.
- **PATTERN**: Phase 1 validation requires app runs locally and DB can be tested.
- **GOTCHA**: Since `.env.local` already contains `DATABASE_URL`, this endpoint should be testable immediately after implementation.
- **VALIDATE**: `npm run build`

### CREATE lib/urls.ts

- **IMPLEMENT**: Add `normalizeSlug(input)`, `isValidSlug(slug)`, `parsePublicSlug(input)`, and `parseSafeOutboundUrl(input)`.
- **IMPLEMENT**: Slugs should lowercase, trim, collapse whitespace/separators into hyphens, strip unsupported characters, and enforce a practical length range.
- **IMPLEMENT**: Outbound URLs should allow only `http:` and `https:`.
- **PATTERN**: `PRD.md:175` requires slugs normalized to lowercase URL-safe strings.
- **GOTCHA**: Do not silently accept `javascript:`, `data:`, protocol-relative URLs, or relative URLs for outbound links.
- **VALIDATE**: `npm test -- --run tests/unit/urls.test.ts`

### CREATE lib/validation.ts

- **IMPLEMENT**: Add Zod schemas for profile input, link input, link reorder payload, and public slug params.
- **PATTERN**: `CLAUDE.md:121` requires server validation for slugs, URLs, required profile fields, and link order payloads.
- **GOTCHA**: Keep messages concise and actionable.
- **VALIDATE**: `npm test -- --run tests/unit/validation.test.ts`

### CREATE base UI primitives

- **IMPLEMENT**: Add `components/ui/button.tsx`, `input.tsx`, `label.tsx`, and `card.tsx`.
- **PATTERN**: `PRD.md:456` requires base UI primitives.
- **GOTCHA**: Keep cards to actual framed components; do not style full page sections as cards. Use accessible focus states and support `className` extension.
- **VALIDATE**: `npm run lint`

### CREATE minimal routes

- **IMPLEMENT**: `app/page.tsx` should provide a simple product-aware entry point with links to `/dashboard`, `/b/demo`, and `/api/health`.
- **IMPLEMENT**: `app/(dashboard)/dashboard/page.tsx` should call the auth server helper or session method available in the installed Neon Auth SDK and render a minimal authenticated/unauthenticated state.
- **IMPLEMENT**: `app/b/[slug]/page.tsx` should validate the slug param and return a placeholder for valid slugs; full database rendering belongs to Phase 3.
- **PATTERN**: `CLAUDE.md:91` requires public pages by slug and dashboard routes requiring auth.
- **GOTCHA**: If robust route protection requires middleware beyond current docs, create `middleware.ts`; otherwise document this as a Phase 2 hardening task.
- **VALIDATE**: `npm run build`

### CREATE unit tests

- **IMPLEMENT**: Add Vitest config if needed and tests under `tests/unit/`.
- **IMPLEMENT**: Cover env parsing success/failure, slug normalization, slug validation, URL validation, profile schema, link schema, and reorder schema.
- **PATTERN**: `CLAUDE.md:142` expects focused tests after initialization.
- **GOTCHA**: Do not require a live Neon database for unit tests.
- **VALIDATE**: `npm test`

### RUN migration using existing .env.local

- **IMPLEMENT**: Run migrations against the configured Neon database using `DATABASE_URL` from `.env.local`.
- **PATTERN**: `PRD.md:463` requires schema can be migrated from a clean database.
- **GOTCHA**: Do not print connection strings. If migration fails, report the error class and file/command context without exposing credentials.
- **VALIDATE**: `npm run db:migrate`

### RUN Vercel Agent Browser CLI setup

- **IMPLEMENT**: Confirm platform support and install/prepare `agent-browser` if needed.
- **COMMANDS**:

```bash
uname -s
agent-browser --version
agent-browser install --with-deps
agent-browser --version
```

- **GOTCHA**: If `agent-browser` is not installed, install it with `npm install -g agent-browser`. If global install requires permission, request approval and continue after installation.
- **VALIDATE**: `agent-browser --version`

### RUN local app for browser validation

- **IMPLEMENT**: Start the app with existing `.env.local` values.
- **COMMANDS**:

```bash
npm run dev
```

- **IMPLEMENT**: Use `NEXT_PUBLIC_BASE_URL` to derive the local URL. If it is `localhost:3000`, test `http://localhost:3000`.
- **GOTCHA**: Keep the dev server running until all browser validation completes.
- **VALIDATE**: `curl -s http://localhost:3000/api/health`

### RUN Phase 1 E2E journey: initial load and navigation

- **IMPLEMENT**: Use Vercel Agent Browser CLI to validate the app loads, screenshots are captured, navigation works, and no JS errors appear.
- **COMMANDS**:

```bash
mkdir -p e2e-screenshots/phase-1
agent-browser open http://localhost:3000
agent-browser wait --load networkidle
agent-browser screenshot e2e-screenshots/phase-1/00-home-initial.png
agent-browser snapshot -i
agent-browser console
agent-browser errors
agent-browser click @eN
agent-browser wait --load networkidle
agent-browser screenshot e2e-screenshots/phase-1/01-after-primary-navigation.png
agent-browser get url
```

- **EXPECTED**:
  - Home page renders without layout breakage.
  - Primary navigation target works.
  - Console and browser errors are empty or only contain known harmless development messages.
- **GOTCHA**: Replace `@eN` with the actual ref from `agent-browser snapshot -i`. Re-run `snapshot -i` after every navigation because refs become stale.
- **VALIDATE**: Screenshot exists and visually confirms a usable first screen.

### RUN Phase 1 E2E journey: health endpoints

- **IMPLEMENT**: Validate health endpoints from the browser and terminal.
- **COMMANDS**:

```bash
agent-browser open http://localhost:3000/api/health
agent-browser wait --load networkidle
agent-browser screenshot e2e-screenshots/phase-1/02-health.png
curl -s http://localhost:3000/api/health
agent-browser open http://localhost:3000/api/health/db
agent-browser wait --load networkidle
agent-browser screenshot e2e-screenshots/phase-1/03-db-health.png
curl -s http://localhost:3000/api/health/db
```

- **EXPECTED**:
  - `/api/health` returns healthy JSON.
  - `/api/health/db` returns healthy JSON using `DATABASE_URL` from `.env.local`.
  - No secret values are displayed.
- **VALIDATE**: DB health confirms database connectivity after migration.

### RUN Phase 1 E2E journey: dashboard auth state

- **IMPLEMENT**: Validate that `/dashboard` renders an auth-aware state and provides a path to sign in or shows current authenticated state depending on Neon Auth session.
- **COMMANDS**:

```bash
agent-browser open http://localhost:3000/dashboard
agent-browser wait --load networkidle
agent-browser screenshot e2e-screenshots/phase-1/04-dashboard-auth-state.png
agent-browser snapshot -i
agent-browser console
agent-browser errors
```

- **OPTIONAL AUTH FLOW**:
  - If the dashboard exposes a sign-in control and Neon Auth shared development credentials/OAuth are available, click the sign-in control, complete the auth flow, wait for redirect back to `/dashboard`, and capture:

```bash
agent-browser screenshot e2e-screenshots/phase-1/05-dashboard-authenticated.png
agent-browser state save e2e-screenshots/phase-1/auth-state.json
```

- **EXPECTED**:
  - Unauthenticated state is understandable and not broken.
  - Authenticated state can be tested if Neon Auth flow is available.
  - No private user ID is exposed in visible public UI.
- **VALIDATE**: Screenshot confirms auth-state UI.

### RUN Phase 1 E2E journey: public slug scaffold

- **IMPLEMENT**: Validate public route scaffold and invalid slug handling.
- **COMMANDS**:

```bash
agent-browser open http://localhost:3000/b/demo
agent-browser wait --load networkidle
agent-browser screenshot e2e-screenshots/phase-1/06-public-demo-slug.png
agent-browser snapshot -i
agent-browser open http://localhost:3000/b/INVALID%20SLUG
agent-browser wait --load networkidle
agent-browser screenshot e2e-screenshots/phase-1/07-public-invalid-slug.png
agent-browser get url
agent-browser console
agent-browser errors
```

- **EXPECTED**:
  - Valid scaffold route renders a clean placeholder.
  - Invalid slug is rejected, normalized, or handled intentionally according to `lib/urls.ts` and route behavior.
  - No broken layout or raw stack trace appears.
- **VALIDATE**: Screenshots confirm valid and invalid public route behavior.

### RUN responsive screenshot validation

- **IMPLEMENT**: Test key Phase 1 pages at mobile, tablet, and desktop sizes.
- **COMMANDS**:

```bash
agent-browser set viewport 375 812
agent-browser open http://localhost:3000
agent-browser screenshot e2e-screenshots/phase-1/08-mobile-home.png
agent-browser open http://localhost:3000/dashboard
agent-browser screenshot e2e-screenshots/phase-1/09-mobile-dashboard.png
agent-browser open http://localhost:3000/b/demo
agent-browser screenshot e2e-screenshots/phase-1/10-mobile-public-demo.png

agent-browser set viewport 768 1024
agent-browser open http://localhost:3000
agent-browser screenshot e2e-screenshots/phase-1/11-tablet-home.png
agent-browser open http://localhost:3000/dashboard
agent-browser screenshot e2e-screenshots/phase-1/12-tablet-dashboard.png
agent-browser open http://localhost:3000/b/demo
agent-browser screenshot e2e-screenshots/phase-1/13-tablet-public-demo.png

agent-browser set viewport 1440 900
agent-browser open http://localhost:3000
agent-browser screenshot e2e-screenshots/phase-1/14-desktop-home.png
agent-browser open http://localhost:3000/dashboard
agent-browser screenshot e2e-screenshots/phase-1/15-desktop-dashboard.png
agent-browser open http://localhost:3000/b/demo
agent-browser screenshot e2e-screenshots/phase-1/16-desktop-public-demo.png
```

- **EXPECTED**:
  - No horizontal overflow.
  - Text does not overlap controls.
  - Buttons/links are usable on mobile.
  - Layout is not visually broken at common viewport sizes.
- **VALIDATE**: Analyze every screenshot before marking E2E complete.

### RUN database verification after migration

- **IMPLEMENT**: Verify migration created expected tables using `DATABASE_URL` from `.env.local`.
- **COMMANDS**:

```bash
psql "$DATABASE_URL" -c "\\dt"
psql "$DATABASE_URL" -c "select table_name from information_schema.tables where table_schema = 'public' order by table_name;"
psql "$DATABASE_URL" -c "select indexname, tablename from pg_indexes where schemaname = 'public' order by tablename, indexname;"
```

- **EXPECTED**:
  - `profiles`, `links`, and `click_events` exist.
  - Unique indexes and lookup indexes exist.
- **GOTCHA**: If the shell has not loaded `.env.local`, run these through the app's env loader or use a safe command that exports keys without printing values.
- **VALIDATE**: DB query output confirms schema.

### UPDATE README.md

- **IMPLEMENT**: Document prerequisites, env setup, install, dev server, lint/test/build, migration generation, migration apply, health endpoints, and Agent Browser E2E workflow.
- **PATTERN**: `CLAUDE.md:185` lists env setup and product requirements as on-demand context.
- **GOTCHA**: State that `.env.local` already has the expected keys for local validation, but never include values.
- **VALIDATE**: `test -f README.md && rg "npm run dev|npm run db:migrate|DATABASE_URL|agent-browser" README.md`

### UPDATE CLAUDE.md

- **IMPLEMENT**: Replace pre-implementation language with actual initialized project state.
- **IMPLEMENT**: Record actual scripts from `package.json`, test framework, migration workflow, env variable contract, and Agent Browser E2E validation workflow.
- **PATTERN**: `CLAUDE.md:195` says to update this file when app structure, package manager, scripts, or architecture decisions change.
- **GOTCHA**: Preserve existing security and MVP alignment guidance.
- **VALIDATE**: `rg "npm run dev|npm run build|npm test|npm run db:migrate|agent-browser" CLAUDE.md`

### RUN final validation

- **IMPLEMENT**: Run the complete command set and fix failures.
- **VALIDATE**: `npm run lint`
- **VALIDATE**: `npm test`
- **VALIDATE**: `npm run build`
- **VALIDATE**: `npm run db:check`
- **VALIDATE**: `npm run db:migrate`
- **VALIDATE**: `npm run dev`
- **VALIDATE**: `agent-browser close`

---

## TESTING STRATEGY

### Unit Tests

Use Vitest for fast TypeScript unit tests. Keep Phase 1 tests focused on pure helpers:

- `tests/unit/env.test.ts`: required env values, missing values, local base URL normalization, optional OAuth values.
- `tests/unit/urls.test.ts`: slug normalization, invalid slug rejection, allowed outbound `http`/`https`, rejection of `javascript:`, `data:`, protocol-relative, relative, empty, and malformed URLs.
- `tests/unit/validation.test.ts`: profile required fields, slug format, bio length, accent color format, link title/url/visibility, reorder payload shape.

### Integration Tests

- `npm run build` verifies App Router, route handlers, imports, and server/client boundaries.
- `npm run db:migrate` verifies schema applies using `DATABASE_URL` from `.env.local`.
- `app/api/health/db` verifies runtime database connectivity.

### E2E Browser Tests With Vercel Agent Browser CLI

Use the Vercel Agent Browser CLI after implementation, migration, and dev server startup. Save all screenshots under `e2e-screenshots/phase-1/`.

Required journeys:

1. Home page load and navigation:
   - Open `/`.
   - Capture initial screenshot.
   - Snapshot interactive elements.
   - Navigate to primary route.
   - Capture post-navigation screenshot.
   - Check console/errors.

2. Health endpoints:
   - Open `/api/health`.
   - Capture screenshot.
   - Open `/api/health/db`.
   - Capture screenshot.
   - Confirm DB health uses `.env.local` `DATABASE_URL`.

3. Dashboard auth state:
   - Open `/dashboard`.
   - Capture unauthenticated or authenticated state.
   - If sign-in flow is available, complete it and capture authenticated state.
   - Save auth state if useful for later phases.

4. Public slug scaffold:
   - Open `/b/demo`.
   - Capture valid scaffold state.
   - Open an invalid slug path.
   - Capture invalid/404/normalized behavior.

5. Responsive pass:
   - Test `/`, `/dashboard`, and `/b/demo` at `375x812`, `768x1024`, and `1440x900`.
   - Capture screenshots for every page and viewport.
   - Inspect for overflow, overlap, unreadable text, clipped controls, and broken alignment.

During every journey:

- Run `agent-browser snapshot -i` before interactions.
- Re-run snapshots after navigation or DOM changes because refs become stale.
- Run `agent-browser console` and `agent-browser errors`.
- Capture screenshots after each meaningful step.
- Visually inspect screenshots before marking the journey complete.
- Fix any broken UI or runtime issue found, then re-run the failing journey and capture replacement screenshots.

### Edge Cases

- Missing `DATABASE_URL`.
- Missing `NEON_AUTH_BASE_URL`.
- Missing or too-short `NEON_AUTH_COOKIE_SECRET`.
- `NEXT_PUBLIC_BASE_URL` is `localhost:3000` without protocol.
- Slugs with uppercase, spaces, repeated separators, symbols, empty strings, and too-long values.
- URLs using `javascript:`, `data:`, `ftp:`, protocol-relative `//example.com`, relative `/path`, and malformed values.
- Drizzle migration errors on a previously migrated database.
- Neon Auth SDK import names differ due to beta API changes.

---

## VALIDATION COMMANDS

Execute every command to ensure zero regressions and feature correctness.

### Level 1: Syntax & Style

```bash
npm run lint
```

### Level 2: Unit Tests

```bash
npm test
```

### Level 3: Build

```bash
npm run build
```

### Level 4: Database/Migration

Use `.env.local` values without printing secrets.

```bash
npm run db:generate
npm run db:check
npm run db:migrate
curl -s http://localhost:3000/api/health/db
```

### Level 5: Vercel Agent Browser CLI E2E

```bash
agent-browser --version
agent-browser install --with-deps
npm run dev
agent-browser open http://localhost:3000
agent-browser wait --load networkidle
agent-browser screenshot e2e-screenshots/phase-1/00-home-initial.png
agent-browser snapshot -i
agent-browser console
agent-browser errors
```

Then execute the exact browser journeys listed in the step-by-step tasks:

- Home load/navigation screenshots.
- `/api/health` and `/api/health/db` screenshots.
- `/dashboard` auth-state screenshots.
- `/b/demo` and invalid slug screenshots.
- Responsive screenshots for `/`, `/dashboard`, and `/b/demo` at mobile, tablet, and desktop.

### Level 6: Manual Review

Review all screenshots in `e2e-screenshots/phase-1/` and confirm:

- UI is readable and aligned.
- No elements overlap.
- Text fits in controls.
- Mobile viewport has no horizontal overflow.
- Auth, health, and public scaffold states are understandable.
- Console/errors do not reveal runtime failures.

---

## ACCEPTANCE CRITERIA

- [ ] Next.js App Router TypeScript app exists at repo root.
- [ ] npm scripts exist for dev, build, start, lint, test, and Drizzle migration workflows.
- [ ] Tailwind CSS and base UI primitives are configured.
- [ ] Neon database connection uses `DATABASE_URL` exactly.
- [ ] Neon Auth setup uses `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET` exactly.
- [ ] `NEXT_PUBLIC_BASE_URL` is supported exactly as defined in `.env.example`.
- [ ] Env validation exists and covers all `.env.example` variables.
- [ ] Drizzle schema defines profiles, links, and click events with appropriate uniqueness and indexes.
- [ ] SQL migrations are generated under `db/migrations/`.
- [ ] `npm run db:migrate` runs using existing `.env.local` values.
- [ ] Health endpoints exist for app and DB checks.
- [ ] Slug and outbound URL helpers exist and are unit tested.
- [ ] Profile/link validation schemas exist and are unit tested.
- [ ] README documents local setup, env contract, migration, and Agent Browser E2E validation.
- [ ] `CLAUDE.md` reflects the actual initialized project state.
- [ ] `npm run lint`, `npm test`, and `npm run build` pass.
- [ ] Vercel Agent Browser CLI journeys pass with screenshots saved under `e2e-screenshots/phase-1/`.
- [ ] Screenshots have been visually reviewed for UI quality and responsive behavior.

---

## COMPLETION CHECKLIST

- [ ] All tasks completed in order.
- [ ] Each task validation passed immediately after completion.
- [ ] All validation commands executed successfully.
- [ ] Full unit test suite passes.
- [ ] No linting or type checking errors.
- [ ] Database migration succeeds using `.env.local`.
- [ ] Dev server runs locally.
- [ ] Agent Browser E2E journeys are completed.
- [ ] Screenshots are captured and reviewed.
- [ ] Browser console/errors are checked.
- [ ] Acceptance criteria all met.
- [ ] Code reviewed for maintainability and alignment with `PRD.md`.

---

## NOTES

- Use npm because `CLAUDE.md` already defines npm command expectations.
- Prefer root-level `app/` instead of `src/app/` to match the repo docs.
- Use Drizzle codebase-first schema plus generated SQL migrations.
- Neon Auth is beta in the referenced docs. Verify SDK signatures during implementation before assuming examples are final.
- The existing `.agents/skills/init-project/SKILL.md` currently describes a FastAPI/uv workflow. Do not follow it for this app unless the product direction changes.
- Do not build Phase 2 functionality in this phase. Keep profile bootstrap, link CRUD, preview, and analytics UI for later implementation plans.

## Confidence Score

9/10 for one-pass implementation now that `.env.local` already contains the expected variables and the plan requires exact Agent Browser validation.

Primary confidence risks:

- Neon Auth beta SDK API may differ from the docs or installed version.
- `create-next-app` may not initialize directly in a non-empty repo, requiring the temporary-directory copy fallback.
- Browser-auth completion depends on the exact Neon Auth development/OAuth state, but the unauthenticated dashboard state can still be tested.
