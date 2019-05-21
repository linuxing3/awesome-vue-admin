import Vue from 'vue'
import Vuex from 'vuex'
import plugins from '@/store/plugins'
import getters from './getters'
import app from '@/pages/App/modules/app'
import permission from '@/pages/Permission/modules/permission'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins,
  modules: {
    app,
    permission
  },
  getters
})
