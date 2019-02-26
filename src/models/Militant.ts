import { BaseModel } from './BaseModel'

export interface IMilitant {
  _id: string
  name: string
  admistionDate: string
  formalizationDate: string
  registerDate: string
  transferDate: string
}

export default class Militant extends BaseModel {
  static entity = 'militant'

  static fields () {
    return {
      _id: this.increment(),
      name: this.string('Daniel'),
      gender: this.string('male'),
      etnia: this.string('han'),
      idNumber: this.string('888888'),
      birthday: this.string('2009-09-09'),
      academicBackground: this.string('Master'),
      hrCategory: this.string('public official'),
      department: this.string('Business'),
      workPostion: this.string('Business'),
      positionAndRank: this.string('Director'),
      militantComission: this.string('CN'),
      militantRole: this.string('Secretary'),
      militantAdmissionDate: this.string('2009-09-09'),
      militantFormalizationDate: this.string(''),
      militanceStatus: this.string('normal'),
      telephone: this.string('1111111'),
      homeAddress: this.string('home'),
      looseContact: this.boolean(false),
      floating: this.boolean(false),
      registerDate: this.string('registerDate'),
      transferDate: this.string('transferDate')
    }
  }
}
