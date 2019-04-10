export default {
  path: '/userDesignation',
  name: 'userDesignation',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
}
