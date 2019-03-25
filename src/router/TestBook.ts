export default {
  path: '/testBook',
  name: 'testBook',
  meta: { breadcrumb: true },
  component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/TestBook.vue`)
}
