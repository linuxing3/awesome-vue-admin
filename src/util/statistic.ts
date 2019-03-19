import { uniq } from 'lodash'
import { BaseModel } from '@/models/BaseModel'
/**
 * 使用一个模型的字段作为另一个模型特定字段的查阅向导，进行相关计数统计
 * @param models         定义了模型集合
 * @param fieldsDefModel 定义了查询字段的关系模型
 * @param queryModel     将查询的模型
 * @param queryFieldName 将查询的字段
 */
export const modelStatistic =  (
  {
    models,
    fieldsDefModel,
    fieldDef,
    queryModel,
    queryFieldName
  }) => {
  let fields: string[] = uniq(findValuesOfField(models[fieldsDefModel], fieldDef))

  return fields.reduce(function(dataSet, fieldName) {
    let fieldCount = models[queryModel]
      .query()
      .where(queryFieldName, fieldName)
      .count()
    dataSet[fieldName] = fieldCount
    return dataSet
  }, {})
}

export const findValuesOfField =  (Model, fieldDef) => {
  return Model
    .query()
    .get()
    .reduce(function(fields, item){
      fields.push(item[fieldDef])
      return fields
    }, [])
}
