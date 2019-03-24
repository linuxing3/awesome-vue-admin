export default  {
    path: '/projectTask',
    name: 'projectTask',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/ProjectTask.vue`)
}