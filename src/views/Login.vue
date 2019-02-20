<template>
  <SimpleLayout>
    <LoginForm></LoginForm>
  </SimpleLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SimpleLayout from '@/layout/simple.vue'

import LoginForm from '@/components/Login/LoginForm.vue'

@Component({
  components: {
    SimpleLayout,
    LoginForm
  }
})
export default class Login extends Vue {}
</script>
