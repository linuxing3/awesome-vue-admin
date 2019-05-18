import store from '@/store'
import models from '@/models'

const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0,
  status: null,
  headers: null
}

/**
 * 获取数据，包装成axios类似的返回格式
 * @param {any} data Data from request
 * @param {string} message Response messag
 * @param {number} code Response code
 * @param {any} headers Response headers
 */
export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.result = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody.status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody.headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

/**
 * 获取url查询参数字符串，包装为json对象
 * @param {any} options Url查询参数字符串
 */
export const getQueryParameters = options => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

/**
 * 获取请求体字符串，返回json对象
 * @param {any} options 获取请求体
 */
export const getBody = options => {
  return options.body && JSON.parse(options.body)
}

// 创建 axios localforage 实例
const lfService = {
  /**
   * @param {*}
   * @param url {string}
   * @param method {string}
   * @param data {*}
   * @return {*}
   * @return url {string}
   * @return method {string}
   * @return data {any}
   * @return namespace {any}
   * @return action {any}
   * @return model {Model}
   * @return prefix {any}
   */
  validateUrl: ({ url, method, data, pagination }) => {
    const [prefix, namespace, action] = url.split('/')
    const model = models[namespace]
    return {
      method,
      data,
      model,
      pagination,
      namespace,
      url,
      prefix,
      action
    }
  },
  response: async function(params) {
    const result = await this.request(params)
    return result
  },
  /**
   * 从请求参数中获取model等，包装返回类axios的内容
   * @param {any} params 请求参数
   */
  request: async function(params) {
    const newParams = this.validateUrl(params)
    console.log(newParams)
    const result = await this.handleRequest(newParams)
    return result
  },
  async post(model, data) {
    const createdItems = await model.$create({ data })
    return {
      model,
      data: createdItems
    }
  },
  async remove(model, data) {
    const deletedItems = await model.$delete(data.id || data)
    return {
      model,
      data: deletedItems
    }
  },
  async patch(model, data) {
    const updatedItems = await model.$delete({ data })
    return {
      model,
      data: updatedItems
    }
  },
  handleRequest: async ({ method, data, model, namespace, pagination }) => {
    // Using vuex-orm with localforage
    try {
      let requestedData = null
      // data from localforage
      switch (method) {
        case 'post':
          const createdItems = await model.$create({ data })
          requestedData = {
            model,
            data: createdItems
          }
          break
        case 'delete':
          const deletedItems = await model.$delete(data.id || data)
          requestedData = {
            model,
            data: deletedItems
          }
          break
        case 'patch':
          const updatedItems = await model.$update({ data })
          requestedData = {
            model,
            data: updatedItems
          }
          break
        case 'get':
          if (!data) {
            await model.$fetch()
            // pagination
            const totalCount = model.query().count() || 0
            const pageNo = (pagination.pageNo && parseInt(pagination.pageNo)) || 1
            const pageSize = (pagination.pageSize && parseInt(pagination.pageSize)) || 10
            const totalPage = Math.ceil(totalCount / pageSize) || 0
            // offset and next
            const offset = (pageNo - 1) * pageSize || 0
            const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1
            // query with pagination
            const paginatedData = model
              .query()
              .offset(offset)
              .limit(pageSize)
              .get()
            // build data and attach to result
            requestedData = {
              model,
              pageSize,
              pageNo,
              totalCount,
              totalPage,
              offset,
              next,
              data: paginatedData
            }
          } else {
            await model.$get(data.id || data)
            const foundItem = model.find(data.id || data) || {}
            requestedData = {
              model,
              data: foundItem
            }
          }
          break
      }

      // build response
      console.log(`${method} Localforage vuex -> `, requestedData)
      const response = builder(requestedData, `${method} ${namespace} Ok`, 200, {})
      return Promise.resolve(response)
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      const response = builder(error, 'Error', 500, {})
      return Promise.reject(response)
    }
  },
  $response: async ({ method, data, namespace }) => {
    // Using vuex-orm without localforage
    try {
      let requestedData
      switch (method) {
        case 'post':
          requestedData = await store.dispatch(`entities/${namespace}/create`, data)
          break
        case 'delete':
          requestedData = await store.dispatch(`entities/${namespace}/delete`, data._id || data)
          break
        case 'patch':
          requestedData = await store.dispatch(`entities/${namespace}/update`, data)
          break
        case 'put':
          requestedData = await store.dispatch(`entities/${namespace}/update`, data)
          break
        case 'get':
          if (!data) {
            const foundItems = await store.dispatch(`entities/${namespace}/all`)
            requestedData = foundItems || []
          } else {
            const foundItem = await store.dispatch(`entities/${namespace}/find`, data.id || data)
            requestedData = foundItem || {}
          }
          break
      }
      return Promise.resolve(
        builder(
          {
            data: requestedData
          },
          '',
          200,
          {}
        )
      )
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default lfService
