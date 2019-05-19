const getters = {
  device: (state: { app: { device: any } }) => state.app.device,
  theme: (state: { app: { theme: any } }) => state.app.theme,
  color: (state: { app: { color: any } }) => state.app.color,
  token: (state: { user: { token: any } }) => state.user.token,
  lfToken: (state: { user: { token: any } }) => state.user.token,
  avatar: (state: { user: { avatar: any } }) => state.user.avatar,
  nickname: (state: { user: { name: any } }) => state.user.name,
  welcome: (state: { user: { welcome: any } }) => state.user.welcome,
  lfWelcome: (state: { entities: { user: { welcome: any } } }) => state.entities.user.welcome,
  // roles
  roles: (state: { user: { roles: any } }) => state.user.roles,
  // userInfo
  userInfo: (state: { user: { info: any } }) => state.user.info,
  // routes for user
  addRouters: (state: { permission: { addRouters: any } }) => state.permission.addRouters,
  multiTab: (state: { app: { multiTab: any } }) => state.app.multiTab
}

export default getters
