export default {
  path: '/login',
  name: 'login',
  meta: {
    public: true
  },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */ `@/views/Login.vue`)
}
