import { BaseModel } from '../../BaseModel'

export default class DocumentType extends BaseModel {
  static entity = 'documentType'

  static fields () {
    return {
      _id: this.increment(),
      title: this.string('internal')
    }
  }
}
