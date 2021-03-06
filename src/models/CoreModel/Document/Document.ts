import { BaseModel } from '../../BaseModel'

export interface IDocument {
  _id?: string
  year?: string
  date?: string
  classiLevel?: string
  category?: string
  inOrOut?: string
  sendingCode?: string
  orderedNumber?: string
  title: string
  content?: string
  toEntity?: string
  copyEntity?: string
  attachment?: string
  keyword?: string
  workEntity?: string
  author?: string
}

export default class Document extends BaseModel {
  static entity = 'document'

  static fields () {
    return {
      _id: this.increment(),
      year: this.string('2019'),
      date: this.string('2019-02-25'),
      classiLevel: this.string('internal'),
      category: this.string('internal'),
      inOrOut: this.string('output'),
      sendingCode: this.string('Vue'),
      orderedNumber: this.string('001'),
      title: this.string('Vue Typescript'),
      content: this.string('Vue with electron'),
      toEntity: this.string('Vue'),
      copyEntity: this.string('Electron'),
      attachment: this.string(''),
      keyword: this.string(''),
      workEntity: this.string('Code'),
      author: this.string('Daniel'),
      archive_id: this.attr(null),
      type_id: this.attr(null)
    }
  }
}
