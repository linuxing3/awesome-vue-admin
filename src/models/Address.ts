import { BaseModel } from './BaseModel'
export default class Address extends BaseModel {
  static entity = 'address'

  static fields() {
    return {
      _id: this.increment(),
      name: this.string('name'),
      direction: this.string('direction name'),
      street: this.string('street name'),
      suite: this.string('suite number'),
      area: this.string('area name'),
      city: this.string('city name'),
      state: this.string('state name'),
      country: this.string('country name'),
      zipcode: this.string('zipcode number')
    }
  }
}
