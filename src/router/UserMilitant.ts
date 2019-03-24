export default  {
    path: '/userMilitant',
    name: 'userMilitant',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/UserMilitant.vue`)
}