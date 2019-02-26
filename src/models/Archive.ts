import { BaseModel } from './BaseModel'
import User from './User'
import Entity from './Entity'

export default class Archive extends BaseModel {
  static entity = 'archive'

  static fields () {
    return {
      _id: this.increment(),
      type: this.string('XXX'),
      mark: this.string('XXX'),
      classiLevel: this.string('XXX'),
      startDate: this.string('2018-12-30'),
      title: this.string('XXX'),
      archiveEntity: this.string(''),
      attachment: this.string('XXX'),
      tags: this.string('XXX'),
      author: this.string('string'),
      manager: this.string('string')
    }
  }
}
