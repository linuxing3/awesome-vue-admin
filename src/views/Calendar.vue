<template>
  <DefaultLayout>
    <CalendarFeature />
    <CalendarToggle v-if="1 === 0">
      <CalendarWeekly slot="weekly" />
      <CalendarEvent slot="project" />
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
    CalendarSlot: () => import('@/components/examples/calendars/slots.vue'),
    CalendarWeeklySlot: () => import('@/components/examples/calendars/weekly.vue'),
    CalendarFeature: () => import('@/components/Calendar/CalendarFeature.vue'),
    CalendarWeekly: () => import('@/components/Calendar/CalendarWeekly.vue'),
    CalendarList: () => import('@/components/Calendar/CalendarList.vue'),
    CalendarToggle: () => import('@/components/Calendar/CalendarToggle.vue')
  }
})
export default class Calendar extends Vue {
}
</script>
