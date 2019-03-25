import { BaseModel} from "../../BaseModel";

export interface ITest {
   _id: string
   name: string
   active: string
   
}

export default class Test extends BaseModel {
  static entity = "test";

  static fields() {
    return {
      _id: this.increment(),
      name: this.attr("name"),
      active: this.attr("active"),
      
    };
  }
}
