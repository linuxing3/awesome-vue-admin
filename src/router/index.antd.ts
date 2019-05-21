/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layout'

Vue.use(Router)

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    name: 'user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    meta: {
      public: true
    },
    children: [
      {
        path: '*',
        redirect: '/404'
      },
      {
        path: '/user/login',
        name: 'login',
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
    component: () => import(/* webpackChunkName: "fail" */ '@/pages/Exception/404.vue')
  }
]

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/member/member-list',
    children: [
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
      },
      // insert more route above
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/pages/Exception/403.vue'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/pages/Exception/404.vue'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/pages/Exception/500.vue'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new Router({
  routes: [...constantRouterMap]
})

export default router
