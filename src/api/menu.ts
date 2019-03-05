
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
  { header: '文件' },
  {
    title: '日历任务',
    name: 'calendar',
    group: 'apps',
    icon: 'today',
    color: 'purple'
  },
  {
    title: '对外活动',
    name: 'activity',
    group: 'apps',
    icon: 'event',
    color: 'grey',
    type: 'crud'
  },
  {
    title: '文函处理',
    name: 'document',
    group: 'apps',
    icon: 'archive',
    color: 'purple',
    type: 'crud'
  },
  {
    title: '档案管理',
    group: 'apps',
    icon: 'folder',
    name: 'archive',
    color: 'black',
    type: 'crud'
  },
  { header: '人员' },
  {
    title: '本馆人员',
    name: 'user',
    group: 'apps',
    icon: 'face',
    color: 'green',
    type: 'crud'
  },
  {
    title: '个人简历',
    name: 'resummee',
    group: 'apps',
    icon: 'toc',
    color: 'red',
    type: 'crud'
  },
  {
    title: '年终考核',
    name: 'evaluation',
    group: 'apps',
    icon: 'feedback',
    color: 'pink',
    type: 'crud'
  },
  {
    title: '党员管理',
    name: 'militant',
    group: 'apps',
    icon: 'label',
    color: 'blue',
    type: 'crud'
  },
  { header: '其他' },
  {
    title: '单位管理',
    name: 'entity',
    group: 'apps',
    icon: 'account_balance',
    color: 'primary',
    type: 'crud'
  },
  {
    title: '资产管理',
    name: 'asset',
    group: 'apps',
    icon: 'store',
    color: 'blue',
    type: 'crud'
  },
  {
    title: '资产管理',
    name: 'Asset',
    group: 'apps',
    icon: 'store',
    color: 'blue',
    type: 'crud'
  },
  // injected
  { header: '系统' },
  {
    title: '编辑器',
    group: 'apps',
    icon: 'edit',
    name: 'editor',
    color: 'green'
  },
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
    color: 'grey'
  }
]

export const menuItems = mainMenu.reduce((arr, item) => {
  if (item.title !== undefined) arr.push(item)
  return arr
}, [])

export default mainMenu
