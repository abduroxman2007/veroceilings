import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import products from '../product-data';
import { SITE_URL } from '../seo-schema';
import { LOCALES, DEFAULT_LOCALE } from '../i18n/locales';

/**
 * Keeps <title>, the meta description, the canonical URL, hreflang
 * alternates and the social-share tags in step with the current route AND
 * the active locale.
 *
 * Previously App.js set one site-wide title from `seo.title`, so /products,
 * /about and /contact all shared a single title tag — the strongest on-page
 * ranking signal, spent once for the whole site. Now every route has its own
 * title, and every route has three URLs (one per locale) instead of one URL
 * shared across languages — see SEO-AUDIT.md section 1.1.
 *
 * This runs after hydration, so on its own it only helps crawlers that
 * execute JavaScript. scripts/prerender.js bakes the same tags into the
 * static HTML served on first byte, which is what covers Yandex and
 * non-JS social-share scrapers (Telegram, WhatsApp, Facebook).
 */

// Route path (locale-stripped) -> key under seo.pages in the translation files.
const PAGE_KEYS = {
  '/products': 'products',
  '/projects': 'projects',
  '/about': 'about',
  '/contact': 'contact',
  '/faq': 'faq',
  '/architects': 'architects',
};

/**
 * Updates a <meta> tag identified by `selector`, creating it if it doesn't
 * exist yet. public/index.html seeds all of these for the homepage so real
 * browsers and crawlers never see a gap, but this no longer *depends* on
 * that seeding — a route rendered somewhere that started from a bare
 * <div id="root"> (a test environment, or a future entry point) still ends
 * up with correct tags rather than silently doing nothing.
 */
const setMeta = (selector, value, attrs) => {
  if (!value) return;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs || {}).forEach(([key, v]) => el.setAttribute(key, v));
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

const setCanonical = (href) => {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

/** Swap the leading /:locale segment of `path` for `locale`. `path` must
 * already have its own locale segment stripped (i.e. start with / or be ''). */
const withLocale = (locale, path) => `/${locale}${path === '/' ? '' : path}`;

const setHreflangLinks = (localePathNoPrefix) => {
  const head = document.head;

  document.querySelectorAll('link[data-hreflang]').forEach((el) => el.remove());

  const entries = [
    ...LOCALES.map((loc) => [loc, withLocale(loc, localePathNoPrefix)]),
    ['x-default', withLocale(DEFAULT_LOCALE, localePathNoPrefix)],
  ];

  entries.forEach(([hreflang, path]) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    link.setAttribute('href', `${SITE_URL}${path}`);
    link.setAttribute('data-hreflang', 'true');
    head.appendChild(link);
  });
};

const RouteMeta = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { locale } = useParams();

  useEffect(() => {
    if (!LOCALES.includes(locale)) return; // NotFound handles this case.

    // Strip the /:locale prefix and any trailing slash so "/uz/products/"
    // and "/uz/products" agree, and so PAGE_KEYS/productMatch below don't
    // need to know about locales at all.
    let path = pathname.slice(locale.length + 1) || '/';
    path = path.length > 1 ? path.replace(/\/+$/, '') : path;

    let title = t('seo.title');
    let description = t('seo.description');

    const productMatch = path.match(/^\/products\/(.+)$/);

    if (productMatch) {
      const product = products.find((p) => p.id === productMatch[1]);
      if (product) {
        // Follow the [keyword] + [geo] + [brand] pattern used across the site.
        const name = t(`products.${product.id}.title`);
        title = `${name} — Toshkent | Vero Ceilings`;
        description = t(`products.${product.id}.description`, {
          defaultValue: description,
        });
      }
    } else if (PAGE_KEYS[path]) {
      const key = PAGE_KEYS[path];
      // Fall back to the site-wide strings if a page block is missing.
      title = t(`seo.pages.${key}.title`, { defaultValue: title });
      description = t(`seo.pages.${key}.description`, { defaultValue: description });
    }

    const canonical = `${SITE_URL}${withLocale(locale, path)}`;

    document.title = title;
    setMeta('#meta-description', description, { id: 'meta-description', name: 'description' });
    setMeta('#meta-keywords', t('seo.keywords'), { id: 'meta-keywords', name: 'keywords' });

    setMeta('#meta-og-title', title, { id: 'meta-og-title', property: 'og:title' });
    setMeta('#meta-og-description', description, { id: 'meta-og-description', property: 'og:description' });
    setMeta('#meta-twitter-title', title, { id: 'meta-twitter-title', name: 'twitter:title' });
    setMeta('#meta-twitter-description', description, { id: 'meta-twitter-description', name: 'twitter:description' });
    setMeta('meta[property="og:url"]', canonical, { property: 'og:url' });

    setCanonical(canonical);

    setHreflangLinks(path);

    // The static template hardcodes lang="uz"; correct it once the real
    // language is known so screen readers and translation tools agree.
    document.documentElement.setAttribute('lang', locale);
  }, [pathname, locale, i18n.language, t]);

  return null;
};

export default RouteMeta;
