export default {
  path: '/activity-timeline',
  name: 'Activity',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
    `@/components/Activity/ActivityTimeline.vue`)
}
