<template>
  <SimpleLayout>
    <LoginForm />
  </SimpleLayout>
</template>

<script lang="js">
import SimpleLayout from '@/layout/simple.vue'
import LoginForm from './components/LoginForm.vue'

export default {
  components: {
    SimpleLayout,
    LoginForm
  }
}
</script>
