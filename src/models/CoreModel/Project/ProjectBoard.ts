import { BaseModel } from '../../BaseModel'
import Project from './Project'
import User from '../User/User'

export interface IProjectBoard {
  _id: string
  name: string
  owner: string
  type: string
}

export default class ProjectBoard extends BaseModel {
  static entity = 'projectBoard'

  static fields() {
    return {
      id: this.increment(),
      name: this.string('home'),
      title: this.string('Home Tasks'),
      owner: this.hasOne(User, 'user_id'),
      projects: this.hasMany(Project, 'board_id')
    }
  }
}
