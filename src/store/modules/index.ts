/**
 * 自动注册全部的数据模型
 * Modules is object to hold
 * {
 *   "user" : [user: User extends Model]
 * }
 */
import { toLower } from 'lodash'

let requiredModules: RequireContext = require.context('.', false, /\.ts$/)
let Modules = {}

requiredModules.keys().forEach(key => {
  if (key === './index.ts') return
  let modelName = toLower(key.replace(/(\.\/|\.ts)/g, ''))
  Modules[modelName] = requiredModules(key).default || requiredModules(key)
})

export default Modules
