<template>
  <v-dialog
      v-model='dialog'
      width="80%"
      :loading="loading"
    >
    <v-btn
        slot="activator"
        fab
        dark
        small
        color="green"
      >
      <v-icon>backup</v-icon>
    </v-btn>
    <v-card
        class="elevation-1 pa-3">
      <v-card-title
          class="green"
          dark
          layout
          row
          justify-space-between
        >
        <div class="title white--text">当前表名：{{modelName}}</div>
        <v-spacer></v-spacer>
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <span
                class="title font-weight-light green--text ml-5 ">
              {{ importFileMeta.path || "选取导入文件 -> " }}
            </span>
            <v-btn
                icon
                fab
                large
                @click="getImportFile">
              <v-icon
                  color="green"
                >cloud</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-actions>
            <span
                v-if="this.importFileMeta.path"
                class="title font-weight-light green--text ml-5 ">
              开始正式导入
            </span>
            <v-spacer></v-spacer>
            <v-btn
                class="green white--text"
                @click="importItem">
              <v-icon>add</v-icon>
              导入
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card-title>
      <v-card-text>
        <h1 class="flex my-4 primary--text">{{title}}</h1>
        <div>
          <p>{{msg}}</p>
          <p>{{step1}}</p>
          <p>{{step2}}</p>
          <p>{{step3}}</p>
          <p>{{step4}}</p>
        </div>
        <v-divider />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
            class="ml-3 mr-3"
            @click="$emit('TOGGLE')"
            flat>{{ $t('cancel')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import exportMixin from '@/mixins/exportMixin'

export default {
  mixins: [ exportMixin ],
  props: {
    modelName: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: '导入'
    }
  },
  data: () => ({
    dialog: false,
    loading: false,
    title: '导入现有数据表从未如此方便！',
    msg: '建议使用csv/excel文件进行数据导入。',
    step1: '第一步: 用[导出数据]功能导出一个只有标题行的csv/excel模板文件',
    step2: '第二步: 用Excel打开该文件',
    step3: '第三步: 将需要导入的数据表粘贴到数据表中，注意中英文标题对应',
    step4: '第四步: 用[导入数据]功能进行导入'
  }),
  created () {
    this.$on('TOGGLE', () => {
      this.dialog = !this.dialog
    })
    window.ImportDialog = this
  },
  methods: {
    importItem () {
      this.attemptImport()
    }
  }
}
</script>
