export default  {
    path: '/calendar',
    name: 'calendar',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/Calendar.vue`)
}