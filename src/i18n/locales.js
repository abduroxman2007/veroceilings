// Single source of truth for which locales exist and which one is canonical
// when no other signal is available. Uzbek is priority 1 for this market —
// see SEO-AUDIT.md — so it is both the default and the x-default hreflang
// target, not English.
export const LOCALES = ['uz', 'ru', 'en'];
export const DEFAULT_LOCALE = 'uz';

export const isValidLocale = (value) => LOCALES.includes(value);
