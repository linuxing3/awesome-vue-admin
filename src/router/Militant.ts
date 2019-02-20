export default {
  path: '/militant',
  name: 'militant',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
      `@/views/Militant.vue`)
}
