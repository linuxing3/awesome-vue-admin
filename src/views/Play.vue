<template>
  <DefaultLayout>
    <PlayComponent />
  </DefaultLayout>
</template>

<script>
import PlayComponent from '@/components/helpers/CrudTable.vue'

export default {
  components: {
    DefaultLayout,
    PlayComponent
  }
}
</script>
