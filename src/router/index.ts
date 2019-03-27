/* eslint-disable */
import Vue from 'vue'
import Router, { RouteConfig, RouteRecord } from 'vue-router'

import path from './path'
import store from '../store'

Vue.use(Router)

/**
 * 动态路由
 */
let requiredRoute: RequireContext = require.context('.', false, /\.ts$/)

requiredRoute.keys().forEach((route: string) => {
  let routeConfig = requiredRoute(route).default
  if (route === './index.ts' || route === './path.ts') return
  if (Array.isArray(routeConfig)) {
    routeConfig.forEach(subRoute => {
      path.push(subRoute)
    })
  } else {
    path.push(routeConfig)
  }
})

const router = new Router({
  routes: path as RouteConfig[]
})

// router guards
router.beforeEach((to: any, from: any, next: any) => {
  console.log('Going From ' + from.path + ' to ' + to.path)
  // validate user
  // if (to.matched.some((record: RouteRecord) => !record.meta.public)) {
  // const isAuthenticated = store.getters['account/isAuthenticated']
  //   if (!isAuthenticated) {
  //     next({ path: '/', query: { redirect: to.fullPath } });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
  next()
})

router.afterEach((to: any, from: any) => {
  console.log('Arrived ' + to.path + ' from ' + from.path)
  // clear model of previous component
})

export default router
