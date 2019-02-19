import { BaseModel } from './BaseModel'
export default class Mail extends BaseModel {
  static entity = 'mail'

  static fields() {
    return {
      _id: this.increment(),
      uuid: this.string('bb428c03-1bc6-4f3d-9d5e-268ec44eebc3'),
      type: this.string('trashed'),
      tag: this.string('dev'),
      title: this.string('vuejs'),
      created_at: this.string('2018-04-10T23:10:41.266Z'),
      content: this.string('Promotion'),
      fromId: this.string('14ddae1e-986d-42f4-8d17-46a02d469b2b'),
      attachments: this.attr(null)
    }
  }
}
