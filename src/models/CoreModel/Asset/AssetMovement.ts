import { BaseModel } from '../../BaseModel'

export interface IAssetMovement {
   _id: string;
   asset: string;
   transactionDate: string;
   quantity: string;
   serialNo: string;
   sourceLocation: string;
   targetLocation: string;
   fromUser: string;
   toUser: string;
   referenceNo: string;

}

export default class AssetMovement extends BaseModel {
  static entity = 'assetMovement';

  static fields () {
    return {
      _id: this.increment(),
      asset: this.string('asset'),
      transactionDate: this.string('transactionDate'),
      quantity: this.string('quantity'),
      serialNo: this.string('serialNo'),
      sourceLocation: this.string('sourceLocation'),
      targetLocation: this.string('targetLocation'),
      fromUser: this.string('fromUser'),
      toUser: this.string('toUser'),
      referenceNo: this.string('referenceNo')
    }
  }
}
