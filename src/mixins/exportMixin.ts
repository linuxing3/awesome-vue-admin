import { join } from 'path'
import { last } from 'lodash'
import { copyFileSync, existsSync, writeFileSync, mkdirSync } from 'fs'
import { remote, shell } from 'electron'
import XLSX from 'xlsx'
import { Document, Paragraph, TextRun, Packer } from 'docx'

import { Model } from '@vuex-orm/core'
import models from '@/models'
import keysDef from '@/locales/cn.json'
import { getFilesByExtentionInDir, GenerateCSV, ImportCSV, changeHeaderOfCSV } from '@/util'

export default {
  data() {
    return {
      importFileMeta: {},
      outputDocFile: 'template',
      workbook: null,
      document: null,
      fileFormat: 'csv',
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
    userHomeDir: () => remote.app.getPath('home'), // 用户模板目录
    userDataDir: () => remote.app.getPath('userData'), // 用户数据目录
    templateDir: function() {
      return join(this.userHomeDir, '/Documents/template') // 用户模板目录
    },
    attachDir: function() {
      return join(this.userHomeDir, '/Documents/attach') // 用户模板目录
    },
    realDataDir: function() {
      return join(this.userDataDir, 'data') // 用户数据目录
    },
    // 获取模板目录下的doc文件
    templateDocs: function() {
      return getFilesByExtentionInDir({ path: this.templateDir, ext: 'doc' })
    },
    // 获取模板目录下的当前模型对应csv文件
    modelDatasource: function() {
      return this.resolvePath(this.modelName, 'csv')
    },
    // 获取模板目录下的当前模型对应csv文件
    docxAttach: function() {
      return this.resolvePath(this.modelName, 'docx')
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
      if (e.target.files) {
        this.importFileMeta = e.target.files[0]
      } else {
        const openedFiles = remote.dialog.showOpenDialog({ properties: ['openFile'] })
        // 文件对象
        this.importFileMeta.path = openedFiles[0]
      }
      console.log(this.importFileMeta.path)
      // 文件格式，csv， xls， docx
      this.fileFormat = last(this.importFileMeta.path.split('.'))
      this.$forceUpdate()
    },
    /**
     * 导入数据函数
     */
    attemptImport() {
      if (this.fileFormat === 'csv') {
        // this.importCSV()
        this.importExcel()
      } else if (this.fileFormat === 'xls' || this.fileFormat === 'xlsx') {
        this.importExcel()
      }
      this.importFileMeta = {}
    },
    /**
     * 导入数据函数
     */
    async importCSV() {
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
      // Delete all data
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
    attemptExport(item) {
      if (this.fileFormat === 'csv') {
        this.exportCSV(item)
      } else if (this.fileFormat === 'xls' || this.fileFormat === 'xlsx') {
        this.exportExcel()
      } else if (this.fileFormat === 'docx') {
        this.exportDocx()
      }
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
        // 选择是否保留原有标题
        if (this.keepOriginalHeader) {
          setTimeout(async () => {
            let r = confirm(
              '请选择是否保留原有标题。\n因为数据标题行为外文，需要添加中文对应标题。\n你可以随意删除无用标题'
            )
            if (r) {
              this.changeCSVHeader()
            } else {
              alert('跳过...')
            }
          }, 3000)
        }
        // 打开文件所在目录并定位到文件
        setTimeout(() => {
          shell.showItemInFolder(this.modelDatasource)
          console.log(`导出${this.modelDatasource}文件成功`)
        }, 5000)
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * 导出文件修改标题函数
     */
    changeCSVHeader() {
      console.log(`更新${this.modelDatasource}文件的列标题...`)
      if (existsSync(this.modelDatasource)) {
        try {
          changeHeaderOfCSV({
            targetFilePath: this.modelDatasource,
            keysDef: this.keysDef,
            reverse: this.reverseTranslate,
            keepOriginalHeader: this.keepOriginalHeader
          })
          alert('完成标题对应，可以使用了')
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
      if (existsSync(this.modelDatasource)) {
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
    async mergeWordApp() {
      this.copyModelNameCSV()
      if (existsSync(this.modelTemplate)) {
        shell.showItemInFolder(this.modelTemplate)
        // shell.openItem(this.modelTemplate)
      } else {
        throw new Error('无法找到Word模板文件，请查看手册。')
      }
    },
    /**
     * 导出到Excel文件
     */
    exportExcel(item) {
      /* show a file-open dialog and read the first selected file */
      let workbook = this.workbook
      let filename = this.importFileMeta.path
      let data = Array.isArray(item) ? item : [item]
      let sheetName = 'data'
      try {
        this.writeExcelFile({
          workbook,
          filename,
          data,
          sheetName
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * 打开Excel文件
     */
    importExcel() {
      // 电子表对象
      try {
        this.workbook = XLSX.readFile(this.importFileMeta.path)
        let sheetName = this.workbook.SheetNames[0]
        let worksheet = this.workbook.Sheets[sheetName]
        let data = XLSX.utils.sheet_to_json(worksheet)
        console.table(data)
        if (data.length) this.persistData(data)
      } catch (error) {
        throw new Error(error)
      }
      console.log('打开Excel文件，已读取数据')
    },
    writeExcelFile({ workbook, filename, sheetName, data, options }) {
      // 创建新的电子表格
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data)
      // 添加电子表格到文件中
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
      // 写入文件
      XLSX.writeFile(workbook, filename, options)
    },
    saveExcelAs(worksheet: XLSX.WorkSheet, type = 'csv') {
      let output
      if (type === 'csv') {
        output = XLSX.utils.sheet_to_csv(worksheet, {
          FS: ',',
          blankrows: false
        })
      }
      return output
    },
    /**
     * 拖放导入
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
      if (rABS) reader.readAsBinaryString(this.importFileMeta.path)
      else reader.readAsArrayBuffer(this.importFileMeta.path)
    },
    exportDocx(data) {
      let defaultPath = join(this.attachDir, this.modelName, 'test.docx')
      let filename = this.importFileMeta.path || defaultPath

      try {
        mkdirSync(join(this.attachDir, this.modelName))
      } catch (error) {
        throw new Error(error)
      }
      
      try {
        this.document = new Document()
        console.log(filename)
        // 创建新的文档或使用默认文档
        let p = new Paragraph(this.modelName)
        let content = new TextRun(data)
        p.addRun(content)
        // 添加段落到文件中
        this.document.addParagraph(p)
        console.log(this.document)
        // 写入文件
        const packer = new Packer()
        packer.toBuffer(this.document).then(buffer => {
          writeFileSync(filename, buffer)
        })
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
