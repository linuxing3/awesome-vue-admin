/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import { BasicLayout, PageView, UserLayout, BlankLayout } from '@/layout'

Vue.use(Router)

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    name: 'user',
    component: BlankLayout,
    redirect: '/login',
    hidden: true,
    meta: {
      public: true
    },
    children: [
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
          `@/pages/Login/components/Login.vue`)
      }
    ]
  },
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: '/test/home',
        name: 'TestHome',
        component: () => import('@/pages/Home.vue')
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "fail" */ '@/pages/Error.vue')
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/pages/Error.vue`)
  }
]

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/home',
    meta: {
      public: true
    },
    children: [
      {
        path: '/register',
        meta: {
          public: true
        },
        name: 'Register',
        component: () =>
          import(/* webpackChunkName: "routes" */
          `@/pages/Login/components/Register.vue`)
      },
      {
        path: '/recover',
        meta: {
          public: true
        },
        name: 'Recover',
        component: () =>
          import(/* webpackChunkName: "routes" */
          `@/pages/Login/components/Register.vue`)
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
      // dashboard
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   redirect: '/dashboard/workplace',
      //   component: RouteView,
      //   hideChildrenInMenu: true,
      //   meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
      //   children: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'Analysis',
      //       component: () => import('@/views/dashboard/Analysis'),
      //       meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
      //     },
      //     // 外部链接
      //     {
      //       path: 'https://docs.qq.com/',
      //       name: 'Monitor',
      //       meta: { title: '监控页（外部）', target: '_blank' }
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'Workplace',
      //       component: () => import('@/views/dashboard/Workplace'),
      //       meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
      //     }
      //   ]
      // },
      // insert more route below
      // document
      {
        path: '/document',
        redirect: '/document/document-form',
        component: PageView,
        meta: { title: '单位成员', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/document/document-form',
            name: 'DocumentForm',
            component: () => import('@/pages/Document/components/DocumentForm.vue'),
            meta: { title: '信息录入', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/document/document-list',
            name: 'DocumentList',
            component: () => import('@/pages/Document/components/DocumentList.vue'),
            meta: { title: '成员列表', keepAlive: true, permission: ['form'] }
          }
        ]
      },
      // members
      {
        path: '/member',
        redirect: '/member/member-form',
        component: PageView,
        meta: { title: '单位成员', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/member/member-form',
            name: 'MemberForm',
            component: () => import('@/pages/Member/components/MemberForm.vue'),
            meta: { title: '信息录入', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/member/member-list',
            name: 'MemberList',
            component: () => import('@/pages/Member/components/MemberList.vue'),
            meta: { title: '成员列表', keepAlive: true, permission: ['form'] }
          }
        ]
      }
      // insert more route above
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new Router({
  routes: [...constantRouterMap, ...asyncRouterMap]
})

export default router
