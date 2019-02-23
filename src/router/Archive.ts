export default  {
    path: '/archive',
    name: 'archive',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */ `@/views/Archive.vue`)
}