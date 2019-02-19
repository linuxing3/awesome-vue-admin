import { BaseModel } from './BaseModel'

export interface IApp {
  _id: string
  name: string
  title: string
  description: string
}

export default class App extends BaseModel {
  static entity = 'app'

  static fields() {
    return {
      _id: this.increment(),
      name: this.string('coder'),
      title: this.string('title'),
      description: this.string('description')
    }
  }
}
