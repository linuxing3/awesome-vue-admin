<template>
  <v-dialog
      v-model='dialog'
      width="80%"
      loading="true"
    >
    <v-btn
        class="ml-3 mr-3"
        slot="activator"
        color="primary"
        dark>{{buttonText}}</v-btn>
    <v-card
        class="elevation-1 pa-3">
      <v-card-title
          class="primary"
          dark
        ><div class="title white--text">当前表名：{{modelName}}</div></v-card-title>
      <v-card-text>
        <h1 class="my-4 primary--text">{{title}}</h1>
        <div>
          <p>{{msg}}</p>
          <p>{{step1}}</p>
          <p>{{step2}}</p>
          <p>{{step3}}</p>
          <p>{{step4}}</p>
          <p>{{step5}}</p>
        </div>
      </v-card-text>

      <v-select
          class='pa-5'
          v-model="outputDocFile"
          label="选择Word目标文件，默认为template.doc"
          :items="templateDocs"></v-select>

      <v-card-actions>
        <v-btn
            class="ml-3 mr-3"
            color="primary"
            @click.native='exportToCSV'>{{ $t('export') }}CSV</v-btn>
        <v-btn
            class="ml-3 mr-3"
            color="primary lighten-1"
            @click="exportToWord"
            :loading="loading">{{ $t('export') }}Word</v-btn>
        <span class="red white--text">{{text}}</span>
        <v-spacer />
        <v-btn
            class="ml-3 mr-3"
            @click="$emit('TOGGLE')"
            flat>{{ $t('cancel')}}</v-btn>
      </v-card-actions>
      <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
        >
        {{ text }}
        <v-btn
            color="pink"
            flat
            @click="snackbar = false; text = ''"
          >
          Close
        </v-btn>
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

<script>
import { shell } from 'electron'
import exportMixin from '@/mixins/exportMixin'

export default {
  props: {
    items: {
      type: Object | Array,
      default: []
    },
    modelName: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: 'Open Dialog'
    }
  },
  data: () => ({
    dialog: false,
    title: '导出打印从未如此方便！',
    msg: '使用Word或Wps可以方便地将数据导出到csv文件并合并打印, csv文件可以用Excel打开编辑, 也可以用Word合并打印',
    step1: '第一步: Wps中打开[工具]菜单, 选择[邮件合并工具栏]',
    step2: '第二步: 使用[邮件合并工具栏], 选择[数据源]按钮',
    step3: '第三步: 在打开的文件选择框中, 选择[文档]-[template]-[db.csv]',
    step4: '第四步: 使用[邮件合并工具栏], 选择[插入合并域]按钮,插入需要的数据域',
    step5: '第五步: 使用[邮件合并工具栏], 选择[查看合并域]按钮即可显示真实数据并打印',
    snackbar: false,
    timeout: 1000,
    text: ''
  }),
  created () {
    this.$on('TOGGLE', () => {
      this.dialog = !this.dialog
      this.text = ''
    })
    window.ExportDialog = this
  },
  mixins: [ exportMixin ],
  methods: {
    exportToWord () {
      this.mergeWordApp()
    },
    exportToCSV () {
      this.text = '导出成功!。文件位置' + this.modelDatasource
      this.exportItem(this.items)
      this.snackbar = true
    }
  }
}
</script>
