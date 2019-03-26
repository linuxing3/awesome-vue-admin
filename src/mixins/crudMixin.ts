/**
 * CRUD MIXINS
 *
 * Used as a component scope mixin to inject functions
 * of create, update, read, delete
 * Several options to choose
 *
 * 1. ORM localforage Methods
 *    All date will persist in Vuex and indexDB
 *    - Model.$insert()
 *    - Model.$create()
 *    - Model.$update()
 *    - Model.$delete()
 *    - Model.$fetch()
 *
 * 2. Model Static Methods
 *    All date will persist in Vuex but not in indexDB
 *
 *    - Model.insert()
 *    - Model.create()
 *    - Model.update()
 *    - Model.delete()
 *    - Model.find()
 *
 * 3. Model Instance Methods
 *    All date will persist in Vuex but not in indexDB
 *    - model.$insert()
 *    - model.$create()
 *    - model.$update()
 *    - model.$delete()
 *    - model.$find()
 *
 * 4. Query instance Methods
 *    All date will persist in Vuex but not in indexDB
 *    - query.insert()
 *    - query.create()
 *    - query.update()
 *    - query.delete()
 *    - query.find()
 */
import { keyBy } from 'lodash'
import { Model } from '@vuex-orm/core'
import models from '@/models'
import { baseFilter } from '@/util'
import { Location } from 'vue-router'
import { genTableHeaders } from '@/util/genFormData'

interface ICrudHelper {
  editedItem?: any
  editedIndex?: number
  selectedItems?: any
  filter?: {
    search: string
    sort: string
  }
}

