<template>
  <DefaultLayout>
    <PlayComponent />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue'
import PlayComponent from '@/components/examples/cards/twitterCard'

export default {
  components: {
    DefaultLayout,
    PlayComponent
  }
}
</script>
