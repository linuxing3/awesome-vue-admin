export default {
  path: '/notification',
  name: 'notification',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */ `@/views/Notification.vue`)
}
