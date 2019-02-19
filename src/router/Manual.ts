export default {
  path: '/docs/manual',
  name: 'docs/manual',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
    `@/components/Manual/Manual.vue`)
}
