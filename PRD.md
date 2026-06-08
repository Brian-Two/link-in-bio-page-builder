# Product Requirements Document: Link-in-Bio Page Builder

## 1. Executive Summary

Link-in-Bio Page Builder is a web application that lets creators, solo operators, and small businesses create a polished public profile page with links, social destinations, and basic brand customization. The product provides a private dashboard for managing profile content and a fast public page optimized for mobile visitors.

The core value proposition is simple ownership: users can create and update a professional link hub without code, while visitors get a clean, responsive page that loads quickly and makes the creator's most important actions easy to find.

The MVP goal is to ship a reliable authenticated builder where users can create one public page, manage profile details and links, preview changes, publish updates, and view basic click analytics.

## 2. Mission

Build the simplest credible link-in-bio builder for creators who need a fast, attractive, and maintainable public destination without committing to a full website.

Core principles:

- Prioritize publishing speed: users should create a useful page in minutes.
- Keep the public page fast, responsive, and accessible.
- Make common editing workflows obvious and reversible.
- Use secure defaults for account access, page ownership, and public routing.
- Design the data model so themes, analytics, and custom domains can grow after MVP.

## 3. Target Users

Primary personas:

- Independent creator: musician, writer, podcaster, streamer, or educator who needs one place for latest content, socials, and monetization links.
- Small business owner: local service provider or boutique seller who needs a mobile-friendly landing page for Instagram, TikTok, or email signatures.
- Consultant or freelancer: professional who needs a lightweight profile with booking, portfolio, and contact links.

Technical comfort level:

- Low to moderate.
- Comfortable with social profile editing patterns.
- Not expected to understand domains, DNS, HTML, analytics scripts, or deployment.

Key needs and pain points:

- Needs a single shareable URL that can be updated without changing social bios.
- Wants a page that looks credible on mobile without hiring a designer.
- Needs to reorder, hide, and edit links quickly.
- Wants to understand which links get clicked.
- Does not want complex website builder concepts like pages, sections, CMS schemas, or hosting setup.

## 4. MVP Scope

### In Scope

Core Functionality:

- ✅ User account creation and sign-in.
- ✅ One editable public profile page per user.
- ✅ Unique public slug, for example `/b/janes-studio`.
- ✅ Profile editor for display name, bio, avatar URL or upload-ready field, accent color, and theme choice.
- ✅ Link management with create, edit, delete, reorder, hide/show, and title/URL validation.
- ✅ Public profile rendering optimized for mobile and desktop.
- ✅ Dashboard preview of the public page.
- ✅ Publish flow where saved changes are visible publicly.
- ✅ Basic click tracking per link.

Technical:

- ✅ Next.js application using TypeScript.
- ✅ Neon Postgres persistence.
- ✅ Neon Auth for authentication.
- ✅ Server-side ownership checks for all private mutations.
- ✅ Responsive UI with accessible form controls and keyboard-friendly link management.
- ✅ Seedable local/development setup using `.env.example`.

Integration:

- ✅ Google OAuth configuration for production.
- ✅ Public metadata for social sharing, including title and description.
- ✅ External URL validation and safe outbound redirects.

Deployment:

- ✅ Vercel-compatible build and runtime configuration.
- ✅ Environment-variable based configuration.
- ✅ Production database connection via `DATABASE_URL`.

### Out of Scope

Core Functionality:

- ❌ Multiple pages per account.
- ❌ Team accounts, roles, or collaboration.
- ❌ Custom domains.
- ❌ Paid subscriptions or plan limits.
- ❌ Advanced theme designer with arbitrary CSS.
- ❌ Embedded checkout, tip jars, or storefront inventory.
- ❌ Email marketing automation.

Technical:

- ❌ Native mobile apps.
- ❌ Offline editing.
- ❌ Multi-region database topology beyond managed provider defaults.
- ❌ Full analytics warehouse or event stream.

Integration:

- ❌ Stripe payments.
- ❌ CRM integrations.
- ❌ Third-party analytics script installation by users.
- ❌ Social platform API posting or sync.

Deployment:

- ❌ Self-hosting documentation beyond standard environment variables.
- ❌ Enterprise SSO.

## 5. User Stories

1. As a creator, I want to sign in securely, so that only I can edit my public profile.
   Example: A musician signs in with Google and lands on their dashboard without managing a separate password.

2. As a creator, I want to reserve a unique slug, so that I have a stable URL to put in my social bios.
   Example: A user chooses `maria-makes` and receives a public page at `/b/maria-makes`.

