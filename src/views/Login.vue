<template>
  <SimpleLayout>
    <LoginForm></LoginForm>
  </SimpleLayout>
</template>

<script>
import SimpleLayout from '@/layout/simple.vue'
import LoginForm from '@/components/Login/LoginForm.vue'

export default {
  components: {
    SimpleLayout,
    LoginForm
  }
}
</script>
