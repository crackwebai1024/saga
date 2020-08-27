import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import AmplitudeService from 'services/amplitude';

const { REACT_APP_STAGE } = process.env;
const isDevelopment = REACT_APP_STAGE === 'development';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // resources,
    lng: 'en-US',
    fallbackLng: 'en-US',
    debug: isDevelopment,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      checkWhitelist: true,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

i18n.on('languageChanged', (lng) => AmplitudeService.logEvent('Language has been chaged', { language: lng }));

export default i18n;