3. As a creator, I want to add and reorder links, so that visitors see my most important destinations first.
   Example: A podcaster moves "Latest episode" above "Newsletter" before publishing a campaign.

4. As a creator, I want to hide a link without deleting it, so that I can reuse seasonal or limited-time links later.
   Example: A shop owner hides "Holiday sale" after the promotion ends.

5. As a creator, I want to customize basic branding, so that my page feels aligned with my identity.
   Example: A consultant sets their name, short bio, avatar, and accent color.

6. As a visitor, I want the public page to load quickly on mobile, so that I can open the intended destination without friction.
   Example: A visitor taps the link from Instagram and sees the key buttons without horizontal scrolling or layout shift.

7. As a creator, I want to see link click counts, so that I can understand which destinations are working.
   Example: A user compares clicks on "Book a call" and "Download guide" over the last 30 days.

8. As a developer, I want clear ownership boundaries in the API and database, so that one user's dashboard can never modify another user's profile.
   Example: Link update mutations always filter by the authenticated user's profile ID.

## 6. Core Architecture & Patterns

High-level approach:

- Full-stack Next.js application with server-rendered public pages and authenticated dashboard routes.
- Neon Postgres as the system of record.
- Neon Auth for account identity and session management.
- Public pages rendered from published profile data.
- Dashboard routes guarded by authentication and ownership checks.

Proposed directory structure:

```text
/
├── app/
│   ├── (dashboard)/dashboard/        # Authenticated editor and analytics
│   ├── b/[slug]/                     # Public profile pages
│   ├── api/                          # Route handlers for mutations and redirects
│   └── layout.tsx                    # Shared app shell and metadata
├── components/
│   ├── dashboard/                    # Builder, forms, link manager
│   ├── public-page/                  # Public profile components
│   └── ui/                           # Reusable primitives
├── lib/
│   ├── auth.ts                       # Auth helpers
│   ├── db.ts                         # Database client
│   ├── validation.ts                 # Shared schemas
│   └── urls.ts                       # Slug and outbound URL helpers
├── db/
│   ├── schema.sql                    # Database schema
│   └── seeds.ts                      # Optional development seed data
├── tests/
│   └── e2e/                          # Browser journey tests
└── PRD.md
```

Key patterns:

- Server-first data access for private and public reads.
- Form validation shared between client and server where practical.
- Mutations enforce `user_id` ownership at the database query level.
- Public route fetches only published, visible content.
- Link clicks are recorded through a redirect endpoint before sending visitors to the destination.
- Slugs are normalized to lowercase URL-safe strings and checked for uniqueness.

## 7. Tools/Features

### Authentication

Purpose: Give each creator private access to their dashboard.

Key features:

- Sign in and sign out.
- Production Google OAuth.
- Session-aware dashboard route protection.
- First-login profile bootstrap.

### Profile Builder

Purpose: Let users manage the public identity shown at the top of their page.

Fields:

- Display name.
- Public slug.
- Bio.
- Avatar URL or future upload reference.
- Accent color.
- Theme preset.
- Published status.

Validation:

- Slug must be unique, lowercase, and URL-safe.
- Display name is required.
- Bio has a reasonable character limit.
- Color values must use approved formats or selected swatches.

### Link Manager

Purpose: Let users manage destinations shown on the public page.

Operations:

- Create link.
- Edit title and URL.
- Reorder links.
- Hide or show links.
- Delete links.

Key features:

- URL validation.
- Stable sort order.
- Empty state for new users.
- Confirmation for destructive delete.
- Drag-and-drop can be added if the MVP includes accessible fallback controls.

### Public Page

Purpose: Render the visitor-facing link hub.

Key features:

- Mobile-first layout.
- Profile header.
- Visible links only.
- Social metadata.
- Accessible button labels.
- Fast server-rendered page.
- 404 for unknown slugs and unpublished pages.

### Click Analytics

Purpose: Give creators basic signal on link performance.

Key features:

- Redirect endpoint records click event.
- Aggregate counts by link.
- Dashboard summary for total clicks and per-link clicks.
- Basic date filtering can start with lifetime and 30-day totals.

## 8. Technology Stack

Recommended stack based on repository configuration:

| Layer | Technology | Purpose |
| --- | --- | --- |
| Web framework | Next.js, version pinned during project initialization | Full-stack app, routing, server rendering |
| Language | TypeScript 5+ | Type safety across frontend and backend |
| UI | React, version aligned with selected Next.js release | Dashboard and public page components |
| Database | Neon Postgres | Profiles, links, and analytics storage |
| Auth | Neon Auth | User identity and sessions |
| OAuth | Google OAuth | Production sign-in provider |
| Hosting | Vercel | Deployment target for Next.js |
| Validation | Zod or equivalent schema library | Request, form, and URL validation |
| Styling | Tailwind CSS or project-selected CSS system | Responsive UI styling |
| Testing | Playwright plus unit tests as needed | End-to-end workflows and validation |

