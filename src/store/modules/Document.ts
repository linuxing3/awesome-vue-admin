import { ActionContext } from 'vuex'
import { make } from 'vuex-pathify'

const state = {
  name: 'document',
  items: [],
  defaultDocument: {}
}

const mutations: any = {
  ...make.mutations(state),
  init (ctx: ActionContext<any, any>) {}
}

const actions: any = {
  ...make.actions(state),
  init (ctx: ActionContext<any, any>) {}
}

const getters: any = {
  ...make.getters(state)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
