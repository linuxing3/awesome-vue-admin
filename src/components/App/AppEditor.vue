<template>
  <quillEditor
    v-model="content"
    ref="quillEditor"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)" />
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data: {
    message: 'Hi from Vue.',
    content: '<h2>I am Example A</h2>',
    content2: '<h2>I am Example B</h2>',
    editorOption: {
      theme: 'snow'
    }
  },
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    }
  },
}
</script>