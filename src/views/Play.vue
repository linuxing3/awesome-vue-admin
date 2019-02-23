<template>
  <DefaultLayout>
    <Manual />
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import examples from '@/components'

@Component({
  components: {
    DefaultLayout,
    ...examples
  }
})
export default class Play extends Vue {}
</script>
