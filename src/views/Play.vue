<template>
  <DefaultLayout>
    <PlayComponent />
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import PlayComponent from '@/components/App/AppEditor.vue'

@Component({
  components: {
    DefaultLayout,
    PlayComponent
  }
})
export default class Play extends Vue {
  methods: {
  }
}
</script>
