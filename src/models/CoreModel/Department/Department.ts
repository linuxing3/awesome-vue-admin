import { BaseModel } from '../../BaseModel'

export default class Department extends BaseModel {
  static entity = 'department'

  static fields () {
    return {
      _id: this.increment(),
      department: this.string('Business'),
      parentDepartment: this.string('Business'),
      LeaveApprovers: this.string('LeaveApprovers'),
      expenseApprovers: this.string('expenseApprovers'),
      departmentApprovers: this.string('departmentApprovers'),
      oldParentDepartment: this.string('oldParentDepartment')
    }
  }
}
