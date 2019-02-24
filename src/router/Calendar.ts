export default {
    path: '/calendar',
    name: 'calendar',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
        `@/views/Calendar.vue`)
}