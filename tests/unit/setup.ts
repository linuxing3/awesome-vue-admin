import Vuex, { Store, Module } from 'vuex'
import Vuetify from 'vuetify'
import VueRouter, { RouteConfig } from 'vue-router'

import Vue from 'vue'
import fs from 'fs'
import path from 'path'

// NOTE add plugins in test
// import plugins from "@/store/plugins";

// ===
// Utility functions
// ===

// https://vue-test-utils.vuejs.org/
import vueTestUtils, { createLocalVue } from '@vue/test-utils'
// https://lodash.com/
import _, { cloneDeep } from 'lodash'
_.mixin({
  pascalCase: _.flow(
    _.camelCase,
    _.upperFirst
  )
})

// ===
// Configure Vue
// ===

// Don't warn about not using the production build of Vue, as
// we care more about the quality of errors than performance
// for tests.
Vue.config.productionTip = false

// ===
// Register global components
// ===

const globalComponentFiles = fs
  .readdirSync(path.join(__dirname, '../../src/components'))
  .filter(fileName => /^_base-.+\.vue$/.test(fileName))

for (let fileName of globalComponentFiles) {
  if (fileName !== null) {
    const componentName = (_ as any).pascalCase(fileName.match(/^_(base-.+)\.vue$/)[1])
    const componentConfig = require('../../src/components/' + fileName)
    Vue.component(componentName, componentConfig.default || componentConfig)
  }
}

// ===
// Patch all components with a global mixin
// ===

Vue.mixin({
  created () {
    // HACK: Set a fallback for the `$style` until vue-jest
    // includes better support for CSS modules.
    this['$style'] = this['$style'] || {}
  }
})

// ===
// Mock window properties not handled by jsdom
// ===

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

// ===
// Global helpers
// ===

// https://vue-test-utils.vuejs.org/api/#mount
;(global as any).mount = vueTestUtils.mount
// Object.defineProperty((global as any), "mount", vueTestUtils.mount);

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
;(global as any).createVuetifyComponent = () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  const returnOptions = { localVue }
  return returnOptions
}
;(global as any).createVueRouter = (path: RouteConfig[]) => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const returnOptions = { localVue }
  const router = new VueRouter({ routes: path as RouteConfig[] })
  returnOptions['router'] = router
  return returnOptions
}
;(global as any).createFullComponent = (
  vuexModule: Module<{}, {}>,
  path: RouteConfig[],
  vuexOptions = {},
  routerOptions = {}
) => {
  const localVue = createLocalVue()
  // use plugins
  localVue.use(Vuetify)
  localVue.use(Vuex)
  localVue.use(VueRouter)
  const returnOptions = { localVue }
  // inject store
  const store: Store<{}> = new Store({
    ...cloneDeep(vuexModule),
    ...vuexOptions
  })
  // inject router
  const router = new VueRouter({
    routes: path as RouteConfig[],
    ...routerOptions
  })
  returnOptions['router'] = router
  returnOptions['store'] = store
  return returnOptions
}
