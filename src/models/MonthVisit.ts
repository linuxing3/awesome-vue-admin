import { BaseModel } from './BaseModel'

export default class MonthVisit extends BaseModel {
  static entity = 'monthvisit'

  static fields() {
    return {
      _id: this.increment(),
      month: this.string('Jan'),
      inner: this.string('inner'),
      outer: this.string('outer')
    }
  }
}
