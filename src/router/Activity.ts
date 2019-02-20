export default {
  path: '/activity',
  name: 'Activity',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
      `@/views/Activity.vue`)
}
