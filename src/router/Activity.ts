export const Activity = {
  path: '/activity',
  name: 'activity',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
    `@/views/Activity.vue`)
}

export const ActivitIdRoute = {
  path: '/activity/:id',
  name: 'activity-id',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
    `@/views/Activity.vue`)
}

export default Activity
