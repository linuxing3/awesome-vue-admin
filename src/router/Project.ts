export default {
  path: '/project',
  name: 'project',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/Project.vue`)
}
