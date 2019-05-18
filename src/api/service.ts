import lfService from '@/util/request.localforage'

export const api = {
  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: '/user/login',

  queryUser: '/user/:id',
  queryUserList: '/user',
  updateUser: '/user/:id',
  createUser: '/user',
  removeUser: '/user/:id',
  removeUserList: '/user/delete',

  queryPost: '/post/:id',
  queryPostList: '/post',
  updatePost: '/post/:id',
  createPost: '/post',
  removePost: '/post/:id',
  removePostList: '/post/delete',

  queryDocument: '/document/:id',
  queryDocumentList: '/document',
  updateDocument: '/document/:id',
  createDocument: '/document',
  removeDocument: '/document/:id',
  removeDocumentList: '/document/delete',

  queryDashboard: '/dashboard'
}

/**
 * 参考`src/services/index.js`文件，对api配置进行遍历，
 * 每个属性都返回对应的封装后的request函数。
 * @param {string} params url like '/user/login'
 * @returns {Function<Promise<any>>} result
 */
const gen = url => {
  return function(method, data) {
    return lfService.request({ url, method, data })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

export default APIFunction
