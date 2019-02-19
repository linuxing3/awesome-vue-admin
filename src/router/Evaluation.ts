export default {
  path: '/users/evaluation',
  name: 'users/evaluation',
  meta: { breadcrumb: true },
  component: () =>
    import(/* webpackChunkName: "routes" */
    /* webpackMode: "lazy" */
    `@/components/Evaluation/EvaluationForm.vue`)
}
