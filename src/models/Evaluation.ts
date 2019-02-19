import { BaseModel } from './BaseModel'

export interface IEvaluation {
  _id: string
  name: string
  description: string
  year: string
  date: string
  level: string
  proposal: string
  chief: string
}

export default class Evaluation extends BaseModel {
  static entity = 'evaluation'

  static fields() {
    return {
      _id: this.increment(),
      name: this.string('secretary'),
      description: this.string('A awesome manager'),
      year: this.string('2019'),
      date: this.string('2019-1-1'),
      level: this.string('Good'),
      proposal: this.string('Promotion'),
      chief: this.string('chief')
    }
  }
}
