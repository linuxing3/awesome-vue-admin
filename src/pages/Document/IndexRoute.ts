export default {
  path: '/document',
  name: 'document',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
}
