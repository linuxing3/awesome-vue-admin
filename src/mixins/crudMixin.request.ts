/**
 * CRUD MIXINS
 *
 * Used as a component scope mixin to inject functions
 * of create, update, read, delete
 * Several options to choose
 *
 */
import { ComponentOptions } from 'vue'
import { genTableHeaders } from '@/util/genFormData'
import { baseFilter } from '@/util'
import XingRequest from '@/util/request.vuex.orm'
import { rules } from '@/util/validate'

const axios = new XingRequest()

interface ICrudHelper {
  modelName: string
  editedItem: any
  editedIndex: number
  model?: any
  defaultItem: any
  filter?: {
    search: string
    sort: string
  },
  rules?: any
}

const CrudMixin: ComponentOptions<any> = {
  data (): ICrudHelper {
    return {
      modelName: '',
      editedItem: {}, // currently item to be edited
      editedIndex: -1, // when -1, create, else update or delete
      model: null,
      defaultItem: {},
      filter: {
        search: '',
        sort: '_id'
      },
      rules
    }
  },
  computed: {
    formTitle (): string {
      return this.editedIndex === -1 ? '添加' : '编辑'
    },
    editing (): boolean {
      return this.editedIndex !== -1 // is in edit state
    },
    items (): any[] {
      let { filter: { search, sort } } = this
      let data = this.model.query().all()
      if (search === '') return data
      return baseFilter({ sort, search }, data)
    },
    headers (): any[] {
      return genTableHeaders(this.fields)
    },
    count (): number {
      return this.items ? this.items.length : 0
    }
  },
  watch: {
    // watch modelName for refetch and update
    async modelName (val) {
      await this.fetch()
    },
    editedIndex (val) {
      console.log(`Editing item ${val}`)
    }
  },
  async mounted () {
    this.setEditedItem()
    await this.fetch()
  },
  created () {
    // 组件自身监听事件，更新[编辑]和[数据模型]的状态
    this.$on('SET_EDITING', function (item: object) {
      this.setEditedItem(item)
    })
  },
  methods: {
    async fetch () {
      const {
        result: { fields, model }
      } = await axios.request(`get /${this.modelName}`)
      this.fields = fields
      this.model = model
      await this.model.$fetch()
    },
    async deleteItem (data: object) {
      this.setEditedItem(data)
      await axios.request(`delete /${this.modelName}`, data)
      await this.fetch()
    },
    async updateItem (data: object) {
      this.setEditedItem(data)
      await axios.request(`patch /${this.modelName}`, data)
      await this.fetch()
    },
    async createItem (data: object) {
      this.setEditedItem()
      await axios.request(`post /${this.modelName}`, data)
      await this.fetch()
    },
    async saveItem (data?: object) {
      if (this.editedIndex > -1) {
        await this.updateItem(data)
      } else {
        await this.createItem(data)
      }
    },
    setEditedItem (data) {
      if (data !== undefined) {
        this.editedItem = Object.assign({}, data)
        this.editedIndex = data._id
      } else {
        this.editedItem = {}
        this.editedIndex = -1
      }
    }
  }
}

export default CrudMixin
