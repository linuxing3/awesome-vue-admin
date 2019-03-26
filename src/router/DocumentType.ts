export default {
  path: '/documentType',
  name: 'documentType',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/DocumentType.vue`)
}
