import { uniq, mapKeys, keys } from 'lodash'

interface IGenericField {
  [ key: string ]: string | boolean | any
}
interface IStatisticDataSet {
  [ key: string ]: number | string
}

interface IStatisticQuery {
  fields?: string[]
  models: any
  lookupModelName: string
  lookupFieldName: string
  queryModelName?: string
  queryFieldName?: string
}

/**
 * 使用一个模型的字段作为另一个模型特定字段的查阅向导，进行相关计数统计
 * @param fields?         [Array] 定义了查询字段数组
 * @param models         [object] 定义了模型集合
 * @param lookupModelName [string] 定义了查询字段的关系模型
 * @param lookupFieldName [string] 定义了查询字段的关系模型
 * @param queryModel     [string] 将查询的模型
 * @param queryFieldName [string] 将查询的字段
 * @returns [object] 包含名称和统计量的对象, { type1: 10, type2: 10 }
 */
export const modelStatistic = ({
  fields,
  models,
  lookupModelName,
  lookupFieldName,
  queryModelName,
  queryFieldName
}: IStatisticQuery) => {
  let lookupFields: string[] = []
  if (fields) {
    lookupFields = fields
  } else {
    lookupFields = validLookupFields({
      models,
      lookupModelName,
      lookupFieldName
    })
  }

  try {
    return lookupFields.reduce(function(dataSet, fieldName) {
      let fieldCount = models[queryModelName]
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

export const validLookupFields = ({
  models,
  lookupModelName,
  lookupFieldName,
}: IStatisticQuery) => {
  let lookupFields: string[] = []
  // get fields from lookup model if fields is undefined
  if (lookupModelName !== '' && lookupFieldName !== '') {
    console.info('Trying with lookup Model to get fields')
    // helper function
    lookupFields = findUniqueValuesOfField(models[lookupModelName], lookupFieldName)
    // static methods
    // lookupFields = models[lookupModelName].findUniqueValuesOfField( lookupFieldName)
  } else {
    console.info('Trying with predefined fields')
    lookupFields = []
  }
  return lookupFields
}

/**
 * 获取某模型中某一字段的全部值组成的数组
 * @param Model 模型
 * @param lookupFieldName 字段名
 * @returns 某一字段的全部值组成的数组
 */
export const findUniqueValuesOfField = (Model, lookupFieldName: string) => {
  let records = Model.query().get()
  let fields: string[] = records.reduce(function(fields: any[], record: IGenericField) {
    fields.push(record[lookupFieldName])
    return fields
  }, [])
  return uniq(fields)
}

/**
 * 使用lodash获取某模型中某一字段的全部值组成的数组
 * @param Model 模型
 * @param lookupFieldName 字段名
 * @returns 某一字段的全部值组成的数组
 */
export const _findValuesOfField = (Model, fieldName: string) => {
  let records: any[] = Model.query().get()
  return (uniq(keys(mapKeys(records, o => o[fieldName]))))
}
