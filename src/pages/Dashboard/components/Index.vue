<template>
  <div>
    <DashboardMonitorDocument />
    <DashboardMonitorUser />
  </div>
</template>

<script lang="js">
import DashboardModelStatistic from './DashboardModelStatistic.vue'
import DashboardSocialCard from './DashboardSocialCard.vue'
import DashboardMonitorDocument from './DashboardMonitor.document.vue'
import DashboardMonitorUser from './DashboardMonitor.user.vue'
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
    DashboardMonitorDocument,
    DashboardMonitorUser,
    DashboardKanban
  }
}
</script>
