import { camelCase, upperFirst, lowerFirst, tail, first, last, nth } from 'lodash'
import { BaseModel } from '@/models/BaseModel'
import { LocaleMessages } from 'vue-i18n'

/**
 * Using json as model
 */
export function createModels () {
  const ERPModels: RequireContext = require.context('.', true, /\.json$/)
  let models = {}

  ERPModels.keys().forEach((fileName: string) => {
    const fileNameMeta = tail(fileName.split('/'))

    const modelName = upperFirst(camelCase(last(fileNameMeta).replace(/\.json/g, '')))
    const entityName = lowerFirst(modelName)

    const groups = {
      section: first(fileNameMeta),
      modelName: nth(fileNameMeta, -2),
      fileName: last(fileNameMeta),
      fullPath: fileName
    }

    const fieldConfig = ERPModels(fileName)['fields']
    if (fieldConfig !== undefined) {
      // Creating ORM Models
      class ERPModel extends BaseModel {
        static entity = entityName
        static modelName = modelName
        static fieldConfig = fieldConfig || []

        static meta = {
          icon: 'edit',
          size: 36,
          color: 'success',
          groups
        }

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
    const fieldConfig = ERPModels(fileName)['fields']

    if (fieldConfig !== undefined) {
      ERPMessages = fieldConfig.reduce((messages, field) => {
        let label = field['label']
        let fieldName = field['fieldname']
        let fieldNameCn = field['fieldname_cn']
        messages['cn'][fieldName] = fieldNameCn || label
        return messages
      }, { cn: {} })
    }
  })
  return ERPMessages
}

export const ERPMessages = createMessages()

const models = createModels()
export default models
