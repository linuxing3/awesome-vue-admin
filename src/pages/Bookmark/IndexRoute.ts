export default {
  path: '/bookmark',
  name: 'bookmark',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
}
