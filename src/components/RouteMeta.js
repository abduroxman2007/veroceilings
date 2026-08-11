import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import products from '../product-data';
import { SITE_URL } from '../seo-schema';

/**
 * Keeps <title>, the meta description, the canonical URL and the social-share
 * tags in step with the current route AND the active language.
 *
 * Previously App.js set one site-wide title from `seo.title`, so /products,
 * /about and /contact all shared a single title tag — the strongest on-page
 * ranking signal, spent once for the whole site.
 *
 * This runs after hydration, so it only helps crawlers that execute JavaScript.
 * The static fallback in public/index.html covers the rest until the site
 * serves pre-rendered per-route HTML.
 */

// Route path -> key under seo.pages in the translation files.
const PAGE_KEYS = {
  '/products': 'products',
  '/projects': 'projects',
  '/about': 'about',
  '/contact': 'contact',
  '/faq': 'faq',
  '/architects': 'architects',
};

const setMeta = (selector, value) => {
  if (!value) return;
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', value);
};

const RouteMeta = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    // Normalise a trailing slash so "/products/" and "/products" agree.
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

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

    const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;

    document.title = title;
    setMeta('#meta-description', description);
    setMeta('#meta-keywords', t('seo.keywords'));

    setMeta('#meta-og-title', title);
    setMeta('#meta-og-description', description);
    setMeta('#meta-twitter-title', title);
    setMeta('#meta-twitter-description', description);
    setMeta('meta[property="og:url"]', canonical);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', canonical);

    // The static template hardcodes lang="uz"; correct it once the real
    // language is known so screen readers and translation tools agree.
    document.documentElement.setAttribute('lang', i18n.language);
  }, [pathname, i18n.language, t]);

  return null;
};

export default RouteMeta;
