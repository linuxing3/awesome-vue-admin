export default {
  path: '/entity-table',
  name: 'Entity',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
    `@/components/Entity/EntityTable.vue`)
}
