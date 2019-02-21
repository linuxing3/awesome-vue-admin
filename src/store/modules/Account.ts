import { ActionContext } from 'vuex'
import { make } from 'vuex-pathify'
import bcrypt from 'bcryptjs'
import Account from '@/models/Account'

const state = {
  name: 'account',
  items: [],
  cached: [],
  currentItem: {},
  loggedIn: false,
  filter: {
    search: '',
    sort: ''
  },
  token: {
    secret: 'daniel',
    simpleToken: '',
    netlifyToken: '',
    firebaseToken: ''
  }
}

const mutations: any = {
  ...make.mutations(state),
  CACHE_USER (state, newAccount) {
    state.cached.push(newAccount)
  }
}

const AccountActions = {
  async signup (ctx: ActionContext<any, any>, signupData) {
    // if exists, return
    let authedAccount = Account.query().where('name', signupData.name).get()[0]

    if (authedAccount === undefined) {
      try {
        console.log('Account Does not Exists, creating!')

        // 1 hash the password
        signupData.hash = await bcrypt.hash(signupData.password, 10)

        // 2 save the password and hash in vuex and localforage
        await (Account as any).$create({ data: signupData })
        console.log('Saving account with hash password')

        // 3 check the password and hash
        let createdAccount = Account.query().where('name', signupData.name).get()[0]
        console.log(createdAccount)

        let correctHash = (createdAccount as any).hash

        let valid = await bcrypt.compare(signupData.password, correctHash)
        if (valid) {
          console.log('Valid password')
          ctx.dispatch('signin', createdAccount)
        } else {
          console.log('Invalid password')
          ctx.commit('SET_LOGGED_IN', false)
          return
        }
      } catch (e) {
        throw new Error('Failed to add new account!')
      }
    } else {
      console.log('Account Exists, go ahead to login!')
      // Check account hash and password are correct
      let authHash = (authedAccount as any).hash
      let valid = await bcrypt.compare(signupData.password, authHash)
      if (valid) {
        console.log('Valid password')
        ctx.dispatch('signin', authedAccount)
      } else {
        console.log('Invalid password')
        ctx.commit('SET_LOGGED_IN', false)
      }
    }
  },
  async signin (ctx: ActionContext<any, any>, authData) {
    // 登录状态为真
    ctx.commit('SET_LOGGED_IN', true)
    // 缓存用户数据
    ctx.commit('CACHE_USER', authData)
    // 设置简单托证
    ctx.commit('SET_TOKEN', {
      ...ctx.state.token,
      ...{
        simpleToken: authData.id
      }
    })
  },
  // Logs out the current user.
  logout ({ commit }) {
    // 登录状态为真
    commit('SET_LOGGED_IN', false)
    // 缓存用户数据
    commit('SET_CACHED', [])
  }
}

const actions: any = {
  ...make.actions(state),
  ...AccountActions
}

const getters: any = { ...make.getters(state) }

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
