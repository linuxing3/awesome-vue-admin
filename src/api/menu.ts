
const mainMenu = [
  {
    title: '单位管理',
    name: 'Entity',
    group: 'apps',
    icon: 'fas fa-building'
  },
  {
    title: '活动管理',
    name: 'Activity',
    group: 'apps',
    icon: 'fas fa-calendar'
  },
  {
    title: '人员管理',
    group: 'users',
    icon: 'fas fa-user',
    items: [
      {
        title: '本馆人员',
        name: 'user',
        component: 'user'
      },
      {
        title: '个人简历',
        name: 'resummee',
        component: 'resummee'
      },
      {
        title: '年终考核',
        name: 'Evaluation',
        component: 'evaluation'
      },
      {
        title: '党员管理',
        name: 'militant',
        component: 'militant'
      }
    ]
  },
  {
    title: '文函处理',
    name: 'Document',
    group: 'apps',
    icon: 'fas fa-book'
  },
  {
    title: '导入导出',
    group: 'apps',
    icon: 'fas fa-file-export',
    name: 'Database'
  },
  {
    title: '控制面板',
    group: 'apps',
    icon: 'fas fa-th',
    name: 'Dashboard'
  },
  {
    title: '用户手册',
    name: 'docs/manual',
    group: 'apps',
    icon: 'fas fa-book-open'
  }
]

export default mainMenu
