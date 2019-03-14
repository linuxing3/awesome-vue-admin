<template>
  <DefaultLayout>
    <DashboardModelStatistic />
    <DashboardSocialCard />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import DashboardTable from '@/components/Dashboard/DashboardModelStatistic.vue'
import DashboardSocialCard from '@/components/Dashboard/DashboardSocialCard.vue'

export default {
  components: {
    DefaultLayout,
    DashboardModelStatistic,
    DashboardSocialCard
  }
}
</script>
