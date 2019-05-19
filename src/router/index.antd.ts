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
        `@/pages/Login/IndexView.vue`)
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
    // insert more route below
    // document
    {
      path: '/document-form',
      meta: {
        public: true
      },
      name: 'DocumentForm',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/Document/components/DocumentForm.vue`)
    },
    {
      path: '/document-list',
      meta: {
        public: true
      },
      name: 'DocumentList',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/Document/components/DocumentList.vue`)
    },
    // user
    {
      path: '/user-form',
      meta: {
        public: true
      },
      name: 'UserForm',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/User/components/UserForm.vue`)
    },
    {
      path: '/user-list',
      meta: {
        public: true
      },
      name: 'UserList',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/User/components/UserList.vue`)
    },
    {
      path: '/member-form',
      meta: {
        public: true
      },
      name: 'MemberForm',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/Member/components/MemberForm.vue`)
    },
    {
      path: '/member-list',
      meta: {
        public: true
      },
      name: 'MemberList',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/Member/components/MemberList.vue`)
    },
    // insert more route above
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
