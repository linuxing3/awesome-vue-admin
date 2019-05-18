import Vue from 'vue'
import App from './App.vue'
// import App from './components.tsx/App/App'
import router from './router/index.antd'
import store from './store'

import i18n from './plugins/i18n'
import './plugins'
import './components'
import './mixins/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
