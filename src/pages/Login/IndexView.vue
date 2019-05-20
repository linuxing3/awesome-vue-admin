<template>
  <simple-layout>
    <Login />
  </simple-layout>
</template>

<script lang="js">
import SimpleLayout from '@/layout/simple.vue'
import Login from './components/Login.vue'

export default {
  components: {
    SimpleLayout,
    Login
  }
}
</script>
