import { models } from '@/store/plugins/store-orm.dva'
import { REQUEST_METHODS_TYPES } from '@/api/constant'

export default class XingRequest {
  namespace: string
  model: any
  fields: any[]

  constructor () {
    this.namespace = ''
    this.model = null
  }

  validateURL (path: string) {
    this.namespace = path.replace('/', '')
    this.model = models[this.namespace]
    this.fields = this.model.fieldsKeys()
  }

  /**
   * Mock request with vuex-orm-localforage
   * @param {string} url
   * @param {any} data
   */
  async request (url: string, data?: any) {
    let [method = 'get', path] = url.split(' ')

    this.validateURL(path)
    method = method.toLowerCase()

    if (REQUEST_METHODS_TYPES.mutation.includes(method)) {
      console.log('Mutating ...')
      if (method === 'post') {
        let createdItems = await this.model.$create({ data })
        return {
          result: {
            data: createdItems,
            model: this.model,
            fields: this.fields
          },
          method,
          status: 'Ok'
        }
      } else if (method === 'patch') {
        let updatedItems = await this.model.$update({ data })
        return {
          result: {
            data: updatedItems,
            model: this.model,
            fields: this.fields
          },
          method,
          status: 'Ok'
        }
      } else if (method === 'delete') {
        let deletedItems = await this.model.$delete(data._id)
        return {
          result: {
            data: deletedItems,
            model: this.model,
            fields: this.fields
          },
          method,
          status: 'Ok'
        }
      }
    }
    if (REQUEST_METHODS_TYPES.query.includes(method)) {
      console.log('Quering ...')
      if (data) {
        let foundItems = await this.model.$get(data._id)
        return {
          result: {
            data: foundItems,
            model: this.model,
            fields: this.fields
          },
          method,
          status: 'Ok'
        }
      } else {
        let allItems = await this.model.$fetch()
        return {
          result: {
            data: allItems,
            model: this.model,
            fields: this.fields
          },
          method,
          status: 'Ok'
        }
      }
    }
  }
}
