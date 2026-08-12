import { forwardRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DEFAULT_LOCALE } from '../i18n/locales';

/**
 * Drop-in replacement for react-router-dom's <Link>. Every internal link in
 * this app was written as `to="/products"` from before locale-prefixed
 * routing existed. Swapping the import (not the JSX) keeps every call site
 * unchanged while making every link locale-aware: on /ru/... it renders
 * to="/ru/products", on /uz/... it renders to="/uz/products".
 *
 * External links and anchors (tel:, mailto:, http(s)://) pass through the
 * `<a>` tag directly at their call sites and never go through this component.
 */
const LocalizedLink = forwardRef(({ to, locale: localeOverride, ...props }, ref) => {
  const { locale: paramLocale } = useParams();
  const locale = localeOverride || paramLocale || DEFAULT_LOCALE;

  let target = to;
  if (typeof to === 'string') {
    target = to === '/' ? `/${locale}` : `/${locale}${to}`;
  } else if (to && typeof to === 'object' && typeof to.pathname === 'string') {
    target = { ...to, pathname: to.pathname === '/' ? `/${locale}` : `/${locale}${to.pathname}` };
  }

  return <Link ref={ref} to={target} {...props} />;
});

export default LocalizedLink;
