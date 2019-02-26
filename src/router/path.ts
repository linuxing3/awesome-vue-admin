import Home from '@/views/Home.vue'

import { editActivity } from './Activity'

export default [
  {
    name: 'home',
    path: '/home',
    component: Home
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/404',
    meta: {
      public: true
    },
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
        `@/views/NotFound.vue`)
  },
  {
    path: '/403',
    meta: {
      public: true
    },
    name: 'AccessDenied',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
        `@/views/Deny.vue`)
  },
  {
    path: '/500',
    meta: {
      public: true
    },
    name: 'ServerError',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
        `@/views/Error.vue`)
  },
  {
    path: '/play',
    name: 'play',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
        `@/views/Dynamic.vue`)
  },
  editActivity
]
