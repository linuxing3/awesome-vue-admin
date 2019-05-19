/**
 * Lowdb插件将vuex状态持久化
 */
import * as Vuex from 'vuex'
import VuexORM, { Database, Model } from '@vuex-orm/core'
import localForagePlugin from 'vuex-orm-localforage'

import models, { Models } from '@/models'
import modules, { Modules } from '@/store/modules'

/**
 * 在数据库中注册模型和模块
 */
export const registerDatabase = (models: Models, modules: Modules): Database => {
  const database = new Database()
  // base models
  Object.keys(models).map((modelName: string) => {
    console.log(`Registering ORM Model -> [${modelName}]`)

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
