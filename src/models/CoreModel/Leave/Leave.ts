import { BaseModel } from '../../BaseModel'

export interface ILeave {
   _id: string;
   applicant: string;
   fromDate: string;
   toDate: string;
   isActive: string;
   holidayList: string;

}

export default class Leave extends BaseModel {
  static entity = 'leave';

  static fields () {
    return {
      _id: this.increment(),
      applicant: this.string('applicant'),
      fromDate: this.string('fromDate'),
      toDate: this.string('toDate'),
      isActive: this.string('isActive'),
      holidayList: this.string('holidayList')

    }
  }
}
