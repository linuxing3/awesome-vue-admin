export default {
  path: '/editor',
  name: 'editor',
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */ `@/views/Editor.vue`)
}
