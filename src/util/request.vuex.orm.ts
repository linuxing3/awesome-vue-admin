import { models } from '@/store/plugins/store-orm.dva'
import { REQUEST_METHODS_TYPES } from '@/api/constant'

export default class XingRequest {
  namespace
  model
  result
  fields

  constructor () {
    this.namespace = ''
    this.model = null
    this.result = []
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
  request (url: string, data?: any) {
    let [method = 'get', path] = url.split(' ')

    this.validateURL(path)
    method = method.toLowerCase()

    if (REQUEST_METHODS_TYPES.mutation.includes(method)) {
      console.log('Mutating ...')
      if (method === 'post') {
        this.result = this.model.$create({ data })
      } else if (method === 'patch') {
        this.result = this.model.$update({ data })
      } else if (method === 'delete') {
        this.result = this.model.delete(data._id)
      }
    }
    if (REQUEST_METHODS_TYPES.query.includes(method)) {
      console.log('Quering ...')
      if (data) {
        this.result = this.model
          .query()
          .get()
          .find(data._id)
      }
      this.result = this.model.query().get()
    }

    return {
      data: this.result,
      meta: {
        fields: this.fields
      },
      status: 'Ok' }
  }
}
