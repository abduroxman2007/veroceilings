/**
 * Single source of truth for "what pages exist", shared by
 * generate-sitemap.js and prerender.js so the sitemap and the actually
 * generated static files can never drift apart — if a route is added to one
 * without the other, that mismatch has historically been a real class of SEO
 * bug (sitemap promising URLs that don't exist, or generated pages missing
 * from the sitemap).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LOCALES = ['uz', 'ru', 'en'];
const DEFAULT_LOCALE = 'uz';

/**
 * product-data.js imports image binaries through webpack, so it cannot be
 * require()d from plain Node. Read the product ids out of the source instead.
 */
function readProductIds() {
  const source = fs.readFileSync(path.join(ROOT, 'src', 'product-data.js'), 'utf8');
  const ids = [...source.matchAll(/^\s*id:\s*'([^']+)'/gm)].map((m) => m[1]);

  if (!ids.length) {
    throw new Error(
      'No product ids found in src/product-data.js — the sitemap/prerender ' +
      'would be missing every product page. Check that the `id:` field ' +
      'format has not changed.'
    );
  }
  return ids;
}

/** Locale-agnostic routes: '/' means the locale root, e.g. /uz. */
function buildRoutes() {
  const productIds = readProductIds();

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/products', priority: '0.9', changefreq: 'weekly' },
    { path: '/calculator', priority: '0.85', changefreq: 'weekly' },
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

module.exports = { ROOT, LOCALES, DEFAULT_LOCALE, buildRoutes, readProductIds };
