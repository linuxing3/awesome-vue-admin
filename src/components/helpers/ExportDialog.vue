<template>
  <v-dialog
      v-model='dialog'
    >
    <v-card
        class="elevation-1 pa-3 mt-5">
      <v-card-text>
        <div class="layout column align-center">
          <v-avatar
              size="256"
            >
            <img
                src="avatar/man_1.jpg"
                alt="Admin Panel"
                width="200"
                height="200">
          </v-avatar>
          <h1 class="flex my-4 primary--text">导出打印</h1>
        </div>
      </v-card-text>

      <v-select
          v-model="outputDocFile"
          label="选择Word目标文件，默认为template.doc"
          :items="templateDocs"></v-select>

      <v-card-actions>
        <v-spacer />
        <v-btn
            class="ml-3 mr-3"
            color="primary"
            @click="exportToWord"
            :loading="loading">Export</v-btn>
        <v-btn
            class="ml-3 mr-5"
            @click="$emit('TOGGLE')"
            flat>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { shell } from 'electron'
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
    modelName: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    dialog: false
  }),
  created () {
    this.$on('TOGGLE', () => {
      this.dialog = !this.dialog
    })
    window.ExportDialog = this
  },
  mixins: [ crudMixin, exportMixin ],
  methods: {
    exportToWord () {
      this.changeCSVHeader()
      this.copyModelNameCSV()
      shell.openItem(this.modelTemplate)
    }
  }
}
</script>
