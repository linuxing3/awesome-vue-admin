import Vue, { VueConstructor } from 'vue'
import { remote, shell } from 'electron'

const VueElectron = {
  install (Vue: VueConstructor, args?) {
    Vue.prototype.$app = remote.app
    Vue.prototype.$shell = shell
  }
}

Vue.use(VueElectron)

export default VueElectron
