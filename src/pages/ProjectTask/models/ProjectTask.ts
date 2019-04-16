import { BaseModel } from '@/models/BaseModel'

export interface IProjectTask {
   _id?: string
}

export default class ProjectTask extends BaseModel {
  static entity = 'projectTask';

  static fields () {
    return {
      _id: this.increment()
    }
  }
}
