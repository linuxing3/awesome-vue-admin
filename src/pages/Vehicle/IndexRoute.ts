export default {
  path: '/vehicle',
  name: 'vehicle',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
}
