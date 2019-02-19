import { BaseModel } from './BaseModel'

export default class Activity extends BaseModel {
  static entity = 'activity'

  static fields() {
    return {
      _id: this.increment(),
      applicant: this.string('John'),
      occurenceDate: this.string('2018-10-30'),
      content: this.string('Meeting'),
      currentDate: this.string('2018-10-30'),
      startTime: this.string('12:00'),
      endTime: this.string('12:00'),
      reportDate: this.string('2018-10-30'),
      reportContent: this.string('Discussion'),
      instructionDate: this.string('2018-10-30'),
      instruction: this.string('Read'),
      priority: this.string('HIGH')
    }
  }
}
