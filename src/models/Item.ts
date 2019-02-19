import { BaseModel } from './BaseModel'

export default class Item extends BaseModel {
  static entity = 'item'

  static fields() {
    return {
      _id: this.increment(),
      name: this.string('food'),
      brand: this.string('brand'),
      model: this.string('model'),
      productionDate: this.string('productionDate'),
      overdueDate: this.string('overdueDate'),
      description: this.string('description'),
      price: this.string('price')
    }
  }
}
