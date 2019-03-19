import { uniq, mapKeys, keys } from 'lodash'
/**
 * 使用一个模型的字段作为另一个模型特定字段的查阅向导，进行相关计数统计
 * @param models         [object] 定义了模型集合
 * @param fieldsDefModel [string] 定义了查询字段的关系模型
 * @param queryModel     [string] 将查询的模型
 * @param queryFieldName [string] 将查询的字段
 * @returns [object] 包含名称和统计量的对象, { type1: 10, type2: 10 }
 */
export const modelStatistic = (
  {
    models,
    fieldsDefModel,
    fieldDef,
    queryModel,
    queryFieldName
  }) => {
  let fields: string[] = uniq(findValuesOfField(models[fieldsDefModel], fieldDef))

  return fields.reduce(function (dataSet, fieldName) {
    let fieldCount = models[queryModel]
      .query()
      .where(queryFieldName, fieldName)
      .count()
    dataSet[fieldName] = fieldCount
    return dataSet
  }, {})
}

/**
 * 获取某模型中某一字段的全部值组成的数组
 * @param Model 模型
 * @param fieldDef 字段名
 * @returns 某一字段的全部值组成的数组
 */
export const findValuesOfField = (Model, fieldDef) => {
  let records = Model.query().get()
  return records.reduce(function (fields, item) {
    fields.push(item[fieldDef])
    return fields
  }, [])
}

/**
 * 使用lodash获取某模型中某一字段的全部值组成的数组
 * @param Model 模型
 * @param fieldDef 字段名
 * @returns 某一字段的全部值组成的数组
 */
export const _findValuesOfField = (Model, fieldDef) => {
  let records = Model.query().get()
  return (uniq(keys(mapKeys(records, o => o[fieldDef]))))
}
