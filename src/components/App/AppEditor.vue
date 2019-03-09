<template>
  <v-container
    fluid
    fill-height>
    <v-layout
        class="justify-center ma-3"
      >
      <v-btn 
        @click="saveDocument"
        class="primary">
        Save
      </v-btn>
      <v-divider />
      <quillEditor
          v-model="content"
          ref="quillEditor"
          :options="editorOption"
          @change="onEditorChange($event)"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)" />
    </v-layout>
  </v-container>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import exportMixin from '@/mixins/exportMixin'

export default {
  mixins: [ exportMixin ],
  components: {
    quillEditor
  },
  data: function () {
    return {
      message: 'Hi from Vue.',
      content: '<h2>I am Example A</h2>',
      editorOption: {
        theme: 'snow'
      }
    }
  },
  methods: {
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange (quill) {
      console.log('editor changed!', quill)
    },
    saveDocument () {
      this.getImportFile()
      let r = confirm(
        '是否导出为Word？'
      )
      if (r) {
        this.exportDocx(this.content)
      } else {
        alert('跳过...')
      }
    }
  }
}
</script>
