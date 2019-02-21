export default {
  path: '/login',
  name: 'login',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "router" */ `@/views/Login.vue`)
}
