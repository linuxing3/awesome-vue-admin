export default {
  path: '/dashboard',
  name: 'dashboard',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
}
