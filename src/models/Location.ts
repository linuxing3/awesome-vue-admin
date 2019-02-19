import { BaseModel } from './BaseModel'
export default class Location extends BaseModel {
  static entity = 'location'
  static fields() {
    return {
      _id: this.increment(),
      latitude: this.string('none'),
      longitude: this.string('longitude')
    }
  }
}
