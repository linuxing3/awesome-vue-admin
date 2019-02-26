import { make } from 'vuex-pathify'
import { FileManager } from '@/util/fs'

import models from '@/models'
const App = models['app']

const fileManger: FileManager = new FileManager()

const state: any = {
  name: 'app',
  models: {},
  currentModel: {},
  filter: {
    search: '',
    sort: ''
  }
}

const mutations: any = {
  /**
   * 将数据的结构存储下来
   */
  init({ state }) {
    // 设置当前模型的名称
    fileManger.getWindowsHomeDir()
    fileManger.getWindowsTemplateDir(fileManger.homeDir, 'documents/template/')
    let { homeDir, templateDir } = fileManger

    state.model = {
      name: 'awesome-vue-manager',
      title: 'Awesome Vue Manager',
      description: 'Awesome Vue Manager with General use purpose',
      homeDir,
      templateDir
    }
    App.$create({ data: state.model })
  },
  ...make.mutations(state)
}

const actions: any = {
  clear({ commit }) {
    //
    commit('SET_MODELS', {})
    //
    commit('SET_CURRENT_MODEL', {})
  },
  ...make.actions(state)
}

const getters: any = {
  Model(state) {
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