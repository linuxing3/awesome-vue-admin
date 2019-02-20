export default {
  path: '/entity',
  name: 'entity',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
      `@/views/Entity.vue`)
}
