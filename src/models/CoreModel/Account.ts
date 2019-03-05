import { Model, BelongsTo } from '@vuex-orm/core'
import { BaseModel } from '../BaseModel'
export default class Account extends BaseModel {
  static entity = 'account'

  static fields () {
    return {
      _id: Model.increment(),
      name: Model.string(''),
      email: Model.string(''),
      password: Model.string(''),
      hash: Model.string(''),
      role: Model.string('')
    }
  }

  isAdmin () {
    return this['role'] === 'admin'
  }
}
