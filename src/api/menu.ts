
const mainMenu = [
  {
    title: '开始使用',
    name: 'home',
    group: 'apps',
    icon: 'notes',
    color: 'purple'
  },
  {
    title: '仪表盘',
    group: 'apps',
    icon: 'view_quilt',
    name: 'dashboard',
    color: 'black'
  },
  {
    title: '日历任务',
    name: 'calendar',
    group: 'apps',
    icon: 'today',
    color: 'purple'
  },
  { header: '文件' },
  {
    title: '文函处理',
    name: 'document',
    group: 'apps',
    icon: 'archive',
    color: 'purple'
  },
  {
    title: '档案管理',
    group: 'apps',
    icon: 'folder',
    name: 'archive',
    color: 'black'
  },
  {
    title: '对外活动',
    name: 'activity',
    group: 'apps',
    icon: 'event',
    color: 'grey'
  },
  { header: '人员' },
  {
    title: '本馆人员',
    name: 'user',
    group: 'apps',
    icon: 'face',
    color: 'green'
  },
  {
    title: '个人简历',
    name: 'resummee',
    group: 'apps',
    icon: 'toc',
    color: 'red'
  },
  {
    title: '年终考核',
    name: 'evaluation',
    group: 'apps',
    icon: 'feedback',
    color: 'pink'
  },
  {
    title: '党员管理',
    name: 'militant',
    group: 'apps',
    icon: 'label',
    color: 'blue'
  },
  { header: '其他' },
  {
    title: '单位管理',
    name: 'entity',
    group: 'apps',
    icon: 'account_balance',
    color: 'primary'
  },
  {
    title: '资产管理',
    name: 'asset',
    group: 'apps',
    icon: 'store',
    color: 'blue'
  },
  // injected
  { header: '系统' },
  {
    title: '导入导出',
    group: 'apps',
    icon: 'store',
    name: 'database',
    color: 'black'
  },
  {
    title: '演示场',
    group: 'apps',
    icon: 'star',
    name: 'play',
    color: 'black'
  }
]

export const menuItems = mainMenu.reduce((arr, item) => {
  if (item.title !== undefined) arr.push(item)
  return arr
}, [])

export default mainMenu
