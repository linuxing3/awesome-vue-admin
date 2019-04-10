export default {
  path: '/userPromotion',
  name: 'userPromotion',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexView.vue`)
}
