import { BaseModel } from '../BaseModel'

export interface IDashboard {
   _id: string
   label: string
   value: number
}

export default class Dashboard extends BaseModel {
  static entity = 'dashboard'

  static fields () {
    return {
      _id: this.increment(),
      label: this.string('12am'),
      value: this.number(200)
    }
  }
}
