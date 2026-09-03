# Vero Ceilings — veroceilings.uz

Marketing site + admin panel for Vero Ceilings, a suspended-ceiling
manufacturer in Tashkent. Server-rendered Next.js app, trilingual (Uzbek /
Russian / English), backed by Supabase.

## Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript), Turbopack
- **i18n:** `next-intl`, locale-prefixed routing (`/uz`, `/ru`, `/en`), Uzbek is the default
- **Database & auth:** Supabase (Postgres, Row Level Security, Storage) — see `supabase/migrations/`
- **Styling:** plain CSS (`app/[locale]/globals.css`) + inline styles, no Tailwind
- **Validation:** Zod
- **Lead pipeline:** Server Actions (`lib/actions/`) → Supabase `inquiries` table, optional Telegram bot alert

This is a real SSR/hybrid app (`next build` + `next start`) — there is no
static export and no prerender step. Product/project/content data lives in
Supabase, with hardcoded fallbacks in `lib/data/static-products.ts` and
`lib/db/*.ts` used only when Supabase isn't configured (e.g. a fresh local
clone with no `.env.local` yet).

## Project layout

```
app/[locale]/       Public site — one route per page, generateMetadata per page
app/admin/          Admin dashboard, gated by middleware.ts (real Supabase session check)
app/api/track/      Public first-party pageview beacon (rate-limited, no auth by design)
app/sitemap.ts       Dynamic sitemap.xml
app/robots.ts        Dynamic robots.txt
i18n/                next-intl routing config + navigation helpers (Link/usePathname wrappers)
lib/actions/         Server Actions — the only path that writes to Supabase from the public site
lib/db/              Data-access functions (Supabase primary, static fallback)
lib/seo/             Shared metadata builder + JSON-LD schema builders
components/          UI, organized by admin / layout / sections / seo / templates / ui
messages/            next-intl translation catalogs: uz.json, ru.json, en.json
supabase/migrations/ SQL migrations, applied in order against the Supabase project
scripts/             One-off ops scripts (seed.ts, create-admin.ts) — not part of the build
```

## Local setup

```bash
npm install
cp .env.local.example .env.local   # fill in the Supabase project values below
npm run dev
```

### Required environment variables (`.env.local`)

| Variable | Used by | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Admin dashboard, Server Actions, `scripts/seed.ts`, `scripts/create-admin.ts`. Never exposed to the client — confined to `lib/supabase/server.ts` and server-only callers. |

### Optional

| Variable | Used by | Notes |
|---|---|---|
| `TG_BOT_TOKEN` / `TG_CHAT_ID` | `lib/actions/index.ts` | Telegram alert on new leads. Missing = the alert is silently skipped, nothing breaks. |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | `app/[locale]/layout.tsx` | Yandex Webmaster site-verification meta tag. Get the real token by verifying the domain at https://webmaster.yandex.com — the tag is omitted entirely until this is set. |

### One-time ops scripts

```bash
npx tsx scripts/seed.ts                          # push static content into an empty Supabase project
npx tsx scripts/create-admin.ts <email> <password>  # create/reset an /admin login
```

## Scripts

```bash
npm run dev     # next dev
npm run build   # next build
npm run start   # next start — a real persistent Node server, required in production
npm run lint    # eslint .
```

## Deployment

See [DEPLOY.md](DEPLOY.md) — this needs a persistent Node process (`next start`)
behind a reverse proxy, not a static file server.
