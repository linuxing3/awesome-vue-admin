export default {
  path: '/account-form',
  name: 'Account',
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
    `@/components/Account/AccountForm.vue`)
}
