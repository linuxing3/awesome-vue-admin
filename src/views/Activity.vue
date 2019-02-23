<template>
  <DefaultLayout>
    <ActivityTable></ActivityTable>
    <ActivityForm></ActivityForm>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import ActivityTable from '@/components/Activity/ActivityTable.vue'
import ActivityForm from '@/components/Activity/ActivityForm.vue'

@Component({
  components: {
    DefaultLayout,
    ActivityTable,
    ActivityForm
  }
})
export default class Home extends Vue {}
</script>
