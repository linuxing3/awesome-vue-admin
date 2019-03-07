import { BaseModel } from '../../BaseModel'

export interface IProject {
   _id: string;
   Name: string;
   type: string;
   status: string;
   isActive: string;
   percentComplete: string;
   expectedStartDate: string;
   expectedEndDate: string;
   priority: string;
   department: string;
   tasks: string;
   notes: string;
   actualStartDate: string;
   actualEndDate: string;
   estimatedCost: string;
   totalCost: string;
   ExpenseClaim: string;
   collectProgress: string;
   frequency: string;
   fromTime: string;
   toTime: string;

}

export default class Project extends BaseModel {
  static entity = 'project';

  static fields () {
    return {
      _id: this.increment(),
      Name: this.string('dev'),
      type: this.string('type'),
      status: this.string('status'),
      isActive: this.string('isActive'),
      percentComplete: this.string('percentComplete'),
      expectedStartDate: this.string('expectedStartDate'),
      expectedEndDate: this.string('expectedEndDate'),
      priority: this.string('priority'),
      department: this.string('department'),
      tasks: this.string('tasks'),
      notes: this.string('notes'),
      actualStartDate: this.string('actualStartDate'),
      actualEndDate: this.string('actualEndDate'),
      estimatedCost: this.string('estimatedCost'),
      totalCost: this.string('totalCost'),
      ExpenseClaim: this.string('ExpenseClaim'),
      collectProgress: this.string('collectProgress'),
      frequency: this.string('frequency'),
      fromTime: this.string('fromTime'),
      toTime: this.string('toTime')
    }
  }
}
