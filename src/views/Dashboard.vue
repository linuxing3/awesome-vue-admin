<template>
  <DefaultLayout>
    <ActivityDashboard></ActivityDashboard>
    <UserDashboard></UserDashboard>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import ActivityDashboard from '@/components/Activity/ActivityDashboard.vue'
import UserDashboard from '@/components/User/UserDashboard.vue'

@Component({
  components: {
    DefaultLayout,
    ActivityDashboard,
    UserDashboard
  }
})
export default class Dashboard extends Vue {}
</script>
