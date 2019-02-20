<script>
import Account from '@/models/Account'

import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  data() {
    return {
      modelName: 'account'
    }
  },
  mixins: [ crudMixin, exportMixin ],
  created() {
    window.LoginForm = this
  }
}
</script>

<template>
  <v-card>
    <v-card-title>
      登录
    </v-card-title>
    <v-card-actions>
      <v-btn flat>登录</v-btn>
      <v-btn flat>取消</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
</style>
