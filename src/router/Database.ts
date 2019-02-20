export default {
  path: '/database',
  name: 'database',
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
      `@/views/Database.vue`)
}
