import { BaseModel } from '@/models/BaseModel'

export default class UserAppraisalGoal extends BaseModel {
  static entity = 'userAppraisalGoal'

  static fields () {
    return {
      _id: this.increment(),
      kra: this.string('Business'),
      perWeightage: this.string('Daniel'),
      score: this.string('male'),
      score_earned: this.string('80')
    }
  }
}
