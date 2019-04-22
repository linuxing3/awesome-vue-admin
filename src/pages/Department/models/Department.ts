import { BaseModel } from '@/models/BaseModel'
import User from '../../User/models/User'

export interface IDepartment {
   _id?: string
   department: string
}

export default class Department extends BaseModel {
  static entity = 'department'

  static meta = {
    section: 'core'
  }

  static fields () {
    return {
      _id: this.increment(),
      department: this.string('Business'),
      parentDepartment: this.string('Business'),
      LeaveApprovers: this.string('LeaveApprovers'),
      expenseApprovers: this.string('expenseApprovers'),
      departmentApprovers: this.string('departmentApprovers'),
      oldParentDepartment: this.string('oldParentDepartment'),
      users: this.hasMany(User, 'department_id')
    }
  }
}
