export default {
  path: '/activity',
  name: 'activity',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
      `@/views/Activity.vue`)
}
