<template>
  <DefaultLayout>
    <AppEditor />
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import AppEditor from '@/components/App/AppEditor.vue'

@Component({
  components: {
    DefaultLayout,
    AppEditor
  }
})
export default class Editor extends Vue {
  methods: {
  }
}
</script>
