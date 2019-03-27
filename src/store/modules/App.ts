import { make } from 'vuex-pathify'

export interface IAppState {
  name: string
  models: any
  currentModel: any
  filter: {
    search: string
    sort: string
  }
  config: {
    name: string
    title: string
    description: string
    locale: string
    defaultMessages: any
  }
}

const state: IAppState = {
  name: 'app',
  models: {},
  currentModel: {},
  config: {
    name: '',
    title: '',
    description: '',
    locale: '',
    defaultMessages: {}
  },
  filter: {
    search: '',
    sort: ''
  },
}

const mutations: any = {
  /**
   * 将数据的结构存储下来
   */
  init ({ state }) {
    // 设置当前模型的名称
    state.config.name = 'awesome-vue-manager'
    state.config.title = 'Awesome Vue Manager'
    state.config.description = 'Awesome Vue Manager with General use purpose'
    state.config.localed = 'cn'
  },
  ...make.mutations(state)
}

const actions: any = {
  clear ({ commit }) {
    //
    commit('SET_MODELS', {})
    //
    commit('SET_CURRENT_MODEL', {})
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
