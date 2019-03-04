/**
 * Lowdb插件将vuex状态持久化
 */
import { join } from 'path'
import { pathExistsSync, mkdirpSync } from 'fs-extra'
import { remote, app } from 'electron'

import VuexORM, { Database } from '@vuex-orm/core'
// import VuexORMLowdbPlugin from 'vuex-orm-lowdb'
import localForagePlugin from 'vuex-orm-localforage'

// 获取模型和模块
import models from '@/models'
import modules from '@/store/modules'
import erp from '@/models/ERPModel'

// 获取文件路径

let electronApp = process.type === 'renderer' ? remote.app : app
const dbPath = join(electronApp.getPath('userData'), 'data') || '/public/data'

if (!pathExistsSync(dbPath)) mkdirpSync(dbPath)

/**
 * 在数据库中注册模型和模块
 */
export const registerDatabase = (models: any, modules: any): Database => {
  const database = new Database()
  // base models
  Object.keys(models).map(key => {
    console.log(`Registering ORM for ${key} model`)
    database.register(models[key], modules[key] || {})
  })
  // erp models
  Object.keys(erp).map(key => {
    console.log(`Registering ERP ORM for ${key} model`)
    database.register(erp[key], modules[key] || {})
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
