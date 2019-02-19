export default {
  path: '/document-table',
  name: 'Document',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
    `@/components/Document/DocumentTable.vue`)
}
