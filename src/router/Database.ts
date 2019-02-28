export default  {
    path: '/database',
    name: 'database',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/Database.vue`)
}