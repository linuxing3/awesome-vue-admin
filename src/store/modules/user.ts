import { make } from 'vuex-pathify'
import { Module } from 'vuex'

const state = {}

const mutations = {
  ...make.mutations(state)
}

const actions = {
  ...make.actions(state)
}

const UserModule: Module<any, any> = {
  namespaced: true,
  state,
  actions,
  mutations
}
