import { pickBy, mapKeys } from 'lodash'
import models from '../models'

export const entities = Object.keys(models)

export const sections = [
  'core',
  'hr',
  'accounts',
  'assets',
  'buying',
  'education',
  'healthcare',
  'maintenance',
  'projects',
  'quality_management',
  'selling',
  'shopping_cart',
  'stock'
]

export const genERPModels = (models, section) => {
  return pickBy(models, model => {
    return model.meta.section === section
  })
}

export const genCoreModels = (models) => {
  return pickBy(models, model => {
    return model.meta.section === 'core'
  })
}

export const coreModels = genCoreModels(models)
export const hrModels = genERPModels(models, 'hr')
export const projectModels = genERPModels(models, 'projects')
export const assetModels = genERPModels(models, 'assets')
export const accountModels = genERPModels(models, 'accounts')
export const educationModels = genERPModels(models, 'education')
export const healthcareModels = genERPModels(models, 'healthcare')
export const stockModels = genERPModels(models, 'stock')
