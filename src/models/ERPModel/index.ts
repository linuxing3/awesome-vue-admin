import { camelCase, upperFirst, lowerFirst, tail, first, last, nth, pick } from 'lodash'
import { BaseModel } from '@/models/BaseModel'
import { LocaleMessages } from 'vue-i18n'
import { pathExistsSync, mkdirpSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'

const ERPModels: RequireContext = require.context('.', true, /\.json$/)

function pickFields (fieldConfig = []): any[] {
  return fieldConfig.reduce((result, field) => {
    let newField = pick(field, ['fieldname', 'fieldtype', 'label', 'options'])
    result.push(newField)
    return result
  }, [])
}

/**
 * 将ERPModels的fields内容重新组合，只取必要字段
 */
export function genModelConfigJson () {
  const rootDir = 'G:\\workspace\\awesome-vue-admin\\src\\models\\TestModels'

  ERPModels.keys().forEach((fileName: string) => {
    const fileNameMeta = tail(fileName.split('/'))
    const sectionMeta = {
      section: first(fileNameMeta),
      modelName: nth(fileNameMeta, -2),
      fileName: last(fileNameMeta),
      fullPath: fileName
    }

    const fieldConfig: any[] = ERPModels(fileName)['fields']
    const newFieldConfig = pickFields(fieldConfig)

    // write to file
    try {
      let newFolderName = resolve(rootDir, sectionMeta.section, sectionMeta.modelName)
      let newFileName = resolve(newFolderName, sectionMeta.fileName)

      if (!pathExistsSync(newFolderName)) mkdirpSync(newFolderName)

      writeFileSync(newFileName, JSON.stringify({ fields: newFieldConfig }))

      console.log(`${fileName} created`)
    } catch (err) {
      console.log(err)
    }
  })
}

/**
 * 使用新的Fields自动生成Model
 */
export function createModels () {
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
          let fields = fieldConfig.reduce((fields, field) => {
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

// genModelConfigJson()

const models = createModels()
export default models
