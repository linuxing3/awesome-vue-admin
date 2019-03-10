
const mainMenu = [
  { header: '开始' },
  {
    title: '模块',
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
    title: '数据表',
    group: 'apps',
    icon: 'table_chart',
    name: 'database',
    color: 'black'
  },
  {
    title: '演示场',
    group: 'apps',
    icon: 'fastfood',
    name: 'play',
    color: 'grey'
  },
  { header: '在线' },
  {
    name: 'Weixin',
    title: '打开微信',
    group: 'senior',
    icon: 'message',
    href: 'https://wx.qq.com',
    target: '_blank',
    color: 'success'
  },
  {
    name: 'Whatsapp',
    title: 'Whatsapp',
    group: 'senior',
    icon: 'phone',
    href: 'https://web.whatsapp.com/',
    target: '_blank',
    color: 'success'
  },
  {
    name: 'QQDoc',
    title: '在线文档',
    group: 'senior',
    icon: 'folder',
    href: 'https://docs.qq.com',
    target: '_blank',
    color: 'success'
  },
  {
    name: 'MFAMail',
    title: '内部邮箱',
    group: 'senior',
    icon: 'mail',
    href: 'https://mail.mfa.gov.cn',
    target: '_blank',
    color: 'success'
  },
  {
    name: 'BBVA',
    title: '国外网银',
    group: 'senior',
    icon: 'attach_money',
    href:
      'https://www.bbvaprovinet.provincial.com/WCPL_VE_WEB/wcpl_ve_web/provinet/BBVAInicioWC.jsp',
    target: '_blank',
    color: 'success'
  },
  {
    name: 'ElectronApp',
    title: '更多应用',
    group: 'senior',
    icon: 'more',
    href: 'https://electronjs.org/apps',
    target: '_blank',
    color: 'success'
  },
  {
    name: 'login',
    title: '登出',
    group: 'app',
    icon: 'account_box',
    color: 'success'
  }
]

export const menuItems = mainMenu.reduce((arr, item) => {
  if (item.title !== undefined) arr.push(item)
  return arr
}, [])

export default mainMenu
