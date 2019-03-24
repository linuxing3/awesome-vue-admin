---
to: "src/store/modules/<%= model %>.ts"
---
<%
const ModelName = model
const EntityName = model.charAt(0).toLowerCase() + model.slice(1)
%>import { ActionContext } from 'vuex'
import { make } from 'vuex-pathify'

const state = {
  name: '<%= EntityName %>',
  items: [],
  default<%= ModelName %>: {}
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