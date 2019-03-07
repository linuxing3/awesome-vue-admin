import { BaseModel } from '../../BaseModel'

export interface IAssetMaintenance {
  _id: string
  assetName: string
  itemCode: string
  itemName: string
  maintenanceTeam: string
  maintenanceManager: string
  maintenanceType: string
  periodicity: string
  maintenanceStatus: string
  hasCertificate: string
}

export default class AssetMaintenance extends BaseModel {
  static entity = 'assetMaintenance';

  static fields () {
    return {
      _id: this.increment(),
      assetName: this.string('asset'),
      itemCode: this.string('itemCode'),
      itemName: this.string('itemName'),
      maintenanceTeam: this.string('maintenanceTeam'),
      maintenanceManager: this.string('maintenanceManager'),
      maintenanceType: this.string('maintenanceType'),
      periodicity: this.string('periodicity'),
      maintenanceStatus: this.string('maintenanceStatus'),
      hasCertificate: this.string('hasCertificate')
    }
  }
}
