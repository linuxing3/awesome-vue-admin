/**
 * 自动注册全部的数据模型
 * models is object to hold
 * {
 *   "user" : [user: User extends Model]
 * }
 */
import { toLower } from 'lodash'

let requiredModels: RequireContext = require.context('.', false, /\.ts$/)
let models = {}

requiredModels.keys().forEach(key => {
  if (key === './index.ts') return
  let modelName = toLower(key.replace(/(\.\/|\.ts)/g, ''))
  models[modelName] = requiredModels(key).default || requiredModels(key)
})

export default models
