export default {
  path: '/account',
  name: 'account',
  component: () =>
        import(/* webpackChunkName: "router" */ `@/views/Account.vue`)
}
