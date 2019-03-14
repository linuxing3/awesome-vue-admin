import Vue from 'vue'
// import App from './App.vue'
import App from './components.tsx/App/App'
import router from './router'
import store from './store'

import './plugins/vuetify'
import './plugins/reactivex'
import './plugins/echarts'
import i18n from './plugins/i18n'

import './components'

import { validateMixin } from './mixins/globalMixin'
Vue.mixin(validateMixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
