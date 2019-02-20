export default {
  path: '/notification',
  name: 'notification',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "router" */ `@/views/Notification.vue`)
}
