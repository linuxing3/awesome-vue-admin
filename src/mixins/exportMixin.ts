import { join } from 'path'
import { copyFileSync, pathExistsSync } from 'fs-extra'
import { remote, shell } from 'electron'
import keysDef from '@/locales/cn.json'
import { getFilesByExtentionInDir, GenerateCSV, ImportCSV, changeHeaderOfCSV } from '@/util'

export default {
  data () {
    return {
      modelName: '',
      outputDocFile: 'template',
      needChangeCSVHeader: false,
      reverseTranslate: false,
      onlyKeepStringValue: true,
      needMergeWord: false
    }
  },
  computed: {
    Model (): Model {
      return models[this.modelName]
    },
    keysDef: () => keysDef, // 翻译定义
    templateDir: () => join(remote.app.getPath('home'), '/Documents/template'), // 用户模板目录
    userDataDir: () => join(remote.app.getPath('userData'), 'data'), // 用户数据目录
    // 获取模板目录下的doc文件
    templateDocs: function () {
      return getFilesByExtentionInDir({ path: this.templateDir, ext: 'doc' })
    },
    // 获取模板目录下的当前模型对应csv文件
    modelDatasource: function () {
      return this.resolvePath(this.modelName, 'csv')
    },
    // 获取模板目录下的默认csv文件
    defaultDatasource: function () {
      return this.resolvePath('db', 'csv')
    },
    // 获取模板目录下默认Word模板
    defaultTemplate: function () {
      return this.resolvePath('template', 'doc')
    },
    // 获取模板目录下指定的Word模板
    modelTemplate: function () {
      return this.resolvePath(this.outputDocFile, 'doc')
    }
  },
  methods: {
    resolvePath (fileName, fileExt) {
      return join(this.templateDir, `${fileName}.${fileExt}`)
    },
    /**
     * 导入数据函数
     */
    async importItem () {
      console.log(`导入${this.modelName}.csv文件...`)
      let data = await ImportCSV({
        file: this.importDatasource,
        keysDef: this.keysDef
      })
      console.log(data)
      this.importDataToDb(data)
    },
    importDataToDb (data) {
      if (!Array.isArray(data)) return
      console.log(`导入到${this.modelName}对应的lowdb数据文件...`)
      // 逐个插入数据到数据存储文件
      data.forEach(item => {
        this.Model.$create({ data: item })
      })
    },
    /**
     * 导出数据函数
     */
    exportItem (item) {
      console.log(`导出${this.modelName}.csv文件...`)
      GenerateCSV({
        data: item,
        targetFilePath: this.modelDatasource,
        keysDef: this.keysDef,
        needTranslateHeader: this.needChangeCSVHeader, // 这里不转换，待生成CSV文件后，更改CSV文件
        onlyKeepStringValue: this.onlyKeepStringValue // 这里转换[对象类]键值为[字符串类]键值
      })
    },
    /**
     * 导出文件修改标题函数
     */
    changeCSVHeader () {
      console.log(`更新${this.modelDatasource}.csv文件的列标题...`)
      if (pathExistsSync(this.modelDatasource)) {
        changeHeaderOfCSV({
          targetFilePath: this.modelDatasource,
          keysDef: this.keysDef,
          reverse: this.reverseTranslate
        })
      }
    },
    /**
     * 导出文件备份函数
     */
    copyModelNameCSV () {
      console.log('备份为db.csv文件...')
      if (pathExistsSync(this.modelDatasource)) {
        copyFileSync(this.modelDatasource, this.defaultDatasource)
      }
    },
    /**
     * 导出文件打印合并函数
     */
    mergeWordApp () {
      alert('进行Word邮件合并...')
      this.changeCSVHeader()
      this.copyModelNameCSV()
      shell.showItemInFolder(this.defaultDatasource)
      shell.openItem(this.modelTemplate)
    }
  }
}
