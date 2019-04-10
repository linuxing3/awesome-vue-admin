export default [
  {
    path: '/project',
    name: 'project',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
  },
  {
    path: '/projectType',
    name: 'projectType',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `./components/ProjectType.vue`)
  },
  {
    path: '/projectTask',
    name: 'projectTask',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `./components/ProjectTask.vue`)
  }
]
