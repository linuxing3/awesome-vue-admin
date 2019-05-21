import Vue from 'vue'
import router from './router/index.antd'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const whiteList = ['login', 'register', 'registerResult'] // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  console.log('Running app...')
  NProgress.start() // start progress bar
  if ((Vue as any).ls.get(ACCESS_TOKEN)) {
    console.log('Getting Token app...')
    if (to.path === '/user/login') {
      next({ path: '/test/home' })
      NProgress.done()
    } else {
      const roles = store.getters.roles
      console.log(roles)
      if (roles.length === 0) {
        // 根据roles权限生成可访问的路由表
        store.dispatch('GenerateRoutes', { roles }).then(() => {
          // 动态添加可访问路由表
          router.addRoutes(store.getters.addRouters)
          const redirect = decodeURIComponent(from.query.redirect[0] || to.path)
          if (to.path === redirect) {
            next({ ...to, replace: true })
          } else {
            next({ path: redirect })
          }
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
