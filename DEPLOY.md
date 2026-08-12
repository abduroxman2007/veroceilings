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

## The actual production setup (confirmed on the VPS, not Docker)

`deploy/nginx.conf`, `deploy/apache.conf`, and `deploy/Dockerfile.example`
were written before checking the real server and don't apply — there's no
Docker or nginx/Apache in front of the frontend at all. The real setup,
confirmed by SSHing in:

- **Caddy** (`/etc/caddy/Caddyfile`) is the single reverse proxy in front of
  everything on the box — smartops.uz, n8n, Huly, a Moodle install, and
  veroceilings.uz all share this one file. For veroceilings.uz it's
  currently a bare `reverse_proxy 127.0.0.1:8001`, no routing logic at all.
  **This file is shared infrastructure — always `cp` a backup and run
  `caddy validate` before reloading it.**
- **PM2** runs the process named `vero-frontend`: `serve -s build -l 8001`,
  cwd `/var/www/veroceiling/veroceilings`. The `-s` flag is the soft-404
  bug from `SEO-AUDIT.md` section 1.1, live, on the current site — it
  serves `index.html` with HTTP 200 for literally any path. Dropping `-s`
  (once real per-route files exist from the prerender step) is what makes
  unknown paths actually 404.
- The server checkout was on `main` at an old commit, well before any of
  this work — confirming why the live site still showed empty titles.
- No Chromium was installed, but the server has normal internet access
  (unlike the sandbox this was built in), so plain `puppeteer` — not
  `puppeteer-core` — is the right choice here: `npm install` downloads its
  own known-good Chromium, no system package or `PUPPETEER_EXECUTABLE_PATH`
  needed. `scripts/prerender.js` tries `puppeteer` first automatically and
  falls back to `puppeteer-core` + a system binary only if `puppeteer`
  isn't installed.

### Deploy sequence used

1. Merge the fix branches into `main` locally, push — the server only
   tracks `main`, matching its existing simple setup.
2. On the server, clone `main` into a **separate directory**
   (`veroceilings-staging`), `npm install`, `npm run build:prod`. This
   downloads puppeteer's Chromium (~300MB) on first install.
3. Serve the staging build on a spare port (`npx serve build -l 8002`, no
   `-s`) and verify with `curl` before touching anything live — real
   titles per locale, a legacy path 301ing, a fake path 404ing.
4. Add explicit `redir` rules to the Caddyfile's veroceilings.uz block for
   `/` → `/uz` and the legacy bare paths → their `/uz` equivalents.
   `caddy validate` before `systemctl reload caddy`.
5. Atomic swap: rename the old checkout out of the way, move the verified
   staging build into its place, so `serve`'s cwd never points at a
   half-built directory.
6. `pm2 delete vero-frontend` + recreate it with `serve build -l 8001` (no
   `-s`), then `pm2 save`.
7. Verify against the live domain, watch Search Console for a week.

Rollback at any point is: point PM2 back at the renamed-aside old
directory, or restore the Caddyfile backup and reload.

## After it's live

- Submit `https://veroceilings.uz/sitemap.xml` in both Google Search Console
  and Yandex Webmaster.
- `curl -s https://veroceilings.uz/ | grep title` should show real Uzbek
  content, not an empty tag.
- `curl -s https://veroceilings.uz/products` should return an HTTP 301 to
  `/uz/products`, not a 200.
- `curl -s -o /dev/null -w '%{http_code}' https://veroceilings.uz/uz/totally-fake-path`
  should return 404, not 200 — this is the soft-404 fix actually holding.
