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
      let data = this.model.query().all() || []
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
    },
    async deleteItem (data: object) {
      await axios.request(`delete /${this.modelName}`, data)
    },
    async updateItem (data: object) {
      await axios.request(`patch /${this.modelName}`, data)
    },
    async createItem (data: object) {
      await axios.request(`post /${this.modelName}`, data)
    },
    async saveItem (data: object) {
      this.setEditedItem(data)
      if (this.editedIndex > -1) {
        await this.updateItem(this.editedItem)
      } else {
        await this.createItem(this.editedItem)
      }
    },
    setEditedItem (data) {
      this.editedIndex = data._id || -1
      this.editedItem = Object.assign({}, data)
    }
  }
}

export default CrudMixin
