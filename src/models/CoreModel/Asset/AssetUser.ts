import { Model } from '@vuex-orm/core'

export default class AssetUser extends Model {
  static entity = 'assetUser'

  static primaryKey = [ 'asset_id', 'user_id' ]

  static meta = {
    icon: 'edit',
    size: 36,
    color: 'success',
    section: 'core'
  }

  static fields () {
    return {
      asset_id: this.attr(null),
      user_id: this.attr(null)
    }
  }
}
