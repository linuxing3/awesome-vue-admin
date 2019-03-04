import { camelCase, toLower, upperFirst } from 'lodash'
import { BaseModel } from '@/models/BaseModel'

let requiredModels: RequireContext = require.context('.', true, /\.json$/)

let models = {}

requiredModels.keys().forEach(key => {
  let modelName = upperFirst(key.replace(/(\.\/|\.json)/g, ''))
  let entityName = toLower(modelName)

  let fieldConfig = requiredModels(key).fields

  class Model extends BaseModel {
    static entity = entityName

    static modelName = modelName

    static fields () {
      let fields = fieldConfig.reduce((fields, field) => {
        // TODO with pullAll
        fields['field_name'] = this.attr(field[field_text])
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
