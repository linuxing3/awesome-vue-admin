export default {
  path: '/users/militant',
  name: 'users/militant',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
    `@/components/Militant/MilitantTable.vue`)
}
