export default {
  path: '/account',
  name: 'account',
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */ `@/views/Account.vue`)
}
