<template>
  <DefaultLayout>
    <Employee />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import Employee from './components/Index.vue'

export default {
  components: {
    DefaultLayout,
    Employee
  }
}
</script>
