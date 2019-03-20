export default {
  path: '/user',
  name: 'user',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/User.vue`)
}
