import IndexView from './IndexView.vue'
import FormView from './FormView.vue'
export default [
  {
    path: '/documentType',
    name: 'documentType',
    meta: { breadcrumb: true },
    component: IndexView
  },
  {
    path: '/documentType-form',
    name: 'documentType-form',
    meta: { breadcrumb: true },
    component: FormView
  }
]
