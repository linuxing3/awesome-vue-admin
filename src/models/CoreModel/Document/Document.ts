import { BaseModel } from '../../BaseModel'

export default class Document extends BaseModel {
  static entity = 'document'

  static fields () {
    return {
      _id: this.increment(),
      classiLevel: this.string('internal'),
      category: this.string('internal'),
      year: this.string('2019'),
      inOrOut: this.string('output'),
      sendingCode: this.string('Vue'),
      orderedNumber: this.string('001'),
      title: this.string('Vue Typescript'),
      content: this.string('Vue with electron'),
      toEntity: this.string('Vue'),
      copyEntity: this.string('Electron'),
      date: this.string('2019-02-25'),
      attachment: this.string(''),
      keyword: this.string(''),
      workEntity: this.string('Code'),
      author: this.string('Daniel'),
      archive_id: this.attr(null),
      type_id: this.attr(null),
    }
  }
}
