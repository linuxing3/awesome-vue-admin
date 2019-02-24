import { BaseModel } from './BaseModel'

export default class Activity extends BaseModel {
  static entity = 'activity'

  static fields () {
    return {
      _id: this.increment(),
      applicant: this.string('John'),
      occurenceDate: this.string('2019-2-23'),
      title: this.string('title'),
      content: this.string('Meeting'),
      currentDate: this.string('2019-2-23'),
      startTime: this.string('12:00'),
      duration: this.number(60),
      reportDate: this.string('2019-2-23'),
      reportContent: this.string('Discussion'),
      instructionDate: this.string('2019-2-23'),
      instruction: this.string('Read'),
      priority: this.string('HIGH')
    }
  }
}
