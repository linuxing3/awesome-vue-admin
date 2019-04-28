import { models } from '@/store/plugins/store-orm.dva'
import { REQUEST_METHODS_TYPES, CODE_MESSAGE } from '@/api/constant'

export default class XingRequest {
  method: string
  namespace: string
  params: string
  model: any
  fields: any[]
  response: any

  constructor () {
    this.namespace = ''
    this.model = null
  }

  /**
   * 异常处理程序
   */
  handleError (error: any) {
    const { response = {} } = error
    const errortext = CODE_MESSAGE[response.status] || response.statusText
    const { status, url } = response

    if (status === 401) {
      console.error({
        message: '未登录或登录已过期，请重新登录。'
      })
      // @HACK
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: 'login/logout'
      })
      return
    }
    console.error({
      message: `请求错误 ${status}: ${url}`,
      description: errortext
    })
    // environment should not be used
    if (status === 403) {
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: '/error'
      })
      return
    }
    if (status <= 504 && status >= 500) {
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: '/error'
      })
      return
    }
    if (status >= 404 && status < 422) {
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: '/notFound'
      })
    }
  };

  validateURL (url: string) {
    let [method = 'get', path] = url.split(' ')

    this.method = method.toLowerCase()
    this.namespace = path.split('/')[0]
    this.params = path.split('/')[1]
    this.model = models[this.namespace]
    this.fields = this.model.fieldsKeys()
  }
  /**
   * Mock request with vuex-orm-localforage
   * @param {string} url
   * @param {any} data
   */
  async request (url: string, data?: any) {
    this.validateURL(url)

    let result = {
      model: this.model,
      fields: this.fields,
      namespace: this.namespace,
      reqParams: this.params,
      reqMethod: this.method,
      reqData: data
    }

    if (REQUEST_METHODS_TYPES.mutation.includes(this.method)) {
      console.log('Mutating ...')
      if (this.method === 'post' && this.params === undefined) {
        let createdItems = await this.model.$create({ data })
        if (!createdItems) {
          return {
            status: 404,
            message: CODE_MESSAGE[404]
          }
        }
        return {
          result: {
            ...result,
            data: createdItems
          },
          status: 200,
          message: CODE_MESSAGE[200]
        }
      } else if (this.method === 'post' && this.params === 'delete') {
        data.map(async item => {
          await this.model.$delete(item._id)
        })
        return {
          result: {
            ...result,
            data: []
          },
          status: 200,
          message: CODE_MESSAGE[200]
        }
      } else if (this.method === 'patch') {
        let updatedItems = await this.model.$update({ data })
        if (!updatedItems) {
          return {
            status: 404,
            message: CODE_MESSAGE[404]
          }
        }
        return {
          result: {
            ...result,
            data: updatedItems
          },
          status: 200,
          message: CODE_MESSAGE[200]
        }
      } else if (this.method === 'delete') {
        let deletedItems = await this.model.$delete(data._id)
        return {
          result: {
            ...result,
            data: deletedItems
          },
          status: 200
        }
      }
    }
    if (REQUEST_METHODS_TYPES.query.includes(this.method)) {
      console.log('Quering ...')
      if (data) {
        let foundItems = await this.model.$get(data._id)
        if (!foundItems) {
          return {
            status: 404,
            message: CODE_MESSAGE[404]
          }
        }
        return {
          result: {
            ...result,
            data: foundItems
          },
          status: 200,
          message: CODE_MESSAGE[200]
        }
      } else {
        // Sync localforage with vuex store
        let allItems = await this.model.$fetch()
        if (!allItems) {
          return {
            status: 404,
            message: CODE_MESSAGE[404]
          }
        }
        return {
          result: {
            ...result,
            data: allItems
          },
          status: 200,
          message: CODE_MESSAGE[200]
        }
      }
    }
  }
}
