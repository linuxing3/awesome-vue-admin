import { BaseModel } from '../../BaseModel'

export interface IProjectType {
  _id: string
  title: string
  description: string
}

export default class ProjectType extends BaseModel {
  static entity = 'projectType';

  static fields () {
    return {
      _id: this.increment(),
      title: this.string('dev'),
      description: this.string('description')
    }
  }
}
