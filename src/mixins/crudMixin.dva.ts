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
import { ComponentOptions } from 'vue'

interface ICrudHelper {
  modelName?: string
  editedItem?: any
  editedIndex?: number
  selectedItems?: any
  filter?: {
    search: string
    sort: string
  },
  rules?: any
}

const CrudMixin: ComponentOptions<any> = {
  data (): ICrudHelper {
    return {
      editedItem: {}, // currently item to be edited
      editedIndex: -1, // when -1, create, else update or delete
      selectedItems: {},
      filter: {
        search: '',
        sort: '_id'
      },
      rules: {
        nameRules: [
          v => !!v || 'Required',
          v => v.length <= 25 || 'Must be less than 25 characters'
        ],
        textRules: [
          v => v.length <= 50 || 'Must be less than 50 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
      }
    }
  },
  computed: {
    editing (): boolean {
      return this.editedIndex !== -1 // is in edit state
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
    }
  },
  async mounted () {
    await this.resetEditedItem()
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
     * 通过ORM插件，获取数据到组件
     */
    async * fetch ({ payload }, { call }) {
      // Clear Current State
      const data = yield call('', payload)
      this.$store.dispatch('', payload)
    },
    /**
     * 重置组件状态
     */
    async resetEditedItem () {
      this.editedIndex = -1
      this.editedItem = new this.Model()
    },
    /**
     * 设置当前编辑项的索引和数据备用
     * @param item
     */
    async setEditedItem (item) {
      this.editedItem = Object.assign({}, item) // Deep copy
      this.editedIndex = this.editedItem._id
    },

    /**
     * 删除
     */
    async deleteItem () {

    },
    /**
     * 保存，通过创建或更新(InsertOrUpdate)
     */
    async saveItem () {
      if (this.editedIndex > -1) {
        this.updateItem()
      } else {
        this.createItem()
      }
      this.editedIndex = -1
      this.editedItem = new this.Model()
    },
    /**
     * 更新
     */

    async updateItem () {
      // 在组件中创建这一方法，设置[编辑]为真，[数据模型]为传入项目

    },
    /**
     * 创建
     */
    async createItem () {
      // 设置[编辑]为假，[数据模型]为传入项目

    }
  }
}

export default CrudMixin
