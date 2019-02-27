export default {
  path: '/login',
  name: 'login',
  meta: {
    public: true
  },
  component: () =>
    import(/* webpackChunkName: "routes" */ `@/views/Login.vue`)
}
