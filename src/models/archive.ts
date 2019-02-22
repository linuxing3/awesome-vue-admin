import { BaseModel } from './BaseModel'
import Document from './Document'
import User from './User'
import Entity from './Entity'

export default class Archive extends BaseModel {
  static entity = 'archive'

  static fields () {
    return {
      _id: this.increment(),
      type: this.string('XXX'),
      mark: this.string('XXX'),
      classification: this.string('XXX'),
      startDate: this.string('2018-12-30'),
      title: this.string('XXX'),
      archiveEntity_id: this.attr(1),
      archiveEntity: this.belongsTo(Entity, 'archiveEntity_id'),
      attachment: this.string('XXX'),
      tags: this.string('XXX'),
      author: this.belongsTo(User, 'author_id'),
      author_id: this.attr(1),
      manager: this.belongsTo(User, 'manager_id'),
      manager_id: this.attr(1)
    }
  }
}
