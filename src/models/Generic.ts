import { BaseModel } from './BaseModel'
export interface IGeneric {
  _id: string
  name: string
}

export default class Generic extends BaseModel {
  static entity = 'generic'

  static fields() {
    return {
      _id: this.increment(),
      name: this.string('name')
    }
  }
}
