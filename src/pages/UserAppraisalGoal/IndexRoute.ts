export default {
  path: '/userAppraisalGoal',
  name: 'userAppraisalGoal',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
}
