import { camelCase, upperFirst, lowerFirst } from 'lodash'
import { BaseModel } from '@/models/BaseModel'

let requiredModels: RequireContext = require.context('.', true, /\.json$/)

let models = {}

requiredModels.keys().forEach(fileName => {
  const modelName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')))
  const entityName = lowerFirst(modelName)

  const fieldConfig = requiredModels(fileName)['fields']
  console.log(fieldConfig)

  class Model extends BaseModel {
    static entity = entityName
    static modelName = modelName
    static fieldConfig = fieldConfig || []

    static fields() {
      let fields = this.fieldConfig.reduce((fields, field) => {
        // TODO with pullAll
        fields['field_name'] = this.attr(field['label'])
        return fields
      }, {})

      return {
        _id: this.increment(),
        ...fields
      }
    }
  }

  models[modelName] = Model
})

export default models
