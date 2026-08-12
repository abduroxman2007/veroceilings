/* eslint-disable no-console */
/**
 * Prerendering step. Runs after `react-scripts build` (see the `postbuild`
 * script in package.json) and turns the single client-rendered build/index.html
 * into real, per-route, per-locale static HTML — build/uz/index.html,
 * build/ru/products/index.html, build/en/products/grilyato/index.html, etc.
 *
 * Why this exists at all: the app is a client-side-rendered React SPA. Before
 * this step, every URL served the same empty <div id="root"></div> shell,
 * and the correct <title>/meta/content only appeared after JavaScript ran
 * (src/components/RouteMeta.js). Google eventually renders JS and picks that
 * up, on a delayed, separate rendering pass — but Yandex (a large share of
 * Russian-language search in Uzbekistan) does not reliably render JS at all,
 * and link-preview scrapers (Telegram, WhatsApp, Facebook) never do. This
 * script produces the same static HTML for those visitors that a real
 * browser produces after running the app's own JavaScript — nothing here is
 * invented or duplicated; it is a headless real browser (Chromium, via
 * Puppeteer) visiting the actual built app and saving what it actually
 * renders. src/index.js then hydrates onto that saved markup for real users,
 * rather than discarding it and rendering from scratch.
 *
 * Requires a Chromium/Chrome binary — see README section "Prerendering" for
 * how to provide one. This script does not download a browser itself.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const { ROOT, LOCALES, buildRoutes } = require('./routes');

const BUILD_DIR = path.join(ROOT, 'build');
const PORT = process.env.PRERENDER_PORT ? Number(process.env.PRERENDER_PORT) : 45123;
const DRY_RUN = process.argv.includes('--dry-run');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
};

/**
 * Serves build/ as-is, falling back to build/index.html for any path that
 * isn't an existing file — the standard SPA pattern, needed here so that
 * routes not yet written by an earlier iteration of this same run (or any
 * route added later that this script doesn't yet know about) still render
 * correctly via client-side routing when Puppeteer visits them, instead of
 * getting a raw 404 from this throwaway local server. What ships to
 * production is governed separately by nginx.conf/apache.conf, which do the
 * opposite (no fallback, real 404) — see DEPLOY.md.
 */
function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const reqPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(BUILD_DIR, reqPath);

      const serveFile = (fp) => {
        fs.readFile(fp, (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end(String(err));
            return;
          }
          const ext = path.extname(fp).toLowerCase();
          res.writeHead(200, {
            'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
            'Cache-Control': 'no-store',
          });
          res.end(data);
        });
      };

      fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
          serveFile(filePath);
          return;
        }
        if (!err && stats.isDirectory()) {
          const indexPath = path.join(filePath, 'index.html');
          fs.stat(indexPath, (err2, stats2) => {
            if (!err2 && stats2.isFile()) {
              serveFile(indexPath);
            } else {
              serveFile(path.join(BUILD_DIR, 'index.html'));
            }
          });
          return;
        }
        serveFile(path.join(BUILD_DIR, 'index.html'));
      });
    });

    server.on('error', reject);
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

function findExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;

  const candidates = [
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
  ];
  return candidates.find((p) => fs.existsSync(p)) || null;
}

function urlPathFor(locale, routePath) {
  return `/${locale}${routePath === '/' ? '' : routePath}`;
}

function outputFileFor(locale, routePath) {
  const dir = routePath === '/' ? path.join(BUILD_DIR, locale) : path.join(BUILD_DIR, locale, routePath);
  return path.join(dir, 'index.html');
}

async function renderPage(browser, url) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // RouteMeta.js sets document.title in a useEffect after the route
    // resolves; waiting for a non-empty title (rather than a fixed sleep) is
    // the actual signal that the client-side render — including RouteMeta,
    // hreflang tags, and JsonLd — has finished, and is what makes this
    // reliable across pages with very different amounts of work to do.
    await page.waitForFunction(() => document.title && document.title.length > 0, { timeout: 10000 });

    const html = await page.content();
    const title = await page.title();
    return { html, title };
  } finally {
    await page.close();
  }
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('build/ not found — run `react-scripts build` before prerendering.');
    process.exitCode = 1;
    return;
  }

  const routes = buildRoutes();
  const targets = LOCALES.flatMap((locale) => routes.map((route) => ({ locale, route })));

  console.log(`Prerendering ${targets.length} pages (${routes.length} routes x ${LOCALES.length} locales)...`);

  if (DRY_RUN) {
    targets.forEach(({ locale, route }) => {
      console.log(`[dry-run] ${urlPathFor(locale, route.path)} -> ${path.relative(ROOT, outputFileFor(locale, route.path))}`);
    });
    console.log('Dry run complete — no browser launched, no files written.');
    return;
  }

  // Two ways to get a browser, tried in order:
  //
  // 1. `puppeteer` (the full package, if installed) — it downloads and
  //    manages its own known-good Chromium build, no system package or
  //    executablePath needed. This is the right choice whenever the machine
  //    running the build has normal internet access (a real server, a CI
  //    runner) — which is the common case. It's what's actually installed
  //    for this project's deployment.
  //
  // 2. `puppeteer-core` + an explicit PUPPETEER_EXECUTABLE_PATH or a system
  //    Chromium/Chrome found in a common install location — for restricted
  //    environments where downloading a browser isn't possible (this is the
  //    path a sandboxed CI step or a minimal Docker image would use).
  let puppeteer;
  let launchOptions;

  try {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    puppeteer = require('puppeteer');
    launchOptions = { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] };
    console.log('Using puppeteer\'s bundled Chromium.');
  } catch {
    const executablePath = findExecutablePath();
    if (!executablePath) {
      console.error(
        'No browser available. Either `npm install puppeteer` (downloads its own\n' +
        'Chromium — needs normal internet access) or set PUPPETEER_EXECUTABLE_PATH\n' +
        'to a system Chromium/Chrome and keep puppeteer-core, e.g.\n' +
        '  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium npm run build:prod'
      );
      process.exitCode = 1;
      return;
    }
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    puppeteer = require('puppeteer-core');
    launchOptions = { executablePath, headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] };
    console.log(`Using system browser at ${executablePath}.`);
  }

  const server = await startServer();
  const browser = await puppeteer.launch(launchOptions);

  let failures = 0;

  try {
    for (const { locale, route } of targets) {
      const url = `http://127.0.0.1:${PORT}${urlPathFor(locale, route.path)}`;
      const outFile = outputFileFor(locale, route.path);
      try {
        const { html, title } = await renderPage(browser, url);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, html, 'utf8');
        console.log(`  ✓ ${urlPathFor(locale, route.path)}  "${title}"  -> ${path.relative(ROOT, outFile)}`);
      } catch (err) {
        failures += 1;
        console.error(`  ✗ ${urlPathFor(locale, route.path)}  ${err.message}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failures > 0) {
    console.error(`\n${failures} page(s) failed to prerender. Failing the build rather than shipping partial/stale static output.`);
    process.exitCode = 1;
    return;
  }

  console.log(`\nDone — ${targets.length} pages prerendered.`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}

module.exports = { startServer, urlPathFor, outputFileFor };
