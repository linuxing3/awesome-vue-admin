import { BaseModel } from './BaseModel'

import User from './User'
export default class Vacation extends BaseModel {
  static entity = 'vacation'

  static fields() {
    return {
      _id: this.increment(),
      applicant: this.string('applicant'),
      user_id: this.attr(1),
      user: this.belongsTo(User, '_id'),
      startDate: this.string('startDate'),
      endDate: this.string('endDate'),
      routes: this.string('routes'),
      type: this.string('type'),
      flightTicket: this.string('flightTicket'),
      hotelRoom: this.string('hotelRoom'),
      transport: this.string('transport')
    }
  }
}
