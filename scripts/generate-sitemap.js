/* eslint-disable no-console */
/**
 * Generates public/sitemap.xml. Runs automatically via the `prebuild` script.
 *
 * Emits one <url> entry per locale per route (three URLs per page, not one),
 * each carrying the full set of reciprocal hreflang alternates — including a
 * self-reference, which Google's guidance treats as required, not optional.
 */

const fs = require('fs');
const path = require('path');
const { ROOT, LOCALES, DEFAULT_LOCALE, buildRoutes } = require('./routes');

const SITE_URL = 'https://veroceilings.uz';
const OUT_FILE = path.join(ROOT, 'public', 'sitemap.xml');

// No trailing slash, on either the locale root or any sub-page — this has
// to match RouteMeta's canonical URLs and the actual React Router paths
// exactly, or the sitemap ends up promising URLs that differ from the ones
// each page declares as its own canonical, which is a real duplicate-content
// footgun rather than a cosmetic one.
function localeUrl(locale, routePath) {
  return `${SITE_URL}/${locale}${routePath === '/' ? '' : routePath}`;
}

function urlEntry(locale, route, lastmod) {
  const loc = localeUrl(locale, route.path);

  const alternates = [
    ...LOCALES.map((loc2) => `    <xhtml:link rel="alternate" hreflang="${loc2}" href="${localeUrl(loc2, route.path)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(DEFAULT_LOCALE, route.path)}"/>`,
  ];

  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    ...alternates,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${route.changefreq}</changefreq>`,
    `    <priority>${route.priority}</priority>`,
    '  </url>',
  ].join('\n');
}

function main() {
  const lastmod = new Date().toISOString().split('T')[0];
  const routes = buildRoutes();

  const entries = LOCALES.flatMap((locale) => routes.map((route) => urlEntry(locale, route, lastmod)));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');

  fs.writeFileSync(OUT_FILE, xml, 'utf8');
  console.log(`sitemap.xml written with ${entries.length} URLs (${routes.length} routes x ${LOCALES.length} locales) -> ${OUT_FILE}`);
}

main();
