import Vue from 'vue'
import App from './App.vue'
// import App from './components.tsx/App/App'
import router from './router/index.antd'
import store from './store'

import i18n from './plugins/i18n'
import './plugins'
// import './components'
import './mixins/'

import bootstrap from './core/bootstrap'
// import './permission' // permission control

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
