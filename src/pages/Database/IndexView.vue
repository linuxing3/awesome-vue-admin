<template>
  <DefaultLayout>
    <DatabaseManager />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import DatabaseManager from './components/DatabaseManager.vue'

export default {
  components: {
    DefaultLayout,
    DatabaseManager
  }
}
</script>
