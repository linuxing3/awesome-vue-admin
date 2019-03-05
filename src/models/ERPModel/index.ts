import { camelCase, upperFirst, lowerFirst } from 'lodash'
import { BaseModel } from '@/models/BaseModel'
import { LocaleMessages } from 'vue-i18n'

/**
 * Using json as model
 */
export function createModels () {
  const ERPModels: RequireContext = require.context('.', true, /\.json$/)
  let models = {}

  ERPModels.keys().forEach((fileName: string) => {
    fileName = fileName.split('/').reverse()[0]
    const modelName = upperFirst(camelCase(fileName.replace(/\.json/g, '')))
    const entityName = lowerFirst(modelName)
    const fieldConfig = ERPModels(fileName)['fields']

    if (fieldConfig !== undefined) {
      // Creating ORM Models
      class ERPModel extends BaseModel {
        static entity = entityName
        static modelName = modelName
        static fieldConfig = fieldConfig || []
        static fields () {
          let fields = this.fieldConfig.reduce((fields, field) => {
            let label = field['label']
            let fieldname = field['fieldname']
            fields[fieldname] = this.attr(label)
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
  return models
}

/**
 * Using json as i18n messages
 */
export function createMessages () {
  const ERPModels: RequireContext = require.context('.', true, /\.json$/)
  let ERPMessages: LocaleMessages = {}

  ERPModels.keys().forEach((fileName: string) => {
    fileName = fileName.split('/').reverse()[0]
    const fieldConfig = ERPModels(fileName)['fields']

    if (fieldConfig !== undefined) {
      ERPMessages = fieldConfig.reduce((messages, field) => {
        let label = field['label']
        let fieldName = field['fieldname']
        let fieldNameCn = field['fieldname_cn']
        messages['cn'][fieldName] = fieldNameCn || label
        return messages
      }, {})
    }
  })
  return ERPMessages
}

export const ERPMessages = createMessages()

const models = createModels()
export default models
