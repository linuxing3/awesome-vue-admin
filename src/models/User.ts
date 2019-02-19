import { Model } from '@vuex-orm/core'

interface IUser {
  name: string;
}

export default class User extends Model {
  static entity = 'user'
  static fields () {
    return {
      name: this.string('Daniel')
    }
  }
}
