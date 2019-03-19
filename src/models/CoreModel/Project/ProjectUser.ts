import { Model } from '@vuex-orm/core'

export default class ProjectUser extends Model {
  static entity = 'projectUser'

  static primaryKey = [ 'project_id', 'user_id' ]

  static fields () {
    return {
      project_id: this.attr(null),
      user_id: this.attr(null)
    }
  }
}
