export default {
  path: '/user-militant',
  name: 'userMilitant',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/UserMilitant.vue`)
}
