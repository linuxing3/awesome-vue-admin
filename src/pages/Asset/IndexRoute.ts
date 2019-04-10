export default [
  {
    path: '/asset',
    name: 'asset',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
  }
]
