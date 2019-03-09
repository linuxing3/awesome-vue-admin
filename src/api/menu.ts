
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

const seniorMenu = [
  { header: '高级功能' },
  {
    title: '打开微信',
    group: 'senior',
    icon: 'fab fa-weixin',
    href: 'https://wx.qq.com',
    target: '_blank',
    name: 'Weixin'
  },
  {
    title: 'Whatsapp',
    group: 'senior',
    icon: 'fab fa-whatsapp',
    href: 'https://web.whatsapp.com/',
    target: '_blank',
    name: 'Whatsapp'
  },
  {
    title: '在线文档',
    group: 'senior',
    icon: 'fas fa-file-word',
    href: 'https://docs.qq.com',
    target: '_blank',
    name: 'QQDoc'
  },
  {
    title: '内部邮箱',
    group: 'senior',
    icon: 'fas fa-inbox',
    href: 'https://mail.mfa.gov.cn',
    target: '_blank',
    name: 'MFAMail'
  },
  {
    title: '国外网银',
    group: 'senior',
    icon: 'fas fa-money-bill',
    href:
      'https://www.bbvaprovinet.provincial.com/WCPL_VE_WEB/wcpl_ve_web/provinet/BBVAInicioWC.jsp',
    target: '_blank',
    name: 'BBVA'
  },
  {
    title: '更多应用',
    group: 'senior',
    icon: 'fab fa-chrome',
    href: 'https://electronjs.org/apps',
    target: '_blank',
    name: 'ElectronApp'
  }
]

export const menuItems = mainMenu.reduce((arr, item) => {
  if (item.title !== undefined) arr.push(item)
  return arr
}, [])

export default mainMenu
