export default {
  path: '/projecttask',
  name: 'projecttask',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/ProjectTask.vue`)
}
