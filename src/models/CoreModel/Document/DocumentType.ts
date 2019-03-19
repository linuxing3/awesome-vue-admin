import { BaseModel } from '../../BaseModel'
import Document from './Document';

export default class DocumentType extends BaseModel {
  static entity = 'documentType'

  static fields () {
    return {
      _id: this.increment(),
      title: this.string('internal'),
      documents: this.hasMany(Document, 'type_id')
    }
  }
}
