import {
  Model,
  Attr,
  String,
  Number,
  Boolean,
  BelongsTo,
  Increment,
  HasMany,
  HasOne,
  MorphOne,
  MorphMany,
  MorphTo,
  Attribute
} from '@vuex-orm/core'
import { keys, pullAll } from 'lodash'

export class BaseModel extends Model {
  static primaryKey = '_id'

  static fieldsKeys (): string[] {
    return keys(this.fields())
  }

  /**
   * 获取所有的关系型字段
   * @returns {Array<string>} all relations of the model
   */
  static relationFields (): string[] {
    return this.fieldsKeys().reduce((list: string[], field: string) => {
      let fieldAttribute: Attribute = this.fields()[field]
      if (this.isFieldRelation(fieldAttribute)) {
        list.push(`${field}_id`)
        list.push(field)
      }
      return list
    }, [])
  }

  /**
   * 非关系型字段，同isFieldAttribute
   * @returns {Array<string>} fields which value are not BelongsTo
   */
  static nonRelationFields (): string[] {
    return pullAll(this.fieldsKeys(), this.relationFields())
  }

  /**
   * 关系型数据键值中包括_id的
   */

  static relationFieldsWithId (): string[] {
    return this.relationFields().filter(r => r.match(/.*_id/))
  }
  // 关系型数据键值中不包括_id的
  static nonRelationFieldsNoId (): string[] {
    return this.relationFields().filter(r => !r.match(/.*_id/))
  }

  static count (): number {
    return this.query().count()
  }

  /**
   * 判断某一字段是否为数字型
   *
   * @param {Attribute | undefined} field
   * @returns {boolean}
   */
  static isFieldNumber (field: Attribute): boolean {
    if (!field) return false
    return field instanceof Number || field instanceof Increment
  }

  /**
   * 判断某一字段是否为属性型(即不属于关系型)
   * @param {Attribute} field
   * @returns {boolean}
   */
  static isFieldAttribute (field: Attribute): boolean {
    return (
      field instanceof Increment ||
      field instanceof Attr ||
      field instanceof String ||
      field instanceof Number ||
      field instanceof Boolean
    )
  }
  /**
   * 判断某一字段是否为关系
   * @param {Attribute} field
   * @returns {boolean}
   */
  static isFieldRelation (field: Attribute): boolean {
    return (
      field instanceof BelongsTo ||
      field instanceof HasOne ||
      field instanceof HasMany ||
      field instanceof MorphTo ||
      field instanceof MorphOne ||
      field instanceof MorphMany
    )
  }
}
