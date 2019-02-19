import { Model, BelongsTo } from '@vuex-orm/core'
import { BaseModel } from './BaseModel'
export default class Account extends BaseModel {
  static entity = 'account'

  static fields() {
    return {
      _id: Model.increment(),
      name: Model.string('embajadachina'),
      email: Model.string('embajadachina@gmail.com'),
      password: Model.string('embajadachina'),
      hash: Model.string(''),
      role: Model.string('')
    }
  }
}
