import { join } from 'path'
import { copyFileSync, pathExistsSync } from 'fs-extra'
import { remote, shell } from 'electron'
import keysDef from '@/locales/cn.json'
import { getFilesByExtentionInDir, GenerateCSV, ImportCSV, changeHeaderOfCSV } from '@/util'
import XLSX from 'xlsx'

import { Model } from '@vuex-orm/core'
import models from '@/models'

export default {
  data() {
    return {
      modelName: '',
      importFileMeta: {},
      outputDocFile: 'template',
      workbook: null,
      needChangeCSVHeader: false,
      keepOriginalHeader: true,
      reverseTranslate: false,
      onlyKeepStringValue: true,
      needMergeWord: false
    }
  },
  computed: {
    Model(): Model {
      return models[this.modelName]
    },
    keysDef: () => keysDef, // 翻译定义
    templateDir: () => join(remote.app.getPath('home'), '/Documents/template'), // 用户模板目录
    userDataDir: () => join(remote.app.getPath('userData'), 'data'), // 用户数据目录
    // 获取模板目录下的doc文件
    templateDocs: function() {
      return getFilesByExtentionInDir({ path: this.templateDir, ext: 'doc' })
    },
    // 获取模板目录下的当前模型对应csv文件
    modelDatasource: function() {
      return this.resolvePath(this.modelName, 'csv')
    },
    // 获取模板目录下的默认csv文件
    defaultDatasource: function() {
      return this.resolvePath('db', 'csv')
    },
    // 获取模板目录下默认Word模板
    defaultTemplate: function() {
      return this.resolvePath('template', 'doc')
    },
    // 获取模板目录下自选Word模板
    modelTemplate: function() {
      return this.resolvePath(this.outputDocFile, 'doc')
    }
  },
  methods: {
    resolvePath(fileName, fileExt) {
      return join(this.templateDir, `${fileName}.${fileExt}`)
    },
    /**
     * 获取导入文件信息
     * @param e 事件
     */
    getImportFile(e) {
      // 从选择控件获取文件对象
      this.importFileMeta = e.target.files[0]
      // 检查导入文件名和本地模块是否一致
      let fileName = this.importFileMeta.name.replace(/\.csv$/, '')
      if (fileName !== this.modelName) {
        alert('导入文件名称不规范，建议命名为' + this.modelName)
      }
      console.table(this.importFileMeta)
      console.log(`导入表名: ${this.modelName}`)
    },
    /**
     * 导入数据函数
     */
    async importItem() {
      console.log(`导入${this.modelName}.csv文件...`)
      let data: any[] = await ImportCSV({
        file: this.importFileMeta,
        keysDef: this.keysDef
      })
      console.table(data)
      if (data.length) this.persistData(data)
    },
    persistData(data) {
      if (!Array.isArray(data)) return
      if (this.modelName === '') return
      try {
        console.log(`保存${this.modelName}...`)
        // 逐个插入数据到数据存储文件
        data.forEach(item => {
          this.Model.$create({ data: item })
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    resetData(data) {
      if (!Array.isArray(data)) return
      try {
        console.log(`删除${this.modelName}全部数据`)
        let count = 0
        // 逐个插入数据到数据存储文件
        data.forEach(item => {
          let id = item._id || item.id
          this.Model.$delete(id)
          count = count + 1
        })
        console.log(`共删除数据数: ${count}`)
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * 导出数据函数
     */
    exportItem(item) {
      this.exportCSV(item)
    },
    exportCSV(item) {
      console.log(`导出到${this.modelDatasource}文件...`)
      try {
        GenerateCSV({
          data: item,
          targetFilePath: this.modelDatasource,
          keysDef: this.keysDef,
          needTranslateHeader: this.needChangeCSVHeader, // 这里不转换，待生成CSV文件后，更改CSV文件
          onlyKeepStringValue: this.onlyKeepStringValue // 这里转换[对象类]键值为[字符串类]键值
        })
        console.log(`导出${this.modelDatasource}文件成功`)
        shell.showItemInFolder(this.modelDatasource)
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * 导出文件修改标题函数
     */
    changeCSVHeader() {
      console.log(`更新${this.modelDatasource}文件的列标题...`)
      if (pathExistsSync(this.modelDatasource)) {
        try {
          changeHeaderOfCSV({
            targetFilePath: this.modelDatasource,
            keysDef: this.keysDef,
            reverse: this.reverseTranslate,
            keepOriginalHeader: this.keepOriginalHeader
          })
        } catch (error) {
          throw new Error(error)
        }
      }
    },
    /**
     * 导出文件备份函数
     */
    copyModelNameCSV() {
      console.log('备份为db.csv文件...')
      if (pathExistsSync(this.modelDatasource)) {
        try {
          copyFileSync(this.modelDatasource, this.defaultDatasource)
        } catch (error) {
          throw new Error(error)
        }
      }
    },
    /**
     * 导出文件打印合并函数
     */
    mergeWordApp() {
      this.changeCSVHeader()
      this.copyModelNameCSV()
      if (pathExistsSync(this.modelTemplate)) {
        shell.showItemInFolder(this.modelTemplate)
        // shell.openItem(this.modelTemplate)
      } else {
        throw new Error('无法找到Word模板文件，请查看手册。')
      }
    },
    /**
     * 打开Excel文件
     */
    readExcelFile() {
      /* show a file-open dialog and read the first selected file */
      const o = remote.dialog.showOpenDialog({ properties: ['openFile'] })
      this.importFileMeta = o[0]
      this.workbook = XLSX.readFile(this.importFileMeta)
      console.log('打开了Excel文件')
    },
    writeExcelFile({ workbook, filename, options }) {
      /* show a file-open dialog and read the first selected file */
      if(filename ==='') filename = this.importFileMeta.path
      if(workbook === undefined) workbook = this.workbook
      XLSX.writeFile(workbook, filename, options)
    },
    createNewWorksheet({ wb, sheetName, data }) {
      if (!Array.isArray(data)) data = [data]
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data)
      /* Add the worksheet to the workbook */
      XLSX.utils.book_append_sheet(wb, ws, sheetName)
    },
    saveExcelAs(ws: XLSX.WorkSheet, type = 'csv') {
      let output
      if (type === 'csv') {
        output = XLSX.utils.sheet_to_csv(ws, {
          FS: ',',
          blankrows: false
        })
      }
      return output
    },
    /**
     *
     */
    async handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      const reader = (window as any).reader
      let rABS = true
      let files = e.dataTransfer.files
      this.importFileMeta = files[0]
      reader.onload = async function(e) {
        let data = e.target.result
        if (!rABS) data = new Uint8Array(data)
        let workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' })
        console.log('打开了Excel文件')
        /* DO SOMETHING WITH workbook HERE */
        return workbook
      }
      if (rABS) reader.readAsBinaryString(this.importFileMeta)
      else reader.readAsArrayBuffer(this.importFileMeta)
    }
  }
}
