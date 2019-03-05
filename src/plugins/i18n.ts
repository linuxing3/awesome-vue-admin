import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages (): LocaleMessages {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const erpLocales = require.context('../models/ERPModels', true, /\.json$/)

  const messages: LocaleMessages = {}

  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })

  erpLocales.keys().forEach((fileName: string) => {
    const fieldConfig = erpModels(fileName)['fields']
    fieldConfig.reduce((fields, field) => {
      fields['cn'][field['fieldname']] = field['i18n']['cn'] || ''
      return fields
    }, messages)
  })

  return messages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
