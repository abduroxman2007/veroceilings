# Deploying veroceilings.uz

This describes the **actual current architecture**: a real Next.js 16 SSR/hybrid
app (App Router, middleware, API routes, a Supabase-backed admin dashboard).
There is no static export and no prerender step — `next build` produces a
`.next/` output that must be served by a persistent Node process (`next
start`), not a static file server.

If you're reading an older version of this file that mentions
`scripts/prerender.js`, Puppeteer, or `serve -s build`: that described a
prior Create-React-App-based iteration of this site. That architecture, and
the `deploy/nginx.conf` / `deploy/apache.conf` / `deploy/Dockerfile.example`
files that assumed it, no longer exist — they described serving a static
HTML tree, which cannot run this app's middleware, API routes, or SSR pages.

## What the real setup requires

1. **Build:** `npm ci && npm run build` (plain `next build`, Turbopack). No
   `postbuild` step, no browser automation, no CRA.
2. **Run:** `npm run start` (`next start`) as a **persistent Node process**.
   Locale routing (`middleware.ts`), the admin auth gate, API routes
   (`/api/track`), and Server Actions all require a live server — none of
   this works from a static file host.
3. **Environment variables** must be present in that process's environment
   (see the table in [README.md](README.md)): at minimum
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`.
4. **Process supervision:** run it under PM2 (or similar) so it survives a
   crash or VPS reboot, e.g.:
   ```bash
   pm2 start npm --name vero-frontend -- start
   pm2 save
   ```
5. **Reverse proxy:** terminate TLS and forward to the Node port — a pure
   `reverse_proxy` / `proxy_pass`, not `try_files` against a build directory.

## Known production infrastructure (as of the last time this was checked over SSH)

- **Caddy** (`/etc/caddy/Caddyfile`) is the single reverse proxy for the box,
  shared with other unrelated sites/services (smartops.uz, n8n, Huly, a
  Moodle install). veroceilings.uz's block should be a plain
  `reverse_proxy 127.0.0.1:8001` — nothing else is needed on the Caddy side
  for a Next.js SSR app (no locale routing logic belongs in Caddy; that's
  `middleware.ts`'s job).
  **This file is shared with other services — always back it up and run
  `caddy validate` before reloading.**
- **PM2** runs the process as `vero-frontend`. Make sure its start command is
  `next start` (via `npm run start`, or `next start -p 8001` directly) — if
  it's still configured as `serve -s build`, that's the stale CRA-era config
  and needs to be replaced.

Re-verify both of these before your next deploy — infrastructure notes go
stale fast and this file cannot see the live server.

## Deploy sequence

1. Merge to `main`, push.
2. On the server: `git pull`, `npm ci`, `npm run build`.
3. `pm2 restart vero-frontend` (after confirming its start command is
   `next start`, not `serve`).
4. Smoke-test before walking away:
   ```bash
   curl -sI https://veroceilings.uz/ | grep -i location   # -> /uz, 308
   curl -s https://veroceilings.uz/uz | grep -o '<title>[^<]*</title>'
   curl -s -o /dev/null -w '%{http_code}' https://veroceilings.uz/uz/totally-fake-path  # -> 404
   ```

## CI/CD

There is none right now — no GitHub Actions, no Vercel/Netlify config.
Deployment is the manual sequence above. If that becomes painful, the build
step (`npm ci && npm run build`) is a natural fit for a simple GitHub Actions
workflow that SSHes in and runs steps 2–3.

## After deploying

- Submit `https://veroceilings.uz/sitemap.xml` in both Google Search Console
  and Yandex Webmaster.
- Verify the domain in Yandex Webmaster and set `NEXT_PUBLIC_YANDEX_VERIFICATION`
  in the server's environment (see README) — this is not done yet.
