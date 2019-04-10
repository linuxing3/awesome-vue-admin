export default {
  path: '/event',
  name: 'event',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
}
