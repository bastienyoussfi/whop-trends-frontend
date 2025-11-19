import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import enDashboard from './locales/en/dashboard.json'
import enAnalyze from './locales/en/analyze.json'

import frCommon from './locales/fr/common.json'
import frDashboard from './locales/fr/dashboard.json'
import frAnalyze from './locales/fr/analyze.json'

import esCommon from './locales/es/common.json'
import esDashboard from './locales/es/dashboard.json'
import esAnalyze from './locales/es/analyze.json'

const resources = {
  en: {
    common: enCommon,
    dashboard: enDashboard,
    analyze: enAnalyze,
  },
  fr: {
    common: frCommon,
    dashboard: frDashboard,
    analyze: frAnalyze,
  },
  es: {
    common: esCommon,
    dashboard: esDashboard,
    analyze: esAnalyze,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
