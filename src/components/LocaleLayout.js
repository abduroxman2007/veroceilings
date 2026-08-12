import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import RouteMeta from './RouteMeta';
import NotFound from './NotFound';
import { isValidLocale } from '../i18n/locales';

/**
 * Everything under /:locale/* renders through here. Two jobs:
 *
 * 1. Keep i18next in sync with the :locale URL segment. i18n.js already
 *    resolves the *initial* language from the URL on first load; this effect
 *    covers the case where the user (or LanguageSwitcher) navigates from
 *    /ru/products to /uz/products client-side without a full page reload.
 *
 * 2. Reject invalid locale segments (/xx/products, /whatever) with a real
 *    "not found" page instead of silently redirecting them to /uz — a silent
 *    redirect would recreate exactly the soft-404 problem the audit flagged
 *    (every garbage URL quietly "succeeding"). Genuinely old bare-path links
 *    like /products are handled separately, before this route ever matches
 *    — see the legacy redirects in App.js.
 */
const LocaleLayout = () => {
  const { locale } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isValidLocale(locale) && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  if (!isValidLocale(locale)) {
    return <NotFound />;
  }

  return (
    <>
      <ScrollToTop />
      <RouteMeta />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LocaleLayout;
