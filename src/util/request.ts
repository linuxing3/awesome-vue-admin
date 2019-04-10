import { models } from '@/store/plugins/store-orm.dva'
import { REQUEST_METHODS_TYPES } from '@/api/constant'

/**
 * Mock request with vuex-orm-localforage
 * @param {string} url
 * @param {any} data
 */
export async function request (url: string, data: any) {
  let result: any = null
  let Model: any = null

  const [method = 'get', path] = url.split(' ')
  const [namespace] = path.split('/')
  Model = models[namespace]

  if (REQUEST_METHODS_TYPES.mutation.includes(method.toLowerCase())) {
    console.log('Mutating ...')
    if (method.toLowerCase() === 'post') {
      result = Model.$create({ data })
    } else if (method.toLowerCase() === 'patch') {
      result = Model.$update({ data })
    } else if (method.toLowerCase() === 'delete') {
      result = Model.delete(data._id)
    }
  }
  if (REQUEST_METHODS_TYPES.query.includes(method.toLowerCase())) {
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
