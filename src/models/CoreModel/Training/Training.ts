import { BaseModel } from '../../BaseModel'

export interface ITraining {
  _id: string
  title: string
  status: string
  type: string
  level: string
  trainer: string
  source: string
  location: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  introduction: string
  participants: string
}

export default class Training extends BaseModel {
  static entity = 'training'

  static fields() {
    return {
      id: this.increment(),
      title: this.string('computer'),
      status: this.string('status'),
      type: this.string('type'),
      level: this.string('level'),
      trainer: this.string('trainer'),
      source: this.string('source'),
      location: this.string('location'),
      startDate: this.string('priority'),
      endDate: this.string('priority'),
      startTime: this.string('09:00'),
      endTime: this.string('11:00'),
      introduction: this.string('introduction'),
      participants: this.string('participants')
    }
  }
}
