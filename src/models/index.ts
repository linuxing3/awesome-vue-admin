/**
 * 自动注册全部的数据模型
 * models is object to hold
 * {
 *   "user" : [user: User extends Model]
 * }
 */
import { lowerFirst, tail, last } from 'lodash'
import { Model } from '@vuex-orm/core'

export interface Models {
  [name: string]: typeof Model
}

// import erpModels from './ERPModel'

let requiredModels: RequireContext = require.context('./CoreModel', true, /\.ts$/)
let models: Models = {}

requiredModels.keys().forEach((fileName: string) => {
  const fileNameMeta = last(tail(fileName.split('/')))
  let modelName = lowerFirst(fileNameMeta.replace(/(\.\/|\.ts)/g, ''))
  models[modelName] = requiredModels(fileName).default
})

export default models
