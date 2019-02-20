<template>
  <DefaultLayout>
    <NotificationTable></NotificationTable>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import NotificationTable from '@/components/Notification/NotificationTable.vue'

@Component({
  components: {
    DefaultLayout,
    NotificationTable
  }
})
export default class Home extends Vue {}
</script>
