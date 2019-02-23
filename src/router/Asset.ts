export default  {
    path: '/asset',
    name: 'asset',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */ `@/views/Asset.vue`)
}