import { camelCase, upperFirst, lowerFirst, tail, first, last, nth } from 'lodash'
import { BaseModel } from '@/models/BaseModel'
import { LocaleMessages } from 'vue-i18n'
import { writeFileSync, fstat } from 'fs'
import { resolve } from 'path'
import { remove, pick } from 'lodash'

export function genModelConfigJson ({
  baseUrl = '.',
  recursive = false
}) {
  const ERPModels: RequireContext = require.context(baseUrl, recursive, /\.json$/)
  const rootDir = 'G:\\workspace\\awesome-vue-admin\\src\\models\\ERPModels'

  ERPModels.keys().forEach((fileName: string) => {
    const fileNameMeta = tail(fileName.split('/'))
    const sectionMeta = {
      section: first(fileNameMeta),
      modelName: nth(fileNameMeta, -2),
      fileName: last(fileNameMeta),
      fullPath: fileName
    }

    const fieldConfig = ERPModels(fileName)['fields']
    const newFieldConfig = pick(remove(fieldConfig, (field) => {
      return field['fieldtype'].match(/.*(Break)$/)
    }), ['fieldname', 'fieldtype', 'label', 'options'])

    // write to file
    try {
      let newFileName = resolve(rootDir, sectionMeta.section, sectionMeta.modelName, sectionMeta.fileName)
      writeFileSync(newFileName, { fields: newFieldConfig })
      console.log(`${fileName} created`)
    } catch(err) {
      console.log(err)
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
