export default {
  path: '/usermilitant',
  name: 'usermilitant',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/UserMilitant.vue`)
}
