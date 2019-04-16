/**
 * Lowdb插件将vuex状态持久化
 */
import * as Vuex from 'vuex'
import VuexORM, { Database, Model } from '@vuex-orm/core'
// import VuexORMLowdbPlugin from 'vuex-orm-lowdb'
import localForagePlugin from 'vuex-orm-localforage'
import { lowerFirst, tail, last } from 'lodash'

// 获取模型
import { BaseModel } from '@/models/BaseModel'

// entity interface
export interface Entity {
  name: string
  model: typeof Model
  module: Vuex.Module<any, any>
}
export interface Models {
  [name: string]: typeof BaseModel | typeof Model
}

const requiredModels: RequireContext = require.context('../../pages', true, /.*\/models\/.*\.ts$/)
export const models: Models = {}

requiredModels.keys().forEach((fileName: string) => {
  const fileNameMeta = last(tail(fileName.split('/')))
  const modelName = lowerFirst(fileNameMeta.replace(/(\.\/|\.ts)/g, ''))
  models[modelName] = requiredModels(fileName).default
})

console.log(models)

// 获取模块
export interface Modules {
  [name: string]: Vuex.Module<any, any>
}

const requiredModules: RequireContext = require.context('../../pages', true, /.*\/modules\/.*\.ts$/)
export const modules: Modules = {}

requiredModules.keys().forEach((fileName: string) => {
  const fileNameMeta = last(tail(fileName.split('/')))
  let modelName = lowerFirst(fileNameMeta.replace(/(\.\/|\.ts)/g, ''))
  modules[modelName] = requiredModules(fileName).default
})

console.log(modules)
/**
 * 在数据库中注册模型和模块
 */
export const registerDatabase = (models: Models, modules: Modules): Database => {
  const database = new Database()
  // base models
  Object.keys(models).map((modelName: string) => {
    console.log(`Registering ORM for ${modelName} model`)

    let model = models[modelName]
    let module = modules[modelName] || {}

    /**
     * Register a model and a module to Database.
     */
    database.register(model, module)
  })

  return database
}

/**
 * 生成数据库
 */
export const database = registerDatabase(models, modules)

/**
 * 载入Lowdb插件
 */
// VuexORM.use(VuexORMLowdbPlugin, { database, dbPath })
VuexORM.use(localForagePlugin, { database })

/**
 * 安装localForage ORM databse
 */
const lowdbPlugin = VuexORM.install(database)

export default lowdbPlugin
