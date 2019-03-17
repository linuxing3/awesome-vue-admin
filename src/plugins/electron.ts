import Vue, { VueConstructor } from 'vue'
import { join } from 'path'
import { remote, shell } from 'electron'
import { pathExistsSync, mkdirpSync } from 'fs-extra'

export interface VueElectronPlugin {
  install: Function
}

/**
 * if (window.$app === 'undefined') {
 *   window.$app = remote.app
 *   window.$shell = shell
 * }
 */

const VueElectron: VueElectronPlugin = {
  install (Vue: VueConstructor, args?) {
    const userDataDir = join(remote.app.getPath('userData'), 'data')
    if (!pathExistsSync(userDataDir)) mkdirpSync(userDataDir)

    const templateDir = join(remote.app.getPath('home'), 'Documents/template')
    if (!pathExistsSync(templateDir)) mkdirpSync(templateDir)

    Vue.prototype.$app = remote.app
    Vue.prototype.$shell = shell
  }
}

export default VueElectron
