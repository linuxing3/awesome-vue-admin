import { BaseModel } from '../../BaseModel'
export default class File extends BaseModel {
  static entity = 'file'

  static fields () {
    return {
      _id: this.increment(),
      fileName: this.string('1.jpg'),
      fileType: this.boolean(false),
      path: this.string('public/bg/1.jpg'),
      fullPath: this.string(''),
      ext: this.string('jpg'),
      dir: this.string('public'),
      ctime: this.string('2018-04-08'),
      size: this.string(12292)
    }
  }
}
