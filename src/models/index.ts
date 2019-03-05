/**
 * 自动注册全部的数据模型
 * models is object to hold
 * {
 *   "user" : [user: User extends Model]
 * }
 */
import { toLower } from 'lodash'

import erpModels from './ERPModel'

let requiredModels: RequireContext = require.context('./CoreModel', false, /\.ts$/)
let models = {}

requiredModels.keys().forEach(key => {
  let modelName = toLower(key.replace(/(\.\/|\.ts)/g, ''))
  models[modelName] = requiredModels(key).default || requiredModels(key)
})

export default {
  ...models,
  ...erpModels
}
