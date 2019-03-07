import { BaseModel } from '../../BaseModel'

export default class UserDesignation extends BaseModel {
  static entity = 'userDesignation'

  static fields () {
    return {
      _id: this.increment(),
      designation: this.string('Business'),
      description: this.string('Daniel')
    }
  }
}
