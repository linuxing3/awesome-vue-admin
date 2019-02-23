import { BaseModel} from "./BaseModel";

export interface IAsset {
   _id: string;
   name: string;
   brand: string;
   unit: string;
   quantity: string;
   price: string;
   total: string;
   note: string;
}

export default class Asset extends BaseModel {
  static entity = "asset";

  static fields() {
    return {
      _id: this.increment(),
      name: this.string("none"),
      brand: this.string("brand"),
      unit: this.string("unit"),
      quantity: this.string("quantity"),
      price: this.string("price"),
      total: this.string("total"),
      note: this.string("note")
    };
  }
}
