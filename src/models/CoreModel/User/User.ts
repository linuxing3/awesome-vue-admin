import { BaseModel } from '../../BaseModel'
import UserMilitant from './UserMilitant';
import UserAppraisal from './UserAppraisal';
import Project from '../Project/Project';
import ProjectUser from '../Project/ProjectUser';
import UserDesignation from './UserDesignation';

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
      arrivingDate: this.string('2016-04-09'),
      rotatingDate: this.string('2020-04-09'),
      sendingEntity: this.string('MFA'),
      conyugeName: this.string('Luna'),
      conyugeEntity: this.string('n/a'),
      conyugeBonus: this.string('n/a'),
      memo: this.string('n/a'),
      protocolId: this.number(101),
      isActive: this.string('n/a'),
      militant: this.hasOne(UserMilitant, 'user_id'),
      appraisals: this.hasMany(UserAppraisal, 'user_id'),
      designations: this.hasMany(UserDesignation, 'user_id'),
      projects: this.belongsToMany(Project, ProjectUser, 'project_id', 'user_id')
    }
  }
}
