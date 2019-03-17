import axios, { AxiosRequestConfig } from 'axios'
import { ipcRenderer } from 'electron'

export default {
  data () {
    return {
      adonisUrl: 'http://localhost:3333',
      editing: false,
      token: {},
      model: {},
      modelName: 'users',
      items: [],
      headers: [],
      loginData: {
        username: 'daniel',
        email: 'daniel@qq.com',
        password: '20090909'
      }
    }
  },
  computed: {
    // 数据对象的定义模型
    endpoint (): string {
      return `${this.adonisUrl}/${this.modelName}`
    },
    config (): AxiosRequestConfig {
      let { type, token } = this.token
      let authorizationCode = `${type} ${token}`
      return {
        headers: {
          Authorization: authorizationCode || ''
        }
      }
    }
  },
  async mounted () {
    // await this.checkAdonis();
    // await this.register();
    await this.login()
    await this.fetch()
  },
  created () {
    // 组件自身监听事件，更新[编辑]和[数据模型]的状态
    this.$on('SET_EDITING', function (item: object) {
      this.setEditing(item)
    })
    // electron
    ipcRenderer.on('adonis-response', data => {
      window.document.write(data)
    })
  },
  methods: {
    async checkAdonis () {
      let options = {
        method: 'GET',
        protocol: 'http:',
        hostname: 'localhost',
        port: '3333',
        path: '/'
      }
      await ipcRenderer.send('adonis-request', options)
    },
    /**
     * Login and get token
     */
    async login () {
      await axios
        .post(`${this.adonisUrl}/login`, this.loginData)
        .then(result => {
          this.token = result.data
          console.log(this.token.token)
        })
        .catch(error => {
          throw new Error(error)
        })
    },
    /**
     * Login and get token
     */
    async register () {
      await axios
        .post(`${this.adonisUrl}/users`, this.loginData)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          throw new Error(error)
        })
    },
    /**
     * 通过axios获取数据到组件
     */
    async fetch () {
      await axios
        .get(this.endpoint as string, this.config as AxiosRequestConfig)
        .then(result => {
          this.items = result.data
        })
        .catch(error => {
          throw new Error(error)
        })
    },
    /**
     * 重置组件状态
     */
    async reset () {
      this.editing = false
      this.model = {}
      await this.fetch()
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
    async deleteItem (item: object) {
      let id = (item as any).id
      // 在组件中创建这一方法，设置[编辑]为真，[数据模型]为传入项目
      this.setEditing(item)
      // axios方法
      await axios
        .post(`${this.endpoint}/${id}/delete`, item, this.config)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          throw new Error(error)
        })
      this.reset()
    },
    /**
     * 保存，通过创建或更新(InsertOrUpdate)
     * @param {object} item 要删除的项目，包含id字段
     */
    async saveItem (item: object) {
      if (this.editing) {
        this.updateItem(item)
      } else {
        this.createItem(item)
      }
      this.reset()
    },
    /**
     * 更新
     * @param {object} item 要删除的项目，包含id字段
     */
    async updateItem (item: object) {
      let id = (item as any).id
      // 在组件中创建这一方法，设置[编辑]为真，[数据模型]为传入项目
      this.setEditing(item)
      await axios
        .post(`${this.endpoint}/${id}/update`, item, this.config)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          throw new Error(error)
        })
    },
    /**
     * 创建
     * @param {object} item 要创建的项目数据，不包含id字段
     */
    async createItem (item: any) {
      // 设置[编辑]为假，[数据模型]为传入项目
      if (!this.editing) this.editing = false
      this.model = item
      let id = (item).id
      // 在组件中创建这一方法，设置[编辑]为真，[数据模型]为传入项目
      this.setEditing(item)
      await axios
        .post(`${this.endpoint}`, this.model, this.config)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          throw new Error(error)
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
