
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
    title: '数据表',
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
