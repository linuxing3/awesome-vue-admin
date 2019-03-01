<template>
  <DefaultLayout>
    <PlayComponent />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue'
import PlayComponent from '@/components/helpers/SpeedDial.vue'

export default {
  components: {
    DefaultLayout,
    PlayComponent
  }
}
</script>
