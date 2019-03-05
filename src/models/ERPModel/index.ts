import { camelCase, upperFirst, lowerFirst } from 'lodash'
import { BaseModel } from '@/models/BaseModel'

/**
 * Using json as model
 */
let erpModels: RequireContext = require.context('.', true, /\.json$/)
let models = {}

erpModels.keys().forEach(fileName => {
  const modelName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')))
  const entityName = lowerFirst(modelName)
  const fieldConfig = erpModels(fileName)['fields']
  if (fieldConfig !== undefined) {
    class ERPModel extends BaseModel {
      static entity = entityName
      static modelName = modelName
      static fieldConfig = fieldConfig || []
      static fields () {
        let fields = this.fieldConfig.reduce((fields, field) => {
          // TODO with pullAll
          fields[field['fieldname']] = this.attr(field['label'])
          return fields
        }, {})
        return {
          _id: this.increment(),
          ...fields
        }
      }
    }
    models[entityName] = ERPModel
  }
})

export default models
