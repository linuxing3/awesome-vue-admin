import { BaseModel } from '../../BaseModel'

export default class User extends BaseModel {
  static entity = 'user'

  static fields () {
    return {
      _id: this.increment(),
      department: this.string('Business'),
      name: this.string('Daniel'),
      gender: this.string('male'),
      birthday: this.string('2009-09-09'),
      etnia: this.string('han'),
      academicBackground: this.string('Master'),
      foreignLanguage: this.string('Spanish'),
      politicalRole: this.string('CPC'),
      positionAndRank: this.string('Directorial'),
      militantRole: this.string('Discipline comissioner'),
      duty: this.string('Political Consellor'),
      fromEntity: this.string('MFA'),
      arrivingDate: this.string('2016-4-9'),
      rotatingDate: this.string('2020-4-9'),
      sendingEntity: this.string('MFA'),
      conyugeName: this.string('Luna'),
      conyugeEntity: this.string('n/a'),
      conyugeBonus: this.string('n/a'),
      memo: this.string('n/a'),
      protocolId: this.number(101),
      isActive: this.string('n/a')
    }
  }
}
