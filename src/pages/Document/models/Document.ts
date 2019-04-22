import { BaseModel } from '@/models/BaseModel'

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

  static meta = {
    section: 'core'
  }

  static fields () {
    return {
      _id: this.increment(),
      year: this.string('2019'),
      date: this.string('2019-02-25'),
      classiLevel: this.string('internal'),
      category: this.string('internal'),
      inOrOut: this.string('out'),
      sendingCode: this.string('Admin'),
      orderedNumber: this.string('001'),
      title: this.string('Admin'),
      content: this.string('Admin'),
      toEntity: this.string('Admin'),
      copyEntity: this.string('Admin'),
      attachment: this.string(''),
      keyword: this.string(''),
      workEntity: this.string('Admin'),
      author: this.string('Admin'),
      archive_id: this.attr(null),
      type_id: this.attr(null)
    }
  }
}
