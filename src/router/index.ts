import Vue from 'vue'
import Router, { Route, RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "router" */ `@/views/About.vue`)
  }
]

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
export function loadView (ViewName: string) {
  return import(/* webpackChunkName: "router" */ `${ViewName}`)
}

export default new Router({
  routes
})
