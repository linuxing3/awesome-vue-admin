export default {
  path: '/account',
  name: 'account',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
}
