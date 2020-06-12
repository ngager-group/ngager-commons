import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourceSv from './resources-sv';
import resourceEn from './resources-en';

export const resources = {
  'en-GB': {
    translations: resourceEn,
  },
  'sv-SE': {
    translations: resourceSv,
  },
};
// console.log('navigator.language', navigator.language);
i18n.use(initReactI18next).init({
  interpolation: {
    // React already does escaping
    escapeValue: false,
  },
  // load: 'languageOnly',
  lng: navigator.language || navigator.userLanguage,
  fallbackLng: 'en-GB',
  // debug: true,
  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false, // we use content as keys
  resources,
});

export default i18n;
