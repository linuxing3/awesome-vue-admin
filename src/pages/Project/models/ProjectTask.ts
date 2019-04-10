import { BaseModel } from '@/models/BaseModel'

export interface IProjectTask {
  _id?: string
  title: string
  description?: string
  status?: string // Open\nWorking\nPending Review\nOverdue\nCompleted\nCancelled
  taskWeight?: string
  startDate?: string
  endDate?: string
  priority?: string
}

export default class ProjectTask extends BaseModel {
  static entity = 'projectTask'

  static fields () {
    return {
      _id: this.increment(),
      title: this.string('dev'),
      description: this.string('description'),
      status: this.string('status'),
      taskWeight: this.string('taskWeight'),
      startDate: this.string('2019-03-08'),
      endDate: this.string('2019-03-08'),
      priority: this.string('priority'),
      project_id: this.attr(null)
    }
  }
}
