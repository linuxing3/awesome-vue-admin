import Vuex, { Store, Module } from 'vuex'
import Vuetify from 'vuetify'
import VueRouter, { RouteConfig } from 'vue-router'

import Vue from 'vue'
import fs from 'fs'
import path from 'path'

/**
 * Storybook config uses require.context to collect all the sources; that
 * function is provided by webpack and we need to use
 * babel-plugin-require-context-hook to substitute it in Jest.
 */
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'
/**
 * 工具函数
 */

// https://vue-test-utils.vuejs.org/
import vueTestUtils, { createLocalVue } from '@vue/test-utils'
// https://lodash.com/
import _, { cloneDeep } from 'lodash'
registerRequireContextHook()
_.mixin({
  pascalCase: _.flow(
    _.camelCase,
    _.upperFirst
  )
})

/**
 * 配置Vue
 */
Vue.config.productionTip = false

/**
 * 注册全局组件
 */

const globalComponentFiles = fs
  .readdirSync(path.join(__dirname, '../../src/components/helpers'))
  .filter(fileName => /^.+\.vue$/.test(fileName))

/**
 * 在所有组件中混入[风格]对象
 */

Vue.mixin({
  created () {
    this['$style'] = this['$style'] || {}
  }
})

/**
 * 模拟localstorage，解决jsdom中没有对象的问题
 */

Object.defineProperty(window, 'localStorage', {
  value: (function () {
    let store = {}
    return {
      getItem: function (key) {
        return store[key] || null
      },
      setItem: function (key, value) {
        store[key] = value.toString()
      },
      clear: function () {
        store = {}
      }
    }
  })()
})

/**
 * 全局帮助函数，包括
 * mount
 * shallowMount
 * shallowMountView
 * mountView
 * createComponentMocks
 * createVuexModule
 * createFullComponent
 */
;(global as any).mount = vueTestUtils.mount

// https://vue-test-utils.vuejs.org/api/#shallowmount
;(global as any).shallowMount = vueTestUtils.shallowMount
;(global as any).shallowMountView = (Component, options) => {
  return vueTestUtils.shallowMount(Component, {
    ...options,
    stubs: {
      Layout: {
        functional: true,
        render (h, { slots }) {
          return `<div>{slots().default}</div>`
        }
      },
      ...(options.stubs || {})
    }
  })
}
;(global as any).mountView = (Component, options) => {
  return vueTestUtils.mount(Component, {
    ...options,
    stubs: {
      Layout: {
        functional: true,
        render (h, { slots }) {
          return `<div>{slots().default}</div>`
        }
      },
      ...(options.stubs || {})
    }
  })
}
;(global as any).createComponentMocks = ({ store, router, style, mocks, stubs }) => {
  // Use a local version of Vue, to avoid polluting the (global as any)
  // Vue and thereby affecting other tests.
  // https://vue-test-utils.vuejs.org/api/#createlocalvue
  const localVue = vueTestUtils.createLocalVue()
  localVue.use(Vuetify)

  // return the localVue with Vuetify
  const returnOptions = { localVue }

  // https://vue-test-utils.vuejs.org/api/options.html#stubs
  returnOptions['stubs'] = stubs || {}
  // https://vue-test-utils.vuejs.org/api/options.html#mocks
  returnOptions['mocks'] = mocks || {}

  // Converts a `store` option shaped like:
  //
  // store: {
  //   someModuleName: {
  //     state: { ... },
  //     getters: { ... },
  //     actions: { ... },
  //   },
  //   anotherModuleName: {
  //     getters: { ... },
  //   },
  // },
  //
  // to a store instance, with each module namespaced by
  // default, just like in our app.
  if (store) {
    localVue.use(Vuex)
    returnOptions['store'] = new Vuex.Store({
      modules: Object.keys(store)
        .map(moduleName => {
          const storeModule = store[moduleName]
          return {
            [moduleName]: {
              state: storeModule.state || {},
              getters: storeModule.getters || {},
              actions: storeModule.actions || {},
              namespaced:
                typeof storeModule.namespaced === 'undefined' ? true : storeModule.namespaced
            }
          }
        })
        .reduce((moduleA, moduleB) => Object.assign({}, moduleA, moduleB), {})
    })
  }

  // If using `router: true`, we'll automatically stub out
  // components from Vue Router.
  if (router) {
    returnOptions['stubs']['router-link'] = true
    returnOptions['stubs']['router-view'] = true
  }

  // If a `style` object is provided, mock some styles.
  if (style) {
    returnOptions['mocks'].$style = style
  }

  return returnOptions
}
/**
 * Vuex模块测试函数
 */
;(global as any).createVuexModule = (vuexModule: Module<{}, {}>, options = {}) => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const returnOptions = { localVue }
  const store: Store<{}> = new Vuex.Store({
    ...cloneDeep(vuexModule),
    ...options
  })
  returnOptions['store'] = store
  return returnOptions
}
/**
 * Vuetify组件库测试函数
 */
;(global as any).createVuetifyComponent = () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  const returnOptions = { localVue }
  return returnOptions
}
/**
 * 路由测试函数
 */
;(global as any).createVueRouter = (path: RouteConfig[]) => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const returnOptions = { localVue }
  const router = new VueRouter({ routes: path })
  returnOptions['router'] = router
  return returnOptions
}
/**
 * 全功能组件函数
 * 包括vuex/router/vuetify
 */
;(global as any).createFullComponent = (
  vuexModule: Module<{}, {}>,
  path: RouteConfig[],
  vuexOptions = {},
  routerOptions = {}
) => {
  let store: Store<{}>
  let router: VueRouter
  // 启用插件
  let localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)
  localVue.use(VueRouter)

  // 注入store
  if (vuexModule === undefined) {
    store = (global as any).mockORMStore
  } else {
    store = new Store({
      ...cloneDeep(vuexModule),
      ...vuexOptions
    })
  }
  // 注入router
  router = new VueRouter({
    routes: path,
    ...routerOptions
  })

  return {
    router,
    store,
    localVue
  }
}

/**
 * Global Mocks
 */
;(global as any).mockApp = require('./__mocks__/app')
;(global as any).mockComponent = require('./__mocks__/component')
;(global as any).mockORMStore = require('./__mocks__/orm-store')
