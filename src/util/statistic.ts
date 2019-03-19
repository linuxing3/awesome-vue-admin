import { uniq, mapKeys, keys } from 'lodash'

interface IGenericField {
  [ key: string ]: string | boolean | any
}
interface IStatisticDataSet {
  [ key: string ]: number | string
}

interface IStatisticQuery {
  fields: string[]
  models: any
  fieldsDefModel: string
  fieldDef: string
  queryModel: string
  queryFieldName: string
}

/**
 * 使用一个模型的字段作为另一个模型特定字段的查阅向导，进行相关计数统计
 * @param fields         [Array] 定义了查询字段数组
 * @param models         [object] 定义了模型集合
 * @param fieldsDefModel [string] 定义了查询字段的关系模型
 * @param fieldsDef      [string] 定义了查询字段的关系模型
 * @param queryModel     [string] 将查询的模型
 * @param queryFieldName [string] 将查询的字段
 * @returns [object] 包含名称和统计量的对象, { type1: 10, type2: 10 }
 */
export const modelStatistic = ({
  fields,
  models,
  fieldsDefModel,
  fieldDef,
  queryModel,
  queryFieldName
}: IStatisticQuery) => {
  let lookupFields: string[] = []
  // get fields from lookup model if fields is undefined
  if (fields === undefined) {
    console.info('Fields is not defined, trying with lookup Model')
    lookupFields = findValuesOfField(models[fieldsDefModel], fieldDef)
  } else if (!Array.isArray(fields)) {
    console.info('Fields is not Array, convert to array')
    lookupFields = [ fields ]
  } else {
    lookupFields = fields
  }

  try {
    return lookupFields.reduce(function(dataSet, fieldName) {
      let fieldCount = models[queryModel]
        .query()
        .where(queryFieldName, fieldName)
        .count()
      dataSet[fieldName] = fieldCount
      return dataSet
    }, {})
  } catch (error) {
    throw new Error(error)
  }

}

/**
 * 获取某模型中某一字段的全部值组成的数组
 * @param Model 模型
 * @param fieldDef 字段名
 * @returns 某一字段的全部值组成的数组
 */
export const findValuesOfField = (Model, fieldDef: string) => {
  let records = Model.query().get()
  let fields: string[] = records.reduce(function(fields: any[], item: IGenericField) {
    fields.push(item[fieldDef])
    return fields
  }, [])
  return uniq(fields)
}

/**
 * 使用lodash获取某模型中某一字段的全部值组成的数组
 * @param Model 模型
 * @param fieldDef 字段名
 * @returns 某一字段的全部值组成的数组
 */
export const _findValuesOfField = (Model, fieldDef: string) => {
  let records: any[] = Model.query().get()
  return (uniq(keys(mapKeys(records, o => o[fieldDef]))))
}
