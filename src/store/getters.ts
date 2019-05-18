const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  lfToken: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  lfWelcome: state => state.entities.user.welcome,
  // roles
  roles: state => state.user.roles,
  // userInfo
  userInfo: state => state.user.info,
  // routes for user
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab
}

export default getters
