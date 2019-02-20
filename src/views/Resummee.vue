<template>
  <DefaultLayout>
    <ResummeeTable></ResummeeTable>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import ResummeeTable from '@/components/Resummee/ResummeeTable.vue'

@Component({
  components: {
    DefaultLayout,
    ResummeeTable
  }
})
export default class Home extends Vue {}
</script>
