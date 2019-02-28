<template>
  <DefaultLayout>
    <CalendarFeature />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import CalendarFeature from '@/components/Calendar/CalendarFeature'

export default {
  components: {
    DefaultLayout,
    CalendarFeature
  }
}
</script>
