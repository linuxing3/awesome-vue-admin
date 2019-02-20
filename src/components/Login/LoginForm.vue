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
  </v-card>
</template>
<style scoped>
</style>
