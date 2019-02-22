import Vue, { VueConstructor } from 'vue'
import { join } from 'path'
import { remote, shell } from 'electron'
import { pathExistsSync, mkdirpSync } from 'fs-extra'

export interface VueElectronPlugin {
  install: Function
}

if ((window as any).$app === 'undefined') {
  (window as any).$app = remote.app
  (window as any).$shell = shell
}

const VueElectron: VueElectronPlugin = {
  install (Vue: VueConstructor, args?) {
    const userDataDir = join(remote.app.getPath('userData'), 'data')
    if (!pathExistsSync(dbPath)) mkdirpSync(userDataDir)

    const templateDir = join(remote.app.getPath('home'), 'Documents/template')
    if (!pathExistsSync(templateDir)) mkdirpSync(templateDir)

    Vue.prototype.$app = remote.app
    Vue.prototype.$shell = shell
  }
}

export default VueElectron
