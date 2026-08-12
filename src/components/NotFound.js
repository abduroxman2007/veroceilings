import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_LOCALE } from '../i18n/locales';

/**
 * Rendered for genuinely invalid URLs (bad locale segment, or — once the
 * prerender step ships — any path that has no static file on the server and
 * therefore never reaches React at all in production; see nginx.conf /
 * apache.conf). This client-side version exists as a fallback for anyone
 * who reaches it via client-side navigation while already on the page.
 *
 * Deliberately not localized through i18next: this page can be reached
 * before a valid locale is known, so it carries its own minimal trilingual
 * copy rather than depending on translation keys that may not resolve.
 */
const NotFound = () => {
  useEffect(() => {
    document.title = 'Sahifa topilmadi / Страница не найдена / Page not found — Vero Ceilings';
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, follow');
  }, []);

  return (
    <div style={{ padding: '80px 20px', textAlign: 'center', minHeight: '50vh' }}>
      <h1>404</h1>
      <p>Sahifa topilmadi. / Страница не найдена. / Page not found.</p>
      <p>
        <Link to={`/${DEFAULT_LOCALE}`}>Bosh sahifaga qaytish</Link>
      </p>
    </div>
  );
};

export default NotFound;
