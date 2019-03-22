---
to: "src/store/modules/<%= model %>.ts"
---
<%
const ModelName = model
%>import { ActionContext } from 'vuex'
import { make } from 'vuex-pathify'

const state = {
  name: '<%= ModelName.toLowerCase() %>',
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