import { BaseModel } from '@/models/BaseModel'
import Project from '@/pages/Project/models/Project'
import User from '@/pages/User/models/User'

export interface IProjectBoard {
  _id?: string
  name: string
  owner?: string
  type?: string
}

export default class ProjectBoard extends BaseModel {
  static entity = 'projectBoard'

  static fields () {
    return {
      _id: this.increment(),
      name: this.string('home'),
      title: this.string('Home Tasks'),
      owner: this.hasOne(User, 'user_id'),
      projects: this.hasMany(Project, 'board_id')
    }
  }
}
