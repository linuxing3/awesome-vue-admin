import { BaseModel } from './BaseModel'

export default class Trending extends BaseModel {
  static entity = 'trending'

  static fields() {
    return {
      _id: this.increment(),
      subheading: this.string('Sales'),
      headline: this.string('2018-12-31'),
      caption: this.string('Tasks completed'),
      percent: this.number(90),
      icon: this.attr({
        label: 'list',
        color: 'primary'
      }),
      linear: this.attr({
        value: 90,
        clor: 'success'
      })
    }
  }
}
