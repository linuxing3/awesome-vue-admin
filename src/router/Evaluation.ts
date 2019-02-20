export default {
  path: '/evaluation',
  name: 'evaluation',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
      `@/views/Evaluation.vue`)
}
