import { BaseModel } from '@/models/BaseModel'
import Document from '@/pages/Document/models/Document'

export interface IDocumentType {
  _id?: string
  title: string
}

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
