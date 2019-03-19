import { BaseModel } from '../../BaseModel'
import Employee from './Employee';

export interface IEmployeePromotion {
  _id: string
  name: string
  department: string
  promotionDate: string
  promotionDetails: string

}

export default class EmployeePromotion extends BaseModel {
  static entity = 'employeePromotion'

  static fields () {
    return {
      _id: this.increment(),
      name: this.string('secretary'),
      department: this.string('department'),
      promotionDate: this.string('promotionDate'),
      promotionDetails: this.string('promotionDetails'),
      Employee_id: this.attr(null)
    }
  }
}