Dependencies should be locked in `package.json` during implementation. This repository does not currently include application code or package metadata, so exact versions are intentionally deferred to the initialization phase.

## 9. Security & Configuration

Authentication and authorization:

- Neon Auth manages user identity and sessions.
- Dashboard routes require an authenticated session.
- Every profile and link mutation must verify the authenticated user owns the target record.
- Public routes must not expose private account identifiers beyond the intended slug.

Configuration management:

- `DATABASE_URL` connects to Neon Postgres.
- `NEON_AUTH_BASE_URL` configures Neon Auth.
- `NEON_AUTH_COOKIE_SECRET` signs auth cookies and must be generated securely.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are required for production OAuth.
- `.env.example` documents required variables; real `.env*` files remain ignored.

Security scope:

- In scope: authentication, ownership checks, URL validation, environment secret handling, safe redirects, basic rate-limiting consideration for click tracking.
- Out of scope for MVP: abuse detection dashboard, enterprise audit logging, custom domain TLS management, billing security, and advanced bot filtering.

Deployment considerations:

- Vercel project must define all required environment variables.
- Database migrations should run explicitly during deployment or release workflow.
- Public pages should avoid leaking stack traces or raw database errors.

## 10. API Specification

Exact route shapes may change with framework conventions, but the MVP should support these operations.

### `GET /b/[slug]`

Returns the public profile page for a published slug.

Behavior:

- `200` for a published profile.
- `404` for missing, unpublished, or disabled profiles.
- Only visible links are rendered.

### `POST /api/profile`

Creates or updates the authenticated user's profile.

Authentication: required.

Example request:

```json
{
  "displayName": "Jane Studio",
  "slug": "jane-studio",
  "bio": "Design resources and booking links.",
  "avatarUrl": "https://example.com/avatar.jpg",
  "accentColor": "#2563eb",
  "theme": "clean"
}
```

Example response:

```json
{
  "profileId": "prof_123",
  "slug": "jane-studio",
  "published": true
}
```

### `POST /api/links`

Creates a link for the authenticated user's profile.

Authentication: required.

Example request:

```json
{
  "title": "Book a consultation",
  "url": "https://cal.com/jane/intro",
  "visible": true
}
```

### `PATCH /api/links/[id]`

Updates a link owned by the authenticated user.

Authentication: required.

Example request:

```json
{
  "title": "Book a 30-minute consultation",
  "url": "https://cal.com/jane/intro",
  "visible": true
}
```

### `POST /api/links/reorder`

Updates link order for the authenticated user's profile.

Authentication: required.

Example request:

```json
{
  "orderedLinkIds": ["link_3", "link_1", "link_2"]
}
```

### `DELETE /api/links/[id]`

Deletes a link owned by the authenticated user.

Authentication: required.

### `GET /api/r/[linkId]`

Records a click and redirects to the external URL.

Behavior:

- Validates that the link is visible and belongs to a published profile.
- Records click metadata with privacy-conscious fields.
- Redirects with `302` or `307`.

## 11. Success Criteria

MVP success definition:

Users can sign in, create a public link-in-bio page, publish it, share the URL, edit content later, and see basic click counts without developer assistance.

Functional requirements:

- ✅ Authenticated user can access a dashboard.
- ✅ New user can create a profile with a unique slug.
- ✅ User can add at least one visible link.
- ✅ User can edit, reorder, hide, and delete links.
- ✅ Public page renders correctly for a published profile.
- ✅ Public page hides unpublished or invisible content.
- ✅ Redirect endpoint records clicks and sends visitors to the correct URL.
- ✅ Dashboard shows basic click counts.
- ✅ Production configuration supports Neon, Google OAuth, and Vercel.

Quality indicators:

- Public pages load quickly on mobile.
- Core dashboard forms show useful validation messages.
- Public and dashboard pages meet baseline accessibility expectations.
- Ownership tests cover profile and link mutation paths.
- Unknown slugs and unauthorized access produce appropriate errors.

User experience goals:

- A new user can publish a useful page in under 5 minutes.
- Editing links requires no page reload where client-side interaction is practical.
- Public page remains readable and usable at common mobile widths.
- Empty states guide the next action without long instructional text.

