<template>
  <DefaultLayout>
    <DashboardTable></DashboardTable>
    <UserDashboard></UserDashboard>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import DashboardTable from '@/components/Dashboard/DashboardTable.vue'
import UserDashboard from '@/components/User/UserDashboard.vue'

@Component({
  components: {
    DefaultLayout,
    DashboardTable,
    UserDashboard
  }
})
export default class Dashboard extends Vue {}
</script>
