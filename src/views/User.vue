<template>
  <DefaultLayout>
    <User />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import User from '@/components/User/User.vue'

export default {
  components: {
    DefaultLayout,
    User
  }
}
</script>
