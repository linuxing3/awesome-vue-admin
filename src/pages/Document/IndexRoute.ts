import IndexView from './IndexView.vue'
import FormView from './FormView.vue'
export default [
  {
    path: '/document',
    name: 'document',
    meta: { breadcrumb: true },
    component: IndexView
  },
  {
    path: '/document-form',
    name: 'document-form',
    meta: { breadcrumb: true },
    component: FormView
  }
]
