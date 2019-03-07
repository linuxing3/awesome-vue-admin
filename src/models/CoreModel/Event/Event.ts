import { BaseModel } from '../../BaseModel'

export default class Event extends BaseModel {
  static entity = 'activity'

  static fields () {
    return {
      _id: this.increment(),
      date: this.string('2019-02-23'),
      title: this.string('title'),
      time: this.string('12:00'),
      duration: this.number(60),
      applicant: this.string('John'),
      content: this.string('Meeting'),
      currentDate: this.string('2019-02-23'),
      reportDate: this.string('2019-02-23'),
      reportContent: this.string('Discussion'),
      instructionDate: this.string('2019-02-23'),
      instruction: this.string('Read'),
      priority: this.string('HIGH')
    }
  }
}
