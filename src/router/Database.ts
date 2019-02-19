export default {
  path: '/database-manager',
  name: 'Database',
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
    `@/components/Database/DatabaseManager.vue`)
}
