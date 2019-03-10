<template>
  <v-dialog
      v-model='dialog'
      width="80%"
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
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
            class="ml-3 mr-3"
            color="primary"
            @click.native='openDocxFile(item)'>Open Word File</v-btn>
        <v-btn
            class="ml-3 mr-3"
            color="primary lighten-1"
            @click="exportToWord"
            :loading="loading">Write Word File</v-btn>
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
import crudMixin from '@/mixins/crudMixin'

export default {
  props: {
    item: {
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
    title: '生成单独附件从未如此方便！',
    msg: '如果你的正文太长，可以选择生成Word或Wps文件作为单独附件。',
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
    window.AttachDialog = this
  },
  mixins: [ crudMixin, exportMixin ],
  methods: {
    exportToWord () {
      this.text = '导出成功!。文件位置' + this.importFileMeta.path
      this.exportDocx(this.modelName)
      this.snackbar = true
    }
  }
}
</script>
