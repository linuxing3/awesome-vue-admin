import { BaseModel } from './BaseModel'

export default class Social extends BaseModel {
  static entity = 'social'

  static fields() {
    return {
      _id: this.increment(),
      title: this.string('100+'),
      'sub-title': this.string('Likes'),
      caption: this.string('Facebook'),
      icon: this.string('fab fa-facebook'),
      color: this.string('indigo'),
      value: this.number(15)
    }
  }
}
