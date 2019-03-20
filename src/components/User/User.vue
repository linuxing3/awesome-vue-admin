<template>
  <UserTable>
    <UserForm />
  </UserTable>
</template>

<script lang="js">
import UserTable from './UserTable.vue'
import UserForm from './UserForm.vue'

export default {
  components: {
    UserTable,
    UserForm
  }
}
</script>
