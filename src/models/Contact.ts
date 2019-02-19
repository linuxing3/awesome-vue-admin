import { BaseModel } from './BaseModel'
export default class Contact extends BaseModel {
  static entity = 'contact'

  static fields() {
    return {
      _id: this.increment(),
      name: this.string('John'),
      homePhone: this.string('001-212-1111111'),
      officePhone: this.string(''),
      cellPhone: this.string(''),
      email: this.string(''),
      wechat: this.string(''),
      whatsapp: this.string(''),
      github: this.string(''),
      twitter: this.string(''),
      instagram: this.string(''),
      homepage: this.string(''),
      avatar: this.string('')
    }
  }
}