export default {
  data (): ICrudHelper {
    return {
      editedItem: {}, // currently item to be edited
      editedIndex: -1, // when -1, create, else update or delete
      selectedItems: {},
      filter: {
        search: '',
        sort: '_id'
      }
    }
  },
  computed: {
    formTitle (): string {
      return this.editedIndex === -1 ? '添加' : '编辑'
    },
    editing (): boolean {
      return this.editedIndex !== -1 // is in edit state
    },
    // 数据对象的定义模型
    Model (): Model {
      return models[this.modelName]
    },
    defaultItem (): any {
      return new this.Model() // always a fresh new item
    },
    // 数据对象的实例数组，包含有关系的其他数据
    all (): any[] {
      return this.Model.query().get()
    },
    count (): any[] {
      return this.Model.query().count()
    },
    // 数据对象的实例数组，包含有关系的其他数据
    withAll (): any[] {
      return this.Model.query()
        .withAll()
        .get()
    },
    // 数据对象的实例数组
    items (): any[] {
      let { search, sort } = this.filter
      if (search === '') return this.withAll
      // in filtered case, may different from editedIndex
      return baseFilter({ sort, search }, this.withAll)
    },
    // 数据键值的数组
    fields (): string[] {
      return this.Model.fieldsKeys()
    },
    // 数据键值的数组，可用于表格标题行
    mainHeaders (): string[] {
      return this.headers.splice(2, 10)
    },
    headers (): any[] {
      return genTableHeaders(this.fields)
    },
    allHeaders (): string[] {
      return this.Model.fieldsKeys()
    },
    // 关系型数据键值的数组
    relationFields (): string[] {
      return this.Model.relationFields()
    },
    // 非关系型数据键值的数组
    nonRelationFields (): string[] {
      return this.Model.nonRelationFields()
    },
    // 关系型数据键值中包括_id的
    relationFieldsWithId (): string[] {
      return this.Model.relationFieldsWithId()
    },
    // 关系型数据键值中不包括_id的
    nonRelationFieldsNoId (): string[] {
      return this.Model.nonRelationFieldsNoId()
    },
    // The form or info page to edit
    editRoute (): Location {
      return {
        name: this.modelName + '_id',
        params: {
          type: 'edit',
          blueprint: this.modelName,
          editedItem: this.editedItem
        }
      }
    },
    // The form or add
    addRoute (): Location {
      return {
        name: this.modelName + '_id',
        params: {
          type: 'add',
          blueprint: this.modelName,
          editedItem: this.editedItem
        }
      }
    }
  },
  // watch modelName for refetch and update
  watch: {
    async modelName (val) {
      // refetch data for current model
      await this.fetch()
    },
    editedIndex (val) {
      console.log(`Editing item ${val}`)
    },
    $route: {
      handler: 'fetch',
      immediate: true
    }
  },
  async mounted () {
    this.reset()
    // For update, should call fetch again
    await this.fetch()
  },
  created () {
    // 组件自身监听事件，更新[编辑]和[数据模型]的状态
    this.$on('SET_EDITING', function (item: object) {
      this.setEditedItem(item)
    })
  },
  methods: {
    /**
     * 通过ORM插件，获取lowdb数据到组件
     * 如果配合exportMixin混入中定义EntityDb
     */
    async fetch () {
      // Clear Current State
      if (this.Model.$fetch !== undefined) {
        await this.Model.$fetch()
      } else {
        this.loadFromDb()
      }
    },
    /**
     * 如果存在db，直接从lowdb中获取数据
     */
    loadFromDb () {
      if (!this.entityDb) return
      let data = this.entityDb.all(this.modelName)
      if (Array.isArray(data)) {
        console.log(`有数据，开始导入...`)
        this.Model.commit(state => (state.data = keyBy(data, o => o['_id'])))
      } else {
        console.log(`无数据...`)
        this.Model.commit(state => (state.data = []))
      }
    },
    /**
     * 重置组件状态
     */
    initialize () {
      // If previous route want to edit
      if (this.$route.params.type === 'edit') {
        this.setEditedItem(this.$route.params.model)
      } else {
        this.editing = false
        this.editedItem = new this.Model()
      }
    },
    /**
     * 重置组件状态
     */
    reset () {
      // If previous route want to edit
      if (this.$route.params.type === 'edit') {
        this.setEditedItem(this.$route.params.editedItem)
      } else {
        this.editedIndex = -1
        this.editedItem = new this.Model()
      }
    },
    /**
     * 设置当前编辑项的索引和数据备用
     * @param item
     */
    setEditedItem (item) {
      this.editedItem = Object.assign({}, item) // Deep copy
      this.editedIndex = this.editedItem._id
    },

    /**
     * 删除
     * @param {object} item 要删除的项目
     */
    deleteItem (item: object) {
      // 在组件中创建这一方法，设置[编辑]为真，[数据模型]为传入项目
      this.setEditedItem(item)
      // ORM Localforage插件方法
      if (this.editedIndex > -1) {
        this.Model.$delete(this.editedItem._id).then(entities => {
          console.log(entities)
        })
      } else {
        console.log('Found no item to delete!')
      }
      this.reset()
    },
    /**
     * 保存，通过创建或更新(InsertOrUpdate)
     * should call after setEditedItem is called and editedIndex is set
     * @param {object} item 要删除的项目，包含id字段
     */
    saveItem (item: object) {
      if (this.editedIndex > -1) {
        this.updateItem(item)
      } else {
        this.createItem(item)
      }
      this.editedIndex = -1
      this.editedItem = new this.Model()
    },
    /**
     * 更新
     * @param {object} item 要删除的项目，包含id字段
     */
    updateItem () {
      // 在组件中创建这一方法，设置[编辑]为真，[数据模型]为传入项目
      this.Model.$update({
        data: this.editedItem
      }).then(entities => {
        console.log(entities)
      })
    },
    /**
     * 创建
     * @param {object} item 要创建的项目数据，不包含id字段
     */
    createItem () {
      // 设置[编辑]为假，[数据模型]为传入项目
      this.Model.$create({
        data: this.editedItem
      }).then(entities => {
        console.log(entities)
      })
    },
    /**
     * 尝试进行国际化翻译
     * @param text 需要翻译的文字
     */
    tryT (text: string) {
      if (this.$t !== undefined) {
        return this.$t(text)
      } else {
        return text
      }
    }
  }
}
