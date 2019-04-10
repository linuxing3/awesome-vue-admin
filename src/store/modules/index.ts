/**
 * 自动注册全部的数据模型
 * Modules is object to hold
 * {
 *   "user" : [user: User extends Model]
 * }
 */
import * as Vuex from 'vuex'

import { lowerFirst, tail, last } from 'lodash'
export interface Modules {
  [name: string]: Vuex.Module<any, any>
}

let requiredModules: RequireContext = require.context('.', false, /\.ts$/)
let modules: Modules = {}

requiredModules.keys().forEach(fileName => {
  const fileNameMeta = last(tail(fileName.split('/')))
  if (fileName === './index.ts') return
  let modelName = lowerFirst(fileName.replace(/(\.\/|\.ts)/g, ''))
  modules[modelName] = requiredModules(fileName).default
})

export default modules
