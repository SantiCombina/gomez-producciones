# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server
pnpm devsafe          # Clean .next and start fresh dev server (use when caching issues occur)
pnpm build            # Build for production
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix ESLint issues
pnpm generate:types   # Regenerate Payload CMS TypeScript types (run after modifying collections)
pnpm generate:importmap # Regenerate Payload import map
```

## Architecture

This is a **Next.js 15 + Payload CMS 3** news portal. The two systems coexist in the same Next.js app using route groups:

- `src/app/(frontend)/` — Public-facing pages (Server Components)
- `src/app/(payload)/` — Payload admin panel and API routes (`/admin`, `/api`)

**Data flow:** Frontend pages call server actions (via `next-safe-action`) → server actions call Payload's local API client (`src/lib/payload.ts`) → PostgreSQL on Neon.

### Key directories

| Path | Purpose |
|------|---------|
| `src/collections/` | Payload CMS collection definitions (Posts, Users, Media, ArticleLabels, Advertisements) |
| `src/app/services/post.ts` | Direct Payload queries used by server actions |
| `src/app/(frontend)/actions/` | Server actions (validated with Zod + `next-safe-action`) |
| `src/components/` | React components grouped by page/feature |
| `src/components/ui/` | shadcn/ui components (New York style) |
| `src/lib/` | Shared utilities: `payload.ts` (client), `safe-action-client.ts`, `date-utils.ts` |
| `src/payload.config.ts` | Central Payload config (DB, storage, collections, locale) |
| `src/payload-types.ts` | Auto-generated — do not edit manually |

### Payload CMS collections

- **Posts** — News articles with title, description, category (→ ArticleLabels), and featuredImage (→ Media)
- **Users** — Auth-enabled; roles: `admin` | `user`
- **Media** — Uploaded files served via Uploadthing
- **ArticleLabels** — Categories for posts
- **Advertisements** — Banner ads with image, link, and `isActive` flag

After modifying any collection, run `pnpm generate:types` to keep `payload-types.ts` in sync.

### Tech stack

- **Framework:** Next.js 15 (Turbopack in dev), React 19
- **CMS:** Payload CMS 3 with Lexical rich text editor
- **Database:** PostgreSQL via Neon (`@payloadcms/db-postgres`)
- **Storage:** Uploadthing for media uploads
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York, neutral base, Lucide icons)
- **Forms/Validation:** React Hook Form + Zod
- **Server actions:** `next-safe-action` with Zod validation middleware
- **Package manager:** pnpm

### Environment variables

Required in `.env.local`:
```
DATABASE_URI=       # Neon PostgreSQL connection string
PAYLOAD_SECRET=     # Payload CMS secret
UPLOADTHING_TOKEN=  # Uploadthing API token
```
