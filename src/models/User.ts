import { BaseModel } from './BaseModel'
import Entity from './Entity'

export default class User extends BaseModel {
  static entity = 'user'

  static fields() {
    return {
      _id: this.increment(),
      protocolId: this.string('2'),
      name: this.string('Xing Wenju'),
      etnia: this.string('han'),
      birthday: this.string('1978-09-16'),
      gender: this.string('male'),
      position: this.string('Political Consellor'),
      academicBackground: this.string('Master'),
      foreignLanguage: this.string('Spanish'),
      politicalRole: this.string('CPC'),
      rank: this.string('Directorial'),
      promotionDate: this.string('2017-1-1'),
      outRole: this.string('Political Consellor'),
      innerRole: this.string('Member of CPC Committee'),
      chargeOf: this.string('Second'),
      sendingEntity_id: this.attr(1),
      fromEntity_id: this.attr(1),
      sendingEntity: this.belongsTo(Entity, 'sendingEntity_id'),
      fromEntity: this.belongsTo(Entity, 'fromEntity_id'),
      arrivingDate: this.string('2016-4-9'),
      leavingDate: this.string('2020-4-9'),
      memo: this.string('No')
    }
  }
}
