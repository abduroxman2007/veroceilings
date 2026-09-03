# SEO status — veroceilings.uz

Last verified against the live codebase: 2026-09-03. This replaces an earlier
audit written against the pre-migration Create-React-App site (empty
`<title>`, no locale routing, no sitemap) — none of that applies anymore.
The site is now a Next.js 16 SSR app with real locale routing. This file
tracks what's actually done vs. what's still open, so it doesn't go stale
the way the old one did.

## Done — technical foundation

- Locale-prefixed routing `/uz` (default), `/ru`, `/en`; bare `/` and all
  legacy bare paths 301/308-redirect to their `/uz` equivalent.
- Per-locale, server-rendered `<title>`/`<meta description>` on every page
  via `generateMetadata` — verified distinct real copy per locale, not
  duplicated placeholders.
- Canonical tags and full hreflang (uz/ru/en/x-default) on every page.
- Open Graph + Twitter Card metadata, including per-product images.
- JSON-LD: Organization/LocalBusiness (sitewide), WebSite, Product,
  BreadcrumbList (product pages), FAQPage.
- `robots.txt` (dynamic, `app/robots.ts`) with a `Sitemap:` directive and
  `/admin` + `/api` disallowed for all crawlers, Yandex explicitly welcomed.
- `sitemap.xml` (dynamic, `app/sitemap.ts`) covering every static route and
  every product × all 3 locales, with hreflang alternates and a real
  per-product `lastModified` sourced from the database.
- Real HTTP 404s for unknown paths (no soft-404).
- Language switcher renders real crawlable `<a href>` links (via next-intl's
  `Link`), not a JS-only toggle.
- Keyword-based product URL slugs (`grilyato`, `metalarmstrong`, etc.), not
  opaque IDs.
- Descriptive, localized image alt text on product/project photos.
- Google Search Console verification (meta tag + HTML file).
- `next/image` used everywhere, including the page-header hero banners on
  all 8 top-level routes (previously raw CSS `background:url()`, so they
  bypassed optimization entirely).

## Open — needs a real value from the business, not code

These are wired up in code but need input only the business can provide —
don't fill these with placeholder/fabricated data:

- **Yandex Webmaster verification.** Verify `veroceilings.uz` at
  https://webmaster.yandex.com, then set `NEXT_PUBLIC_YANDEX_VERIFICATION`
  in the server's environment — the meta tag renders automatically once
  that's set (`app/[locale]/layout.tsx`). Not done yet. This matters
  specifically because Yandex carries meaningful Russian-language search
  share in this market.
- **Sitemap submission.** Submit `https://veroceilings.uz/sitemap.xml` in
  both Google Search Console and Yandex Webmaster after the next deploy.
  Nothing in the codebase can confirm this has happened.

## Open — content depth (the actual gap holding back rankings)

Confirmed thin in **both** Uzbek and Russian equally — this is a content
gap, not a translation gap:

- **No published pricing anywhere**, despite SEO copy actively targeting
  "narxi"/"цена" queries — every path currently ends in "call for a quote."
  This is normally the highest-intent query class in this category.
- **Product pages run roughly 100–150 words**; competitive commercial terms
  in this category typically need real long-form content (specs prose, use
  cases, installation notes, FAQs) well beyond that.
- **No project case-study pages.** The Supabase `projects` table already has
  real named objects (location, ceiling type, year, area) — `/projects`
  only renders a photo lightbox with none of that surfaced as content or
  given its own URL.
- **No comparison content** (e.g. Grilyato vs. Armstrong).
- **No written installation guide** — only YouTube embeds with one-sentence
  captions.
- **No dedicated certification/fire-safety page** — a few sentences buried
  in FAQ/About copy only.
- **No regional city landing pages** (Samarkand, Bukhara, Namangan, etc.),
  despite the site claiming nationwide delivery — low-competition
  opportunity, currently untapped.
- **No blog/news section** — there's a newsletter *signup* mechanism, not an
  editorial content section, so no ongoing freshness signal.

The calculator (`/calculator`, materials-only, no pricing) is fully built
and localized in both languages — it's the one piece of this list that's
already strong.

## Off-platform (not code, do these directly)

- Google Business Profile — create/verify, post project photos regularly.
- Yandex Business — the RU-language equivalent, non-negotiable for this
  market per the note above.
- Marketplace listings (Prom.uz, Glotr.uz, Flagma.uz, Stroyka.uz, Vibo.uz) —
  backlinks plus direct enquiries.
- Realistic timeline once content lands: brand/long-tail Uzbek terms in
  4–8 weeks, competitive Uzbek terms in 2–4 months, competitive Russian
  terms (higher search volume, more entrenched competition) in 6–12+ months.
  Ranking is never guaranteed by any of the above — this is what puts the
  odds in your favor, not a promise of a specific position.
