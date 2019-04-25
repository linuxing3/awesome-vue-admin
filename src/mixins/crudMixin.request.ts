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
import { request } from '@/util/request'

interface ICrudHelper {
  modelName: string
  editedItem: any
  editedIndex: number
  items?: [],
  defaultItem: any
}

const CrudMixin: ComponentOptions<any> = {
  data (): ICrudHelper {
    return {
      modelName: '',
      editedItem: {}, // currently item to be edited
      editedIndex: -1, // when -1, create, else update or delete
      items: [],
      defaultItem: {}
    }
  },
  computed: {
    formTitle (): string {
      return this.editedIndex === -1 ? '添加' : '编辑'
    },
    editing (): boolean {
      return this.editedIndex !== -1 // is in edit state
    },
    fields (): string[] {
      return Object.keys(this.defaultItem)
    },
    headers (): any[] {
      return genTableHeaders(this.fields)
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
    this.reset()
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
      this.items = await request(`get /${this.modelName}`)
    },
    async deleteItem (data: object) {
      this.setEditedItem(data)
      await request(`delete /${this.modelName}`, data)
      await this.fetch()
    },
    async updateItem (data: object) {
      await request(`patch /${this.modelName}`, data)
      await this.fetch()
    },
    async createItem (data: object) {
      await request(`post /${this.modelName}`, data)
      await this.fetch()
    },
    async saveItem (data?: object) {
      if (this.editedIndex > -1) {
        await this.updateItem(data)
      } else {
        await this.createItem(data)
      }
      this.setDefaultItem()
    },
    setDefaultItem () {
      this.editedItem = {}
      this.editedIndex = -1
    },
    setEditedItem (data) {
      this.editedItem = Object.assign({}, data) // Deep copy
      this.editedIndex = this.editedItem._id
    },
    reset () {
      // If previous route want to edit
      if (this.$route.params.type === 'edit') {
        this.setEditedItem(this.$route.params.editedItem)
      } else {
        this.setDefaultItem()
      }
    }
  }
}

export default CrudMixin
