import { BaseModel } from '../../BaseModel'
import Document from './Document'

export default class Archive extends BaseModel {
  static entity = 'archive'

  static fields () {
    return {
      _id: this.increment(),
      type: this.string('XXX'),
      mark: this.string('XXX'),
      classiLevel: this.string('XXX'),
      date: this.string('2019-03-08'),
      title: this.string('XXX'),
      archiveEntity: this.string(''),
      attachment: this.string('XXX'),
      tags: this.string('XXX'),
      author: this.string('string'),
      manager: this.string('string'),
      documents:this.hasMany(Document, 'archive_id')
    }
  }
}
