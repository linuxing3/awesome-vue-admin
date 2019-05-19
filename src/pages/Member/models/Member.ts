import { BaseModel } from '@/models/BaseModel'

export default class Member extends BaseModel {
  static entity = 'member'

  static meta = {
    section: 'core'
  }

  static fields() {
    return {
      id: this.increment(),
      name: this.string('Emacser'),
      username: this.string('admin'),
      password: this.string(''),
      avatar: this.string('/avatar2.jpg'),
      status: this.number(1),
      telephone: this.string('')
    }
  }
}
