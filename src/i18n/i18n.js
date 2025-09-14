import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ru from './ru.json';
import uz from './uz.json';

// Function to determine the initial language
const getInitialLanguage = () => {
  // 1. Check localStorage for a saved language
  const savedLang = localStorage.getItem('i18nextLng');
  if (savedLang && ['en', 'ru', 'uz'].includes(savedLang)) {
    return savedLang;
  }

  // 2. Check the browser's language setting
  const browserLang = navigator.language.split('-')[0];
  if (['ru', 'uz'].includes(browserLang)) {
    return browserLang;
  }

  // 3. Default to English
  return 'en';
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
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

// When the language changes, save it to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
