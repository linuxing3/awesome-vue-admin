import { BaseModel } from './BaseModel'

export interface IResummee {
  _id: string
  name: string
  startDate: string
  endDate: string
  entity: string
  role: string
}

export default class Resummee extends BaseModel {
  static entity = 'resummee'

  static fields() {
    return {
      _id: this.increment(),
      name: this.string('Nodoby'),
      startDate: this.string('startDate'),
      endDate: this.string('endDate'),
      entity: this.string('entity'),
      role: this.string('role')
    }
  }
}
