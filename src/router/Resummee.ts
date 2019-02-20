export default {
  path: '/resummee',
  name: 'resummee',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
      `@/views/Resummee.vue`)
}
