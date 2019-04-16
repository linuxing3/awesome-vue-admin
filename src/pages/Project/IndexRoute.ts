import IndexView from './IndexView.vue'
import ProjectType from './components/ProjectType.vue'
import ProjectTask from './components/ProjectTask.vue'
export default [
  {
    path: '/project',
    name: 'project',
    meta: { breadcrumb: true },
    component: IndexView
  },
  {
    path: '/projectType',
    name: 'projectType',
    meta: { breadcrumb: true },
    component: ProjectType
  },
  {
    path: '/projectTask',
    name: 'projectTask',
    meta: { breadcrumb: true },
    component: ProjectTask
  }
]
