import { BaseModel } from './BaseModel'
import User from './User'
import Entity from './Entity'

export default class Document extends BaseModel {
  static entity = 'document'

  static fields() {
    return {
      _id: this.increment(),
      type: this.string('XXX'),
      mark: this.string('XXX'),
      classification: this.string('XXX'),
      startDate: this.string('2018-12-30'),
      title: this.string('XXX'),
      text: this.string('XXX'),
      sendingEntity_id: this.attr(1),
      fromEntity_id: this.attr(1),
      sendingEntity: this.belongsTo(Entity, 'sendingEntity_id'),
      fromEntity: this.belongsTo(Entity, 'fromEntity_id'),
      toEntity_id: this.attr(1),
      copyEntity_id: this.attr(1),
      toEntity: this.belongsTo(Entity, 'toEntity_id'),
      copyEntity: this.belongsTo(Entity, 'copyEntity_id'),
      attachment: this.string('XXX'),
      tags: this.string('XXX'),
      author: this.belongsTo(User, 'author_id'),
      author_id: this.attr(1)
    }
  }
}
