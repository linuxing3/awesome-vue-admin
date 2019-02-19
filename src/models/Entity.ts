import { BaseModel } from './BaseModel'
export default class Entity extends BaseModel {
  static entity = 'entity'

  static fields() {
    return {
      _id: this.increment(),
      name: this.string('CEVE'),
      fullName: this.string('Chinese Embassy in Venezuela'),
      abbr: this.string('CEVE'),
      address: this.string('Mercedez, Baruta'),
      avatar: this.string('mfa')
    }
  }
}
