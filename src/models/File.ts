import { BaseModel } from './BaseModel'
export default class File extends BaseModel {
  static entity = 'file'

  static fields() {
    return {
      _id: this.increment(),
      uuid: this.string('a32c4aec-54de-4ff4-b165-8571ae805598'),
      fileName: this.string('1.jpg'),
      fileType: this.boolean(false),
      path: this.string('public/bg/1.jpg'),
      fullPath: this.string('/User/linuxing3/workspace/awesome-manager/public/bg/1.jpg'),
      ext: this.string('jpg'),
      dir: this.string('public'),
      ctime: this.string('2018-04-08T09:15:19.307Z'),
      size: this.string(12292)
    }
  }
}
