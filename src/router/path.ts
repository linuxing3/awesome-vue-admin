import CrudPage from '@/pages/Crud.vue'
import InfoPage from '@/pages/Info.vue'

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    meta: {
      public: true
    },
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "routes" */
        `@/pages/NotFound.vue`)
  },
  {
    path: '/403',
    meta: {
      public: true
    },
    name: 'AccessDenied',
    component: () =>
      import(/* webpackChunkName: "routes" */
        `@/pages/Deny.vue`)
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
    component: CrudPage
  },
  {
    path: '/info/:blueprint/:id',
    name: 'info',
    meta: {
      title: 'info',
      group: 'apps',
      icon: 'star',
      color: 'primary',
      breadcrumb: true
    },
    component: InfoPage
  }
]
