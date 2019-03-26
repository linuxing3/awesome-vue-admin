export default {
  path: '/projectType',
  name: 'projectType',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/ProjectType.vue`)
}
