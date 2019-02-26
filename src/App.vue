<template>
  <router-view :key="$route.fullpath"></router-view>
</template>

<script>
export default {
  name: 'App',
  created () {
    // Try to persist app settings
    // this.$store.commit('entities/app/init')
    // Try to persist database names
    this.$store.dispatch('entities/database/init')
  }
}
</script>
