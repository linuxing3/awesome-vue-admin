export default {
  path: '/user',
  name: 'users',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */ `@/views/User.vue`)
}
