import { BaseModel } from './BaseModel'

export interface IMilitant {
  _id: string
  name: string
  admistionDate: string
  formalizationDate: string
  registerDate: string
  transferDate: string
}

export default class Militant extends BaseModel {
  static entity = 'militant'

  static fields() {
    return {
      _id: this.increment(),
      name: this.string('Li'),
      admisionDate: this.string('admistionDate'),
      formalizationDate: this.string('formalizationDate'),
      registerDate: this.string('registerDate'),
      transferDate: this.string('transferDate')
    }
  }
}
