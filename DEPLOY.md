# Deploying the prerendered build

This covers what changed on the `seo/locale-routing-prerender` branch, how
to verify it locally, and how to get it onto the VPS.

## What this branch adds, on top of `seo/foundation-fixes`

1. **Locale-prefixed routing** — every page now lives at `/uz/...`,
   `/ru/...`, and `/en/...` instead of one URL shared across all three
   languages. This is what makes per-language titles/descriptions/canonicals
   actually possible; see `SEO-AUDIT.md` section 1.1 for why the old
   single-URL setup was the root cause of the site being unindexable.
2. **A prerender step** (`scripts/prerender.js`) that runs a real headless
   Chromium against the built app and saves what it renders as static HTML,
   one file per route per locale (51 pages: 17 routes x 3 locales). This is
   what makes that content visible to crawlers that don't reliably execute
   JavaScript (Yandex) and to link-preview scrapers that never do (Telegram,
   WhatsApp, Facebook).
3. Server configs (`deploy/nginx.conf`, `deploy/apache.conf`) that serve
   those real files with real 404s for anything else, plus 301s for the old
   bare-path URLs and for `/` itself.

## What I could and couldn't verify in my own sandbox

Worth being upfront about this rather than just asserting it all works:

- **Fully verified**: the locale routing itself, via 7 automated tests in
  `src/App.routing.test.js` that render the real `LocaleLayout`,
  `RouteMeta`, `LanguageSwitcher`, `NotFound`, and legacy-redirect code (not
  mocks) through real React Router + real i18next, and assert on the actual
  resulting `<title>`, canonical, hreflang tags, and `lang` attribute. Also
  fully verified: `npm run build` succeeds end-to-end with no new errors or
  warnings, `scripts/generate-sitemap.js` produces correct per-locale
  sitemap entries, and the prerender script's static-file-serving logic
  (tested directly with real HTTP requests against the actual `build/`
  output).
- **Not verified in my sandbox**: the actual headless-Chromium capture pass
  in `scripts/prerender.js`. My sandbox has no root access and its network
  is allowlisted in a way that blocks Chromium's download host — I
  genuinely cannot launch a browser here. The script itself follows the
  standard, well-understood pattern (navigate, wait for the page to finish
  rendering, save `page.content()`), and everything it depends on (routing,
  meta tags, the static server it navigates against) is independently
  verified above — but the capture step itself needs to be run somewhere
  with normal internet access. That's the one thing below I'd actually
  ask you to check yourself.

## Verifying locally (or the VPS) — one command, ~2 minutes

You'll need a Chromium/Chrome binary available. Easiest on most machines:

```bash
npm install --legacy-peer-deps   # picks up puppeteer-core + everything else
# macOS: brew install chromium          (then find its path with `which chromium`)
# Ubuntu/Debian: sudo apt install chromium-browser
# Windows: point at your existing Chrome install, e.g.
#   C:\Program Files\Google\Chrome\Application\chrome.exe

PUPPETEER_EXECUTABLE_PATH=/path/to/chromium npm run build:prod
```

**What success looks like**: the script prints one line per page —

```
Prerendering 51 pages (17 routes x 3 locales)...
  ✓ /uz  "Vero Ceilings — Toshkentda osma shift ishlab chiqaruvchisi"  -> build/uz/index.html
  ✓ /ru  "Vero Ceilings — Современные потолочные системы в Ташкенте"  -> build/ru/index.html
  ✓ /ru/products/grilyato  "Потолки Грильято — Toshkent | Vero Ceilings"  -> build/ru/products/grilyato/index.html
  ...
Done — 51 pages prerendered.
```

then exits 0. If anything fails to render, the script prints `✗` for that
page and **exits non-zero** — it deliberately does not ship a partially-
prerendered `build/` folder, since a mix of real and stale/empty pages would
be worse than the failure being visible.

**Spot-check a couple of the output files directly** — this is the actual
proof that a non-JS crawler now sees real content:

```bash
grep -o '<title>[^<]*</title>' build/uz/index.html
grep -o '<title>[^<]*</title>' build/ru/products/grilyato/index.html
grep -c '<h1' build/ru/products/grilyato/index.html   # should be 1, with real text inside
curl -s http://localhost:PORT/ru/products/grilyato | grep -o '<title>[^<]*</title>'  # once served
```

Before this branch, every one of these would have shown an empty
`<title></title>` and no `<h1>` content at all — that's the actual bug
getting fixed, made concrete.

**dry run**, if you just want to see the target list without needing a
browser at all: `npm run prerender:dry`.

## Getting it onto the VPS

You mentioned Oracle Cloud, Ubuntu, Docker, and "probably Apache, not 100%
sure — check the compose setup." I don't have access to that repo, so
`deploy/nginx.conf`, `deploy/apache.conf`, and `deploy/Dockerfile.example`
are reference configs, not wired into anything yet. Concretely, once you've
confirmed:

1. **Which web server is actually in the container** — `docker compose exec
   <service> nginx -v` or `apache2 -v` (or check the Dockerfile's base
   image / installed packages directly).
2. **Share the actual `Dockerfile`/`docker-compose.yml`** and I'll adapt
   `deploy/nginx.conf` or `deploy/apache.conf` into it exactly, rather than
   you having to merge it by hand.

The short version of what needs to happen either way: `npm run build:prod`
needs to run inside the image (with a Chromium binary available, per
`deploy/Dockerfile.example`), and whichever web server serves the result
needs the "real files, real 404s, no blanket SPA fallback" behavior in
those reference configs — see the comments in `deploy/nginx.conf` for why
that specific detail matters (it's the difference between actually fixing
the soft-404 problem from `SEO-AUDIT.md` and just moving it).

## After it's live

- Submit `https://veroceilings.uz/sitemap.xml` in both Google Search Console
  and Yandex Webmaster.
- `curl -s https://veroceilings.uz/ | grep title` should show real Uzbek
  content, not an empty tag.
- `curl -s https://veroceilings.uz/products` should return an HTTP 301 to
  `/uz/products`, not a 200.
- `curl -s -o /dev/null -w '%{http_code}' https://veroceilings.uz/uz/totally-fake-path`
  should return 404, not 200 — this is the soft-404 fix actually holding.
