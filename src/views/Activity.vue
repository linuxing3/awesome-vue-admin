<template>
  <DefaultLayout>
    <ActivityTable></ActivityTable>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import ActivityTable from '@/components/Activity/ActivityTable.vue'

@Component({
  components: {
    DefaultLayout,
    ActivityTable
  }
})
export default class Home extends Vue {}
</script>
