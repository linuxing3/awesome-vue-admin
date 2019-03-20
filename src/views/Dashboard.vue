<template>
  <DefaultLayout>
    <DashboardSocialCard />
    <DashboardMonitor />
    <DashboardKanban />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import DashboardModelStatistic from '@/components/Dashboard/DashboardModelStatistic.vue'
import DashboardSocialCard from '@/components/Dashboard/DashboardSocialCard.vue'
import DashboardMonitor from '@/components/Dashboard/DashboardMonitor.vue'
import DashboardKanban from '@/components/Dashboard/DashboardKanban.vue'

export default {
  data () {
    return {
      items: ['project', 'projectType', 'document', 'documentType']
    }
  },
  components: {
    DefaultLayout,
    DashboardModelStatistic,
    DashboardSocialCard,
    DashboardMonitor,
    DashboardKanban
  },
  beforeCreate () {
    // 必须先载入持久数据
    this.asyncFetch(this.items)
  }
}
</script>
