import { BaseModel } from '@/models/BaseModel'

export interface IEvent {
   _id?: string
}

export default class Event extends BaseModel {
  static entity = 'event';

  static fields () {
    return {
      _id: this.increment()
    }
  }
}
