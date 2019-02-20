import { make } from 'vuex-pathify'

const state: any = {
  name: 'database',
  items: [],
  currentItem: {},
  filter: {
    search: '',
    sort: ''
  },
  export: {
    docPath: '',
    dataPath: ''
  }
}

const mutations: any = {
  ...make.mutations(state)
}

const actions: any = { ...make.actions(state) }

const getters: any = { ...make.getters(state) }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
