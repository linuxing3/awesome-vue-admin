import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexORM, { Database, Model } from '@vuex-orm/core'
// import localForagePlugin from 'vuex-orm-localforage'
import User from '@/models/CoreModel/User/User'
import Document from '@/models/CoreModel/Document/Document'

Vue.use(Vuex)

const entities = [
  {
    model: User,
    module: {
      namespaced: true,
      state: {
        items: []
      }
    }
  },
  {
    model: Document,
    module: {
      namespaced: true,
      state: {
        items: []
      }
    }
  }
]

/**
 * Create a new Vuex Store with ORM plugin.
 * {Array<entity>} enties to pull, in format [{ model:..., module?:... }]
 * {String} namespace, normally is `entities` to use `state.entities`
 */
const setORMStore = (entities = [], namespace = 'entities'): Store<any> => {
  const database = new Database()

  entities.forEach(entity => {
    database.register(entity.model, entity.module || {})
  })

  // VuexORM.use(localForagePlugin, { database })

  return new Vuex.Store({
    plugins: [VuexORM.install(database, { namespace })],
    strict: true
  })
}

const store = setORMStore(entities)
export default store
