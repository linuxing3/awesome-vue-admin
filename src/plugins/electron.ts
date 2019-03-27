import { join } from 'path'
import { pathExistsSync, mkdirpSync } from 'fs-extra'
import Vue, { VueConstructor } from 'vue'
import { remote, shell, app } from 'electron'

const VueElectron = {
  install (Vue: VueConstructor, args?) {
    // 获取文件路径

    let electronApp = process.type === 'renderer' ? remote.app : app
    const dbPath = join(electronApp.getPath('userData'), 'data') || '/public/data'

    if (!pathExistsSync(dbPath)) mkdirpSync(dbPath)

    Vue.prototype.$app = remote.app
    Vue.prototype.$shell = shell
  }
}

Vue.use(VueElectron)

export default VueElectron
