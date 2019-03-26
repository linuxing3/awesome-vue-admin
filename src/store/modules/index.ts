/**
 * 自动注册全部的数据模型
 * Modules is object to hold
 * {
 *   "user" : [user: User extends Model]
 * }
 */
import * as Vuex from 'vuex'

import { toLower } from 'lodash'
export interface Modules {
  [name: string]: Vuex.Module<any, any>
}

let requiredModules: RequireContext = require.context('.', false, /\.ts$/)
let modules: Modules = {}

requiredModules.keys().forEach(key => {
  if (key === './index.ts') return
  let modelName = toLower(key.replace(/(\.\/|\.ts)/g, ''))
  modules[modelName] = requiredModules(key).default || requiredModules(key)
})

export default modules
