<template>
  <v-layout
      class="ma-3"
    >
    <quillEditor
        v-model="content"
        ref="quillEditor"
        :options="editorOption"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)" />
  </v-layout>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Docx from 'docx'

export default {
  components: {
    quillEditor
  },
  data: function () {
    return {
      message: 'Hi from Vue.',
      content: '<h2>I am Example A</h2>',
      document: null,
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
      // let { quill, html, text } = quill
      console.log('editor changed!', quill)
      // do persist work here
      this.document = new Docx.File({})
      let p = new Docx.Paragraph(this.content)
      this.document.addParagraph(p)
    }
  }
}
</script>
