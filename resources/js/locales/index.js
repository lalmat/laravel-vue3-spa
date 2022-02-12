// Import vue-i18n
import { createI18n } from 'vue-i18n/index.js'

// Import language files
import fr from './fr_FR/index.js'

// Create internationalization manager
export default createI18n({
  locale: 'fr', // set default locale
  messages: {
    fr
  }
})
