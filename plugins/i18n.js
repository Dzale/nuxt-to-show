import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
import messages from '@/locales'

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    availableLocales: store.state.locales,
    locale: store.state.locale,
    fallbackLocale: store.state.locale,
    silentTranslationWarn: process.env.NODE_ENV === 'production',
    directory:'~/locales',
    messages: messages
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
