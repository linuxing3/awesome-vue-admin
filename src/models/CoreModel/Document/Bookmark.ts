import { BaseModel } from '../../BaseModel'
export default class Bookmark extends BaseModel {
  static entity = 'bookmark'

  static fields () {
    return {
      _id: this.increment(),
      url: this.string('http://eluniversal.com'),
      title: this.string('El Universal'),
      description: this.string('El Universal diary'),
      tags: this.string('ve'),
      date: this.string('2019-03-10')
    }
  }
}
