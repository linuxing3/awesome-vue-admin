import { models } from '@/store/plugins/store-orm.dva'
import { REQUEST_METHODS_TYPES } from '@/api/constant'

/**
 * Mock request with vuex-orm-localforage
 * @param {string} url
 * @param {any} data
 */
export async function request (url: string, data?: any) {
  let result: any = null
  let Model: any = null

  let [method = 'get', path] = url.split(' ')
  let [namespace] = path.split('/')
  Model = models[namespace]

  method = method.toLowerCase()

  if (REQUEST_METHODS_TYPES.mutation.includes(method)) {
    console.log('Mutating ...')
    if (method === 'post') {
      result = Model.$create({ data })
    } else if (method === 'patch') {
      result = Model.$update({ data })
    } else if (method === 'delete') {
      result = Model.delete(data._id)
    }
  }
  if (REQUEST_METHODS_TYPES.query.includes(method)) {
    console.log('Quering ...')
    if (data) {
      result = Model.query()
        .get()
        .find(data._id)
    }
    result = Model.query().get()
  }
  return result
}
