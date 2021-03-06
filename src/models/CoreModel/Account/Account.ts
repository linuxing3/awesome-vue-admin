import { Model, BelongsTo } from '@vuex-orm/core'
import { BaseModel } from '../../BaseModel'

export interface IAccount {
  id?: string
  _id?: string
  $id?: string
  name: string
  email?: string
  password: string
  hash?: string
  role?: string
  avatar?: string
}

export default class Account extends BaseModel {
  static entity = 'account'

  static fields () {
    return {
      _id: this.increment(),
      name: this.string(''),
      email: this.string(''),
      password: this.string(''),
      hash: this.string(''),
      role: this.string(''),
      avatar: this.string('avatar/man_1.jpg')
    }
  }

  isAdmin () {
    return this['role'] === 'admin'
  }
}
