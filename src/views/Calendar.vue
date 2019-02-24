<template>
  <DefaultLayout>
    <CalendarFeature/>
    <CalendarToggle v-if="1 === 0">
      <CalendarEvent slot="project" />
      <CalendarWeekly slot="weekly" />
      <CalendarList slot="list" />
    </CalendarToggle>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'
import CalendarEvent from '@/components/Calendar/CalendarEvent.vue'

@Component({
  components: {
    DefaultLayout,
    CalendarEvent,
    CalendarFeature: () => import('@/components/Calendar/CalendarFeature.vue'),
    CalendarWeekly: () => import('@/components/Calendar/CalendarWeekly.vue'),
    CalendarList: () => import('@/components/Calendar/CalendarList.vue'),
    CalendarToggle: () => import('@/components/Calendar/CalendarToggle.vue')
  }
})
export default class Calendar extends Vue {
}
</script>
