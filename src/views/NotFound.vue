<template>
  <simple-layout>
      <div class="text-md-center">
        <h1>404</h1>
        <h2 class="my-3 headline ">Sorry, page not found</h2>
        <div>
          <v-btn
              color="primary"
              @click="goHome">Go Home</v-btn>
        </div>
      </div>
  </simple-layout>    
</template>

<script>
import SimpleLayout from '@/layout/simple.vue'
export default {
  components: {
    SimpleLayout
  },
  methods: {
    goHome() {
      this.$router.push({ path: '/home' })
    }
  }
}
</script>
<style scoped lang="css">
  h1 {
    font-size: 150px;
    line-height: 150px;
    font-weight: 700;
    color: #252932;
    text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
  }
</style>
