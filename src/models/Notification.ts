import { BaseModel } from './BaseModel'

export interface INotification {
  _id: string
  title: string
  color: string
  icon: string
  timeLabel: string
}

export default class Notification extends BaseModel {
  static entity = 'notification'

  static fields() {
    return {
      _id: this.increment(),
      title: this.string('New message from Michael'),
      color: this.string('light-green'),
      icon: this.string('account_circle'),
      timeLabel: this.string('2 min ago')
    }
  }
}
