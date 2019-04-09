import { BaseModel } from '@/models/BaseModel'

export interface IUser {
   _id?: string
}

export default class User extends BaseModel {
  static entity = 'user';

  static fields () {
    return {
      _id: this.increment()
    }
  }
}
