import { BaseModel } from './BaseModel'

export interface IMenu {
  _id: string
  title: string
  group: string
  icon: string
  href: string
  target: string
  name: string
}

export default class Menu extends BaseModel {
  static entity = 'menu'

  static fields() {
    return {
      _id: this.increment(),
      title: this.string('title'),
      group: this.string('group'),
      icon: this.string('icon'),
      href: this.string('href'),
      target: this.string('target'),
      name: this.string('name')
    }
  }
}
