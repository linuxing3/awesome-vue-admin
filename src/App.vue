<template>
  <router-view :key="$route.fullpath"></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>
