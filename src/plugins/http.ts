import Vue, { VueConstructor } from 'vue'
import axios from 'axios'

const VueAxios = {
  install (Vue: VueConstructor, args?) {
    Vue.prototype.$http = axios
  }
}

Vue.use(VueAxios)

export default VueAxios
