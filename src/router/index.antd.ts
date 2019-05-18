/* eslint-disable */
import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/500'
    },
    {
      path: '/login',
      meta: {
        public: true
      },
      name: 'Login',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/Home.vue`)
    },
    {
      path: '/home',
      meta: {
        public: true
      },
      name: 'Home',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/Home.vue`)
    },
    {
      path: '/500',
      meta: {
        public: true
      },
      name: 'ServerError',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/Error.vue`)
    }
  ]
})

export default router
