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

export const infrastructure = {
  name: 've',
  models: [
    {
      name: 'Account',
      section: 'Account',
      modelName: 'Account'
    },
    {
      name: 'Asset',
      section: 'Asset',
      modelName: 'Asset'
    },
    {
      name: 'AssetMaintenance',
      section: 'Asset',
      modelName: 'AssetMaintenance'
    },
    {
      name: 'AssetMovement',
      section: 'Asset',
      modelName: 'AssetMovement'
    },
    {
      name: 'AssetUser',
      section: 'Asset',
      modelName: 'AssetUser'
    },
    {
      name: 'Department',
      section: 'Department',
      modelName: 'Department'
    },
    {
      name: 'Document',
      section: 'Document',
      modelName: 'Document'
    },
    {
      name: 'DocumentType',
      section: 'Document',
      modelName: 'DocumentType'
    },
    {
      name: 'Bookmark',
      section: 'Document',
      modelName: 'Bookmark'
    },
    {
      name: 'File',
      section: 'Document',
      modelName: 'File'
    },
    {
      name: 'Employee',
      section: 'Employee',
      modelName: 'Employee'
    },
    {
      name: 'EmployeePromotion',
      section: 'Employee',
      modelName: 'EmployeePromotion'
    },
    {
      name: 'User',
      section: 'User',
      modelName: 'User'
    },
    {
      name: 'UserAppraisal',
      section: 'User',
      modelName: 'UserAppraisal'
    },
    {
      name: 'UserAppraisalGoal',
      section: 'User',
      modelName: 'UserAppraisalGoal'
    },
    {
      name: 'UserDesignation',
      section: 'User',
      modelName: 'UserDesignation'
    },
    {
      name: 'UserMilitant',
      section: 'User',
      modelName: 'UserMilitant'
    },
    {
      name: 'UserPromotion',
      section: 'User',
      modelName: 'UserPromotion'
    },
    {
      name: 'Project',
      section: 'Project',
      modelName: 'Project'
    },
    {
      name: 'ProjectTask',
      section: 'Project',
      modelName: 'ProjectTask'
    }
  ]
}

export const genERPModels = (models, section) => {
  return pickBy(models, model => {
    return model.meta.section === section
  })
}

export const genCoreModels = models => {
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

export const publicAssets = {
  backgrounds: [
    { src: 'bg/1.jpg' },
    { src: 'bg/2.jpg' },
    { src: 'bg/3.jpg' },
    { src: 'bg/4.jpg' },
    { src: 'bg/5.jpg' },
    { src: 'bg/6.jpg' },
    { src: 'bg/7.jpg' }
  ],
  avatars: [
    { src: 'avatar/man_1.jpg' },
    { src: 'avatar/man_2.jpg' },
    { src: 'avatar/man_3.jpg' },
    { src: 'avatar/man_5.jpg' },
    { src: 'avatar/a1.jpg' },
    { src: 'avatar/a2.jpg' },
    { src: 'avatar/a3.jpg' },
    { src: 'avatar/a4.jpg' }
  ],
  nature: [
    { src: 'nature/n1.jpeg' },
    { src: 'nature/n2.jpeg' },
    { src: 'nature/n3.jpeg' },
    { src: 'nature/n4.jpeg' },
    { src: 'nature/n5.jpeg' },
    { src: 'nature/n6.jpeg' },
    { src: 'nature/n7.jpeg' },
    { src: 'nature/n8.jpg' }
  ]
}

export const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]

export const bookmarks = [
  {
    title: 'feedly',
    url: 'https://feedly.com/i/category/Venezuela',
    description: '',
    tags: '',
    date: ''
  },
  {
    title: 'El universal',
    url: 'https://eluniversal.com',
    description: '',
    tags: '',
    date: ''
  },
  {
    title: 'El national',
    url: 'https://el-nacional.com',
    description: '',
    tags: '',
    date: ''
  }
]

export const searchEngine = [
  {
    name: 'wikipedia',
    endPoint: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search='
  },
  {
    name: 'wikipedia',
    endPoint: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search='
  }
]
