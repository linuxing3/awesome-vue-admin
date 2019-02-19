import { keyBy } from 'lodash'
import { Model } from '@vuex-orm/core'
import models from '@/models'

export default {
  data () {
    return {
      editing: false,
      model: {},
      modelName: ''
    }
  },
  computed: {
    // 数据对象的定义模型
    Model (): Model {
      return models[this.modelName]
    },
    // 数据对象的实例数组
    items (): any[] {
      return this.Model.query().get()
    },
    // 数据对象的实例数组，包含有关系的其他数据
    all (): any[] {
      return this.Model.query()
        .withAll()
        .get()
    },
    // 数据键值的数组
    fields (): string[] {
      return this.Model.fieldsKeys()
    },
    // 数据键值的数组，可用于表格标题行
    headers (): string[] {
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
    }
  },
  async mounted () {
    this.reset()
    await this.fetch()
  },
  created () {
    // 组件自身监听事件，更新[编辑]和[数据模型]的状态
    this.$on('SET_EDITING', function (item: object) {
      this.setEditing(item)
    })
  },
  methods: {
    /**
     * 通过ORM插件，获取lowdb数据到组件
     * 如果配合exportMixin混入中定义EntityDb
     */
    async fetch () {
      if (this.Model.$fetch !== null) {
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
    reset () {
      this.editing = false
      this.model = new this.Model()
    },
    /**
     * 设置[编辑]为真，[数据模型]为传入项目
     */
    setEditing (item: object) {
      this.editing = true
      this.model = item || {}
    },
    /**
     * 删除
     * @param {object} item 要删除的项目
     */
    deleteItem (item: object) {
      // 在组件中创建这一方法，设置[编辑]为真，[数据模型]为传入项目
      this.setEditing(item)
      // ORM插件方法
      this.Model.$delete(this.model)
      // ORM默认方法
      // this.Model.delete(this.model._id);
      this.reset()
    },
    /**
     * 保存，通过创建或更新(InsertOrUpdate)
     * @param {object} item 要删除的项目，包含id字段
     */
    saveItem (item: object) {
      if (this.editing) {
        this.updateItem(item)
      } else {
        this.createItem(item)
      }
    },
    /**
     * 更新
     * @param {object} item 要删除的项目，包含id字段
     */
    updateItem (item: object) {
      // 在组件中创建这一方法，设置[编辑]为真，[数据模型]为传入项目
      this.setEditing(item)
      this.Model.$update({
        data: this.model
      })
      // ORM默认方法
      // this.Model.update(this.model);
      this.reset()
    },
    /**
     * 创建
     * @param {object} item 要创建的项目数据，不包含id字段
     */
    createItem (item: any) {
      // 设置[编辑]为假，[数据模型]为传入项目
      if (!this.editing) this.editing = false
      this.model = item
      this.Model.$create({
        data: this.model
      })
      // ORM默认方法
      // this.Model.insert({
      //   data: this.model,
      // });
      this.reset()
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
