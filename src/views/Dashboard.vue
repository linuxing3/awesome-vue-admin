<template>
  <DefaultLayout>
    <DashboardSocialCard />
    <DashboardMonitor />
    <DashboardProject />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import DashboardModelStatistic from '@/components/Dashboard/DashboardModelStatistic.vue'
import DashboardSocialCard from '@/components/Dashboard/DashboardSocialCard.vue'
import DashboardMonitor from '@/components/Dashboard/DashboardMonitor.vue'
import DashboardProject from '@/components/Dashboard/DashboardProject.vue'

export default {
  components: {
    DefaultLayout,
    DashboardModelStatistic,
    DashboardSocialCard,
    DashboardMonitor,
    DashboardProject
  }
}
</script>
