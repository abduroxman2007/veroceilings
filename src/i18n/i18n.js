import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ru from './ru.json';
import uz from './uz.json';
import { LOCALES, DEFAULT_LOCALE } from './locales';

// Function to determine the initial language
const getInitialLanguage = () => {
  // 1. The URL is the source of truth once locale-prefixed routing exists
  //    (/uz/..., /ru/..., /en/...). Reading it here — before React or the
  //    router has mounted — means the very first paint already shows the
  //    right language instead of flashing the localStorage/browser guess
  //    and then correcting a tick later. It also means a prerendered
  //    /ru/products/grilyato page reliably prerenders as Russian, not
  //    whatever was last saved to localStorage during the crawl.
  if (typeof window !== 'undefined') {
    const segment = window.location.pathname.split('/')[1];
    if (LOCALES.includes(segment)) {
      return segment;
    }
  }

  // 2. Saved preference. Only reached for "/" itself, which immediately
  //    redirects to a locale-prefixed URL — see App.js.
  const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
  if (savedLang && LOCALES.includes(savedLang)) {
    return savedLang;
  }

  // 3. Browser language.
  const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : '';
  if (['ru', 'en'].includes(browserLang)) {
    return browserLang;
  }

  // 4. Uzbek — priority-1 language for this market (see SEO-AUDIT.md).
  return DEFAULT_LOCALE;
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      uz: { translation: uz }
    },
    lng: getInitialLanguage(), // Set language dynamically
    fallbackLng: DEFAULT_LOCALE,
    interpolation: { escapeValue: false }
  });

// When the language changes, save it to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
