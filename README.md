# Link-in-Bio Page Builder

Phase 1 initializes a runnable Next.js App Router foundation for the Link-in-Bio Page Builder MVP. It includes TypeScript, Tailwind CSS, ESLint, Vitest, Neon Postgres, Neon Auth, Drizzle ORM, shared validation helpers, base UI primitives, health checks, and migration-ready schema.

## Prerequisites

- Node.js 20.9 or newer
- npm
- Access to the Neon database and auth values in `.env.local`
- `psql` for direct database verification
- `agent-browser` for browser validation screenshots

## Environment

Copy `.env.example` to `.env.local` if you are setting up a new machine. This workspace already has `.env.local` with the expected keys:

```dotenv
DATABASE_URL=
NEON_AUTH_BASE_URL=
NEON_AUTH_COOKIE_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_BASE_URL=localhost:3000
```

Do not rename these variables. `DATABASE_URL` is used by Drizzle, runtime database access, DB health checks, and verification queries. `NEXT_PUBLIC_BASE_URL` may be `localhost:3000`; app helpers normalize it to `http://localhost:3000` when a full origin is required.

## Install And Run

```bash
npm install
npm run dev
```

The local app runs at `http://localhost:3000` by default.

## Scripts

```bash
npm run dev        # start the local Next.js dev server
npm run build      # production build
npm run start      # start the production server
npm run lint       # run ESLint
npm run lint:fix   # run ESLint with fixes
npm test           # run Vitest unit tests
npm run test:watch # run Vitest in watch mode
npm run db:generate
npm run db:check
npm run db:migrate
npm run db:studio
```

## Database

Drizzle schema lives in `db/schema.ts`. Generated migrations live in `db/migrations/`.

```bash
npm run db:generate
npm run db:check
npm run db:migrate
```

The Phase 1 schema creates:

- `profiles`
- `links`
- `click_events`

Use `.env.local` values without printing secrets when running direct database checks.

## Health Checks

With the dev server running:

```bash
curl -s http://localhost:3000/api/health
curl -s http://localhost:3000/api/health/db
```

`/api/health/db` performs a minimal database query and returns a sanitized healthy/unhealthy response.

## Browser Validation

Install or prepare the Vercel Agent Browser CLI:

```bash
agent-browser --version
agent-browser install --with-deps
```

Run the app:

```bash
npm run dev
```

Save screenshots under `e2e-screenshots/phase-1/` while validating:

- `/`
- `/dashboard`
- `/api/health`
- `/api/health/db`
- `/b/demo`
- `/b/INVALID%20SLUG`

Also capture responsive screenshots for `/`, `/dashboard`, and `/b/demo` at `375x812`, `768x1024`, and `1440x900`.
