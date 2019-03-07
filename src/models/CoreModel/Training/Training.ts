import { BaseModel } from '../../BaseModel'

export interface ITraining {
   _id: string;
   title: string;
   status: string;
   type: string;
   level: string;
   trainer: string;
   source: string;
   location: string;
   startDate: string;
   endDate: string;
   startTime: string;
   endTime: string;
   introduction: string;
   participants: string;

}

export default class Training extends BaseModel {
  static entity = 'training';

  static fields () {
    return {
      _id: this.increment(),
      title: this.string('computer'),
      status: this.string('status'),
      type: this.string('type'),
      level: this.string('level'),
      trainer: this.string('trainer'),
      source: this.string('source'),
      location: this.string('location'),
      startDate: this.string('startDate'),
      endDate: this.string('endDate'),
      startTime: this.string('startTime'),
      endTime: this.string('endTime'),
      introduction: this.string('introduction'),
      participants: this.string('participants')
    }
  }
}
