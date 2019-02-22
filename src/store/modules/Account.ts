import { ActionContext } from 'vuex'
import { make } from 'vuex-pathify'
import bcrypt from 'bcryptjs'
import Account from '@/models/Account'

const state = {
  name: 'account',
  items: [],
  cached: [],
  defaultAccount: {
    name: 'admin',
    password: 'admin123',
    email: 'admin@mfa.gov.cn',
    hash: '',
    role: 'manager'
  },
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
  // 创建初始化用户
  async init(ctx: ActionContext<any, any>) {
    let { name, password, email, role } = ctx.state.defaultAccount
    console.log('检查默认账户是否存在')
    let accounts = Account.query().get()
    if (accounts === undefined || accounts.length === 0 ) {
      let hash = await bcrypt.hash(password, 10)

      let accountInfo = {
        name,
        password,
        email,
        role,
        hash
      }

      await (Account as any).$create({data: accountInfo})
      console.log('创建默认账户')
    }
  },
  // 注册用户
  async signup (ctx: ActionContext<any, any>, signupData) {
    // 按姓名查找账户
    let authedAccount = Account.query().where('name', signupData.name).get()[0]

    if (authedAccount === undefined) {
      try {
        console.log('该用户不存在，正在创建!')

        // 1 加密密码
        let newHash = await bcrypt.hash(signupData.password, 10)

        let accountInfo = {
          ...signupData,
          hash: newHash
        }

        // 2 保存用户名和加密密码
        await (Account as any).$create({ data: accountInfo })
        console.log('保存用户名和加密密码')

        // 3 使用创建后账户，再次尝试登录
        ctx.dispatch('signup', accountInfo)

      } catch (e) {
        throw new Error('添加新账户失败!')
      }
    } else {
      console.log('账户已注册，请登录')
      // 检查用户名和密码
      let { hash } = authedAccount as any
      let password = signupData.password
      let valid = await bcrypt.compare(password, hash)
      if (valid) {
        console.log('密码验证通过')
        ctx.dispatch('signin', authedAccount)
      } else {
        console.log('无效密码')
        ctx.commit('SET_LOGGED_IN', false)
      }
    }
  },
  // 设置登录状态
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
