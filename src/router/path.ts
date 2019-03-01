import Home from '@/views/Home.vue'
import PlayView from '@/views/Play.vue'
import CrudView from '@/views/Crud.vue'

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
      `@/views/Error.vue`)
  },
  {
    path: '/play',
    name: 'play',
    component: PlayView
  },
  {
    path: '/crud/:blueprint',
    name: 'crud',
    meta: {
      title: 'crud',
      group: 'apps',
      icon: 'start',
      color: 'primary',
      breadcrumb: true
    },
    component: CrudView
  }
]
