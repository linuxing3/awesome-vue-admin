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
import lfService from '@/util/request.localforage'
import { rules } from '@/util/validate'

interface ICrudHelper {
  modelName: string
  editedItem: any
  editedIndex: number
  fields: string[]
  pagination: any
  model?: any
  defaultItem: any
  filter?: {
    search: string
    sort: string
  }
  rules?: any
}

const CrudMixin: ComponentOptions<any> = {
  data(): ICrudHelper {
    return {
      modelName: 'user',
      editedItem: {}, // currently item to be edited
      editedIndex: -1, // when -1, create, else update or delete
      model: null,
      fields: [],
      defaultItem: {},
      filter: {
        search: '',
        sort: '_id'
      },
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      rules
    }
  },
  computed: {
    formTitle(): string {
      return this.editedIndex === -1 ? '添加' : '编辑'
    },
    editing(): boolean {
      return this.editedIndex !== -1 // is in edit state
    },
    items(): any[] {
      let {
        filter: { search, sort }
      } = this
      let data = this.model ? this.model.query().all() : []
      if (search === '') return data
      return baseFilter({ sort, search }, data)
    },
    headers(): any[] {
      if (this.fields) return genTableHeaders(this.fields)
      return []
    },
    count(): number {
      return this.items ? this.items.length : 0
    }
  },
  watch: {
    async modelName(val) {
      await this.fetch()
    },
    editedIndex(val) {
      console.log(`Editing item ${val}`)
    }
  },
  async beforeMount() {
    await this.fetch()
  },
  created() {
    this.$on('SET_EDITING', function(item: any) {
      this.setEditedItem(item)
    })
  },
  methods: {
    async fetch() {
      const { pagination } = this
      const {
        result: { fields, model }
      } = await lfService.request({
        url: `/${this.modelName}`,
        method: 'get',
        pagination
      })
      this.fields = fields
      this.model = model
      this.setEditedItem(new this.model())
    },
    async deleteItem(data: any) {
      await lfService.request({
        url: `/${this.modelName}`,
        method: 'delete',
        data
      })
    },
    async deleteAll(data: any[]) {
      data.map(async item => {
        await lfService.request({
          url: `/${this.modelName}`,
          method: 'delete',
          data: item
        })
      })
    },
    async updateItem(data: any) {
      await lfService.request({
        url: `/${this.modelName}`,
        method: 'delete',
        data
      })
    },
    async createItem(data: any) {
      console.log('Creating')
      await lfService.request({
        url: `/${this.modelName}`,
        method: 'delete',
        data
      })
    },
    async saveItem(data: any) {
      this.setEditedItem(data)
      if (this.editedIndex > -1) {
        await this.updateItem(this.editedItem)
      } else {
        await this.createItem(this.editedItem)
      }
    },
    setEditedItem(data) {
      this.editedIndex = data._id ? data._id : -1
      this.editedItem = Object.assign({}, data)
    },
    reset() {
      this.setEditedItem(new this.model())
    }
  }
}

export default CrudMixin
