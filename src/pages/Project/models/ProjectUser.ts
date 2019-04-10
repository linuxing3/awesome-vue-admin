import { Model } from '@vuex-orm/core'

export default class ProjectUser extends Model {
  static entity = 'projectUser'

  static primaryKey = [ 'project_id', 'user_id' ]

  static meta = {
    icon: 'edit',
    size: 36,
    color: 'success',
    section: 'core'
  }

  static fields () {
    return {
      project_id: this.attr(null),
      user_id: this.attr(null)
    }
  }
}
