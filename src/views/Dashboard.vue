<template>
  <DefaultLayout>
    <DashboardTable />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import DashboardTable from '@/components/Dashboard/DashboardTable.vue'

export default {
  components: {
    DefaultLayout,
    DashboardTable
  }
}
</script>
