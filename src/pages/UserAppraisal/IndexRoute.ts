export default {
  path: '/userAppraisal',
  name: 'userAppraisal',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
}
