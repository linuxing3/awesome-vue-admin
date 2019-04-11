<template>
  <DefaultLayout>
    <Department />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import Department from './components/Index.vue'

export default {
  components: {
    DefaultLayout,
    Department
  }
}
</script>
