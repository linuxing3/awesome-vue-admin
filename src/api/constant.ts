export const REQUEST_METHODS = ['post', 'get', 'delete', 'patch', 'put']

export const REQUEST_METHODS_TYPES = {
  mutation: ['post', 'delete', 'patch'],
  query: ['get']
}

export const ROLE_TYPE = {
  ADMIN: 'admin',
  DEFAULT: 'admin',
  DEVELOPER: 'developer'
}

export const CODE_MESSAGE = {
  200: '成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

export const CANCEL_REQUEST_MESSAGE = 'cancle request'

export function randomNumber (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function randomAvatar () {
  // https://uifaces.co
  const avatarList = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://d3iw72m71ie81c.cloudfront.net/female-17.jpg',
    'https://randomuser.me/api/portraits/men/35.jpg',
    'https://pbs.twimg.com/profile_images/835224725815246848/jdMBCxHS.jpg',
    'https://pbs.twimg.com/profile_images/584098247641300992/N25WgvW_.png',
    'https://d3iw72m71ie81c.cloudfront.net/male-5.jpg',
    'https://images.pexels.com/photos/413723/pexels-photo-413723.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/men/43.jpg',
    'https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg',
    'https://pbs.twimg.com/profile_images/943227488292962306/teiNNAiy.jpg',
    'https://randomuser.me/api/portraits/men/46.jpg'
  ]
  return avatarList[randomNumber(0, avatarList.length - 1)]
}

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer'
}

const userPermission = {
  DEFAULT: {
    visit: ['1', '2', '21', '7', '5', '51', '52', '53'],
    role: EnumRoleType.DEFAULT
  },
  ADMIN: {
    role: EnumRoleType.ADMIN
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER
  }
}

export const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
    avatar: randomAvatar()
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
    avatar: randomAvatar()
  },
  {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
    avatar: randomAvatar()
  }
]

export const ApiPrefix = '/api/v1'

/**
 * Request Options
 * @typedef requestOptions
 * @property {any} data data
 * @property {string} url url
 * @property {string} method method
 */
export const requestOptions = {
  data: {},
  url: '',
  method: 'PUT',
  params: {},
  baseUrl: '',
  auth: {
    username: '',
    password: ''
  },
  proxy: {
    host: '',
    port: 0,
    auth: {
      username: '',
      password: ''
    }
  },
  cancelToken: ''
}

export const reponseSchema = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  request: {}
}
