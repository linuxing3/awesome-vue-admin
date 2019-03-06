import { camelCase, upperFirst, lowerFirst, tail, first, last, nth } from 'lodash'
import { BaseModel } from '@/models/BaseModel'
import { LocaleMessages } from 'vue-i18n'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { pullAll } from 'lodash'

export function genModelConfigJson ({
  baseUrl = '.',
  recursive = false
}) {
  const ERPModels: RequireContext = require.context(baseUrl, recursive, /\.json$/)
  const rootDir = 'G:\\workspace\\awesome-vue-admin\\src\\models\\ERPModels'

  ERPModels.keys().forEach((fileName: string) => {
    const fileNameMeta = tail(fileName.split('/'))

    const fieldConfig = ERPModels(fileName)['fields']
    let fields = this.fieldConfig.reduce((fields, field) => {
      let newFieldConfig = pullAll([ 'fieldname', 'fieldtype', 'label', 'options' ], field)
      fields['fields'] = newFieldConfig
      return fields
    }, {})
    // write to file
    if (fileName.match(/.*\.(json)$/)) {
      console.log(`${fileName} deleted`)
    } else {
      console.log('not deleted')
    }
  })
}

/**
 * Using json as model
 */
export function createModels ({
  baseUrl = '.',
  recursive = false
}) {
  const ERPModels: RequireContext = require.context(baseUrl, recursive, /\.json$/)
  let models = {}

  ERPModels.keys().forEach((fileName: string) => {
    const fileNameMeta = tail(fileName.split('/'))

    const modelName = upperFirst(camelCase(last(fileNameMeta).replace(/\.json/g, '')))
    const entityName = lowerFirst(modelName)

    const sectionMeta = {
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
          ...sectionMeta
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

const models = createModels({
  baseUrl: './hr',
  recursive: true
})
export default models
