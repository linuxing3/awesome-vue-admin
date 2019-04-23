<template>
  <div>
    <DashboardSocialCard />
    <DashboardMonitor />
  </div>
</template>

<script lang="js">
import DashboardModelStatistic from './DashboardModelStatistic.vue'
import DashboardSocialCard from './DashboardSocialCard.vue'
import DashboardMonitor from './DashboardMonitor.vue'
import DashboardKanban from './DashboardKanban.vue'

export default {
  data () {
    return {
      items: ['project', 'projectType', 'document', 'documentType']
    }
  },
  components: {
    DashboardModelStatistic,
    DashboardSocialCard,
    DashboardMonitor,
    DashboardKanban
  }
}
</script>
