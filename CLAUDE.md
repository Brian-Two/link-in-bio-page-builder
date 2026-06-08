# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

This project is a full-stack Link-in-Bio Page Builder foundation. The MVP is an authenticated web app where creators can build one public link page, manage profile details and ordered links, publish updates, and view basic click analytics.

The product direction is documented in `PRD.md`. Phase 1 application code now exists at the repository root.

## Project Type

Full-stack Next.js App Router application.

- TypeScript codebase.
- Server-rendered public profile page scaffolds under `/b/[slug]`.
- Auth-aware dashboard scaffold under `/dashboard`.
- Neon Postgres persistence through Drizzle ORM.
- Neon Auth server route and helper.
- Vercel-compatible Next.js build.

## Tech Stack

| Technology | Purpose | Status |
| --- | --- | --- |
| Next.js | Full-stack routing, public pages, dashboard, API route handlers | Installed |
| React | UI components for dashboard and public pages | Installed |
| TypeScript | Type safety across frontend and backend code | Installed |
| Tailwind CSS | Utility styling and base tokens | Installed |
| Neon Postgres | Profiles, links, and analytics data | Configured through `DATABASE_URL` |
| Neon Auth | Authentication and session management | Configured through `lib/auth/server.ts` |
| Drizzle ORM | Database schema and migrations | Configured |
| Zod | Environment and domain validation | Configured |
| Vitest | Unit tests for pure helpers | Configured |
| Vercel Agent Browser CLI | E2E screenshot validation | Used for browser validation |

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build
npm run start      # production server
npm run lint       # ESLint
npm run lint:fix   # ESLint with fixes
npm test           # Vitest unit tests
npm run test:watch # Vitest watch mode
npm run db:generate
npm run db:check
npm run db:migrate
npm run db:studio
```

Before claiming validation, run only commands that actually exist in `package.json`.

## Project Structure

```text
/
├── app/
│   ├── (dashboard)/dashboard/        # Auth-aware dashboard scaffold
│   ├── b/[slug]/                     # Public profile route scaffold
│   ├── api/auth/[...path]/           # Neon Auth route handler
│   ├── api/health/                   # App health checks
│   ├── globals.css                   # Tailwind import and base tokens
│   └── layout.tsx                    # Shared app shell and metadata
├── components/
│   └── ui/                           # Shared UI primitives
├── lib/
│   ├── auth/server.ts                # Neon Auth server helper
│   ├── db.ts                         # Neon serverless + Drizzle client
│   ├── env.ts                        # Environment validation
│   ├── validation.ts                 # Shared schemas
│   └── urls.ts                       # Slug and outbound URL helpers
├── db/
│   ├── schema.ts                     # Drizzle schema
│   └── migrations/                   # Generated SQL migrations
├── tests/
│   └── unit/                         # Vitest helper tests
├── PRD.md
└── README.md
```

## Architecture

Follow a server-first architecture:

- Public pages read published profile data by slug in later phases.
- Dashboard routes must verify authentication and ownership before private data access.
- Private mutations must verify ownership on the server.
- Link click tracking should go through a redirect endpoint before sending visitors to the external URL.
- Shared validation is centralized so client forms and server mutations can enforce the same rules where practical.

Core MVP data concepts:

- `users`: identity managed by Neon Auth.
- `profiles`: one editable public page per user.
- `links`: ordered destination links owned through a profile.
- `click_events`: analytics events recorded by the redirect endpoint.

## Code Patterns

### Naming

- Use URL-safe lowercase slugs for public profile routes.
- Prefer clear domain names: `profile`, `link`, `clickEvent`, `slug`, `published`, `visible`.
- Keep route folder names aligned with product concepts, for example `dashboard` and `b/[slug]`.

### Data Access

- Centralize database access in `lib/db.ts`.
- Use Drizzle schema as the TypeScript source of truth.
- Scope private reads and writes by authenticated user ID.
- Enforce ownership in the database query, not only in UI state.
- Fetch only published and visible records for public pages.

### Validation

- Validate environment variables in `lib/env.ts`.
- Validate slugs and outbound URLs in `lib/urls.ts`.
- Validate profile, link, reorder, and public slug payloads in `lib/validation.ts`.
- Reject malformed outbound URLs and unsupported protocols.
- Keep user-facing validation messages concise and actionable.

### Auth

- Neon Auth is initialized in `lib/auth/server.ts` with `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET`.
- Auth API requests are handled by `app/api/auth/[...path]/route.ts`.
- `/dashboard` currently renders an auth-state test surface. Add route protection middleware when real private dashboard workflows are implemented.

### UI

- Build the dashboard for fast repeated editing, not as a marketing landing page.
- Keep public pages mobile-first, responsive, accessible, and fast.
- Use `components/ui` primitives before adding one-off control styles.
- Keep cards for framed repeated items, modals, or tool surfaces.

### Security

- Never commit real `.env` files or secrets.
- Use `DATABASE_URL`, `NEON_AUTH_BASE_URL`, and `NEON_AUTH_COOKIE_SECRET` exactly as documented in `.env.example`.
- Treat Google OAuth credentials as production secrets.
- Avoid exposing internal user IDs on public pages unless required.
- Redirect only to validated URLs stored for visible links on published profiles.

## Testing

Current unit coverage:

- `tests/unit/env.test.ts`
- `tests/unit/urls.test.ts`
- `tests/unit/validation.test.ts`

Expected future coverage should include:

- Authenticated dashboard access.
- Ownership checks for profile and link mutations.
- Link CRUD and ordering.
- Public rendering of published, visible links only.
- Click tracking and redirect behavior.

## Validation

Typical validation:

```bash
npm run lint
npm test
npm run build
npm run db:check
npm run db:migrate
```

For browser validation, run the dev server and use `agent-browser` to capture screenshots under `e2e-screenshots/phase-1/` for:

- Home load and dashboard navigation.
- `/api/health` and `/api/health/db`.
- `/dashboard` auth-state rendering.
- `/b/demo` and invalid slug behavior.
- Mobile, tablet, and desktop responsive passes.

## Key Files

| File | Purpose |
| --- | --- |
| `PRD.md` | Product requirements, MVP scope, architecture direction, and implementation phases |
| `.env.example` | Required environment variables for Neon database, Neon Auth, and Google OAuth |
| `db/schema.ts` | Drizzle source-of-truth schema |
| `db/migrations/` | Generated deployable SQL migrations |
| `lib/env.ts` | Environment validation |
| `lib/auth/server.ts` | Neon Auth helper |
| `lib/db.ts` | Database client |
| `lib/validation.ts` | Shared Zod schemas |
| `lib/urls.ts` | Slug and outbound URL helpers |
| `.agents/skills/` | Local agent skills used for project workflow tasks |

## Notes

- Use npm; `package-lock.json` is the locked dependency graph.
- Prefer root-level `app/`, `components/`, `lib/`, `db/`, and `tests/`.
- Existing unrelated worktree changes should not be reverted without explicit user approval.
