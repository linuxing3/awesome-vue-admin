<template>
  <DefaultLayout>
    <UserTable>
      <!-- <v-dialog
          slot='form-dialog'
          v-model='dialog'
          width="60%"
        >
        <v-btn
            class="ma-3"
            slot="activator">
            添加
          </v-btn>
      </v-dialog> -->
    </UserTable>
    <UserForm class="pa-3"></UserForm>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import UserTable from '@/components/User/UserTable.vue'
import UserForm from '@/components/User/UserForm.vue'

@Component({
  components: {
    DefaultLayout,
    UserTable,
    UserForm
  }
})
export default class User extends Vue {
  dialog = false
}
</script>
