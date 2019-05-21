const getters = {
  device: (state: any) => state.app.device,
  theme: (state: any) => state.app.theme,
  color: (state: any) => state.app.color,
  avatar: (state: any) => state.entities.member.avatar,
  nickname: (state: any) => state.entities.member.name,
  welcome: (state: any) => state.app.welcome,
  // token saved in localstorage
  token: (state: any) => state.entities.member.token,
  // roles requested from server
  roles: (state: any) => state.entities.member.roles,
  // userInfo requested from server
  userInfo: (state: any) => state.entities.member.defaultMember,
  // routes for user
  addRouters: (state: any) => state.permission.addRouters,
  multiTab: (state: any) => state.app.multiTab
}

export default getters
