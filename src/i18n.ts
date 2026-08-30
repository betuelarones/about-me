import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import en from './locales/en.json'

const storedLanguage = localStorage.getItem('preferred-language')
const navigatorLanguage = navigator.language?.toLowerCase() || 'en'
const defaultLanguage = storedLanguage || (navigatorLanguage.startsWith('es') ? 'es' : 'en')

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: defaultLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (language) => {
  localStorage.setItem('preferred-language', language)
  document.documentElement.lang = language
})

document.documentElement.lang = defaultLanguage

export default i18n
