import { BaseModel } from '../../BaseModel'

export interface ITestBook {
   _id: string
   name: string
   active: string

}

export default class TestBook extends BaseModel {
  static entity = 'testBook';

  static fields () {
    return {
      _id: this.increment(),
      name: this.attr('name'),
      active: this.attr('active')

    }
  }
}
