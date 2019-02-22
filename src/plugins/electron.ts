import Vue, { VueConstructor } from 'vue'
import { remote, shell } from 'electron'
import { pathExistsSync, mkdirpSync } from 'fs-extra'

export interface VueElectronPlugin {
  install: Function
  version: string
}

if (windows && window.$app === 'undefined') {
  window.$app = remote.app
  window.$shell = shell
}

const VueElectron: VueElectronPlugin = {
  install (Vue: VueConstructor, args?) {
    const userDataDir = join(remote.app.getPath('userData'), 'data')
    if (!pathExistsSync(dbPath)) mkdirpSync(userDataDir)

    const templateDir = join(remote.app.getPath('home'), 'Documents/template')
    if (!pathExistsSync(templateDir)) mkdirpSync(templateDir)

    Vue.prototype.$app = remote.app
    Vue.prototype.$shell = shell
  },
  version: env.process.__VUE_ELECTRON_VERSION__
}

export default VueElectron
