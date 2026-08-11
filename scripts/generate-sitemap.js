/* eslint-disable no-console */
/**
 * Generates public/sitemap.xml. Runs automatically via the `prebuild` script.
 *
 * IMPORTANT — no hreflang alternates are emitted yet.
 * The site currently serves all three languages from a single set of URLs
 * (language is chosen at runtime from localStorage), so /uz/, /ru/ and /en/ do
 * not exist. Declaring hreflang for URLs that 404 is worse than declaring none.
 * When locale-prefixed routing ships, set LOCALES below and the generator will
 * emit one <url> per locale with reciprocal <xhtml:link> alternates.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://veroceilings.uz';
const ROOT = path.join(__dirname, '..');
const OUT_FILE = path.join(ROOT, 'public', 'sitemap.xml');

// Set to e.g. ['uz', 'ru', 'en'] once locale-prefixed routes exist.
const LOCALES = [];

/**
 * product-data.js imports image binaries through webpack, so it cannot be
 * require()d from plain Node. Read the product ids out of the source instead.
 */
function readProductIds() {
  const source = fs.readFileSync(path.join(ROOT, 'src', 'product-data.js'), 'utf8');
  const ids = [...source.matchAll(/^\s*id:\s*'([^']+)'/gm)].map((m) => m[1]);

  if (!ids.length) {
    throw new Error(
      'No product ids found in src/product-data.js — the sitemap would be ' +
      'missing every product page. Check that the `id:` field format has not changed.'
    );
  }
  return ids;
}

function buildRoutes() {
  const productIds = readProductIds();

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/products', priority: '0.9', changefreq: 'weekly' },
    { path: '/projects', priority: '0.8', changefreq: 'monthly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/architects', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  ];

  const productRoutes = productIds.map((id) => ({
    path: `/products/${id}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  return [...staticRoutes, ...productRoutes];
}

function urlEntry(route, lastmod) {
  const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;

  const alternates = LOCALES.map((locale) => {
    const href = `${SITE_URL}/${locale}${route.path === '/' ? '/' : route.path}`;
    return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>`;
  });

  if (LOCALES.length) {
    const xDefault = `${SITE_URL}/${LOCALES[0]}${route.path === '/' ? '/' : route.path}`;
    alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>`);
  }

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

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...routes.map((route) => urlEntry(route, lastmod)),
    '</urlset>',
    '',
  ].join('\n');

  fs.writeFileSync(OUT_FILE, xml, 'utf8');
  console.log(`sitemap.xml written with ${routes.length} URLs -> ${OUT_FILE}`);
}

main();