## 12. Implementation Phases

### Phase 1: Project Foundation

Goal: Initialize the application and establish database/auth foundations.

Deliverables:

- ✅ Create Next.js TypeScript app structure.
- ✅ Add styling system and base UI primitives.
- ✅ Configure Neon database connection.
- ✅ Configure Neon Auth.
- ✅ Define profile, link, and click event schema.
- ✅ Add environment variable validation.

Validation criteria:

- App runs locally with development environment variables.
- Authenticated and unauthenticated route states can be tested.
- Database schema can be migrated from a clean database.

Estimated timeline: 2-4 days.

### Phase 2: Builder MVP

Goal: Build the authenticated dashboard for profile and link management.

Deliverables:

- ✅ First-login profile bootstrap.
- ✅ Profile settings form.
- ✅ Slug validation and uniqueness checks.
- ✅ Link CRUD.
- ✅ Link visibility toggles.
- ✅ Link ordering.
- ✅ Dashboard preview.

Validation criteria:

- A user can create and edit a complete profile.
- Link operations persist correctly.
- Users cannot access or mutate records owned by another user.

Estimated timeline: 4-7 days.

### Phase 3: Public Page and Analytics

Goal: Ship the public profile experience and click tracking.

Deliverables:

- ✅ Public `/b/[slug]` page.
- ✅ Theme rendering for profile fields and links.
- ✅ Redirect endpoint for link clicks.
- ✅ Click event persistence.
- ✅ Dashboard click summaries.
- ✅ Social metadata.

Validation criteria:

- Published pages render from database content.
- Invisible links do not render publicly.
- Clicks increment counts and redirect correctly.
- Unknown or unpublished slugs return 404.

Estimated timeline: 3-5 days.

### Phase 4: Hardening and Release

Goal: Prepare the MVP for deployment and review.

Deliverables:

- ✅ Add focused unit and integration tests for validation and ownership.
- ✅ Add Playwright tests for sign-in, editing, publishing, and public click flow.
- ✅ Verify responsive layouts.
- ✅ Configure Vercel environment variables.
- ✅ Document setup and release steps.

Validation criteria:

- Build, lint, and tests pass.
- Critical user journeys pass in browser testing.
- Production deployment can load public and dashboard routes.

Estimated timeline: 2-4 days.

## 13. Future Considerations

Post-MVP enhancements:

- Multiple pages per user.
- Custom domains.
- Image uploads for avatars and backgrounds.
- Additional theme presets.
- Custom button styles and richer layout sections.
- Scheduled links and time-boxed campaigns.
- Email capture blocks.
- Stripe-powered payments, tips, or subscriptions.
- Team accounts and collaborator permissions.
- Advanced analytics with date ranges, referrers, countries, and device classes.
- Import from existing Linktree or social profiles.
- SEO controls per page.

Integration opportunities:

- Stripe for monetization.
- Resend or another email provider for notifications and email capture.
- Object storage for image uploads.
- Analytics export to CSV.
- Social preview image generation.

## 14. Risks & Mitigations

Risk: Slug squatting or namespace conflicts.

Mitigation: Reserve protected words, normalize slugs consistently, and enforce uniqueness at the database level.

Risk: Unsafe outbound URLs or redirect abuse.

Mitigation: Validate allowed URL protocols, reject malformed URLs, and redirect only to stored destinations associated with published visible links.

Risk: Analytics accuracy is affected by bots or repeated clicks.

Mitigation: Position MVP analytics as directional, store basic metadata, and add rate limiting or deduplication later if needed.

Risk: Auth and ownership mistakes expose private dashboard data.

Mitigation: Centralize auth helpers, write ownership tests, and always scope mutations by authenticated user ID.

Risk: Builder complexity grows beyond MVP.

Mitigation: Limit MVP customization to profile fields, theme presets, accent color, and ordered links.

## 15. Appendix

Existing repository signals:

- Repository name: `link-in-bio-page-builder`.
- Existing `.env.example` defines Neon database, Neon Auth, and Google OAuth variables.
- Existing `.gitignore` includes Next.js, TypeScript, Vercel, coverage, and E2E screenshot patterns.
- No application source files or package metadata are currently present.

Assumptions:

- The intended product is a hosted link-in-bio builder rather than a static page template generator.
- The app will be built with Next.js and TypeScript because the repository ignore rules already anticipate that stack.
- Neon Postgres and Neon Auth are preferred because the environment template already specifies them.
- Vercel is the intended deployment target because `.gitignore` includes `.vercel`.
- MVP users get one public page each.
