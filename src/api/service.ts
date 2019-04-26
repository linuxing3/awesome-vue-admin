import XingRequest from '@/util/request.vuex.orm'

const axios = new XingRequest()

export const api = {
  queryUserInfo: 'GET /user',
  logoutUser: 'GET /user/logout',
  loginUser: 'POST /user/login',

  queryUser: 'GET /user/:id',
  queryUserList: 'GET /user',
  updateUser: 'PATCH /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /user/delete',

  queryPost: 'GET /post/:id',
  queryPostList: 'GET /post',
  updatePost: 'PATCH /post/:id',
  createPost: 'POST /post',
  removePost: 'DELETE /post/:id',
  removePostList: 'POST /post/delete',

  queryDocument: 'GET /document/:id',
  queryDocumentList: 'GET /document',
  updateDocument: 'PATCH /document/:id',
  createDocument: 'POST /document',
  removeDocument: 'DELETE /document/:id',
  removeDocumentList: 'POST /document/delete',

  queryDashboard: 'GET /dashboard'
}

/**
 * 参考`src/services/index.js`文件，对api配置进行遍历，
 * 每个属性都返回对应的封装后的request函数。
 * @param {string} params url like 'POST /user/login'
 * @returns {Function<Promise<any>>} result
 */
const gen = url => {
  return function (data) {
    return axios.request(url, data)
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

export default APIFunction
