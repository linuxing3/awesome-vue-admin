/* eslint-disble */
import VuexORM, { Database, Model } from '@vuex-orm/core'
import { Module } from 'vuex'

const UserModule: Module<any, any> = {
  namespaced: true,
  state: {},
  actions: {},
  mutations: {}
}

const models: any = {
  user: require('@/models/User').default
}

const modules: any = {
  user: UserModule
}

const database = new Database()
Object.keys(models).map(key => {
  database.register(models[key] as typeof Model, modules[key] as Module<any, any>)
})

const ormPlugin = VuexORM.install(database)

export default ormPlugin
