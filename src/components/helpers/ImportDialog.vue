<template>
  <v-dialog
      v-model='dialog'
      width="50%"
    >
    <v-btn
        class="ma-3"
        slot="activator"
        color="primary"
        dark>{{buttonText}}</v-btn>
    <v-card
        class="elevation-1 pa-3 mt-5">
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
        <input
            type="file"
            @change=" getImportFile($event) "/>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
            class="ml-3 mr-3"
            color="primary"
            @click="importItem"
            :loading="loading">{{ $t('import')}}数据</v-btn>
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
  props: {
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
    title: '导入现有数据表从未如此方便！',
    msg: '建议使用csv文件进行数据导入。',
    step1: '第一步: 用[导出数据]功能导出一个只有标题行的csv模板文件',
    step2: '第二步: 用Excel打开该csv文件',
    step3: '第三步: 用Excel将需要导入的数据表粘贴到模板csv文件中，注意中英文标题对应',
    step4: '第四步: 用[导入数据]功能进行导入'
  }),
  created () {
    this.$on('TOGGLE', () => {
      this.dialog = !this.dialog
    })
    window.ImportDialog = this
  },
  mixins: [ exportMixin ]
}
</script>
