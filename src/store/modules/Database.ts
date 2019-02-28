import { make } from 'vuex-pathify'
import models from '@/models'

const Database = models['database']

const state: any = {
  name: 'database',
  models: {},
  currentModel: 'database',
  filter: {
    search: '',
    sort: ''
  }
}

const mutations: any = {
  ...make.mutations(state)
}

const actions: any = {
  clear ({ commit }) {
    //
    commit('SET_MODELS', {})
    //
    commit('SET_CURRENT_MODEL', null)
  },
  /**
   * 将数据的结构存储下来
   */
  init ({ commit }) {
    // 挂载所有对象模型到Vuex的Database状态树上
    commit('SET_MODELS', models)
    // 设置当前模型的名称
    commit('SET_CURRENT_MODEL', Database)
    
    // 将所有对象模型的信息进行持久化

    Object.keys(models).forEach(name => {
      let headers = models[name].fieldsKeys()
      let path = name
      Database.query().where('name', name).get()
        .then(entities => {
          console.log('Check' + name + ' exists: ' + entities.length)
          if (entities.length = 0) {
            Database.$create({
              data: {
                name,
                headers,
                path
              }
            })
          }
        })
    })
  },
  ...make.actions(state)
}

const getters: any = {
  Model (state) {
    return state.models[state.currentModel]
  },
  ...make.getters(state)
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
