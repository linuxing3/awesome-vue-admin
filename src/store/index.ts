import Vue from 'vue'
import Vuex from 'vuex'
import plugins from '@/store/plugins'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins,
  getters
})
