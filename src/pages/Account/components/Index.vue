<template>
  <AccountTable>
    <AccountForm />
  </AccountTable>
</template>

<script lang="js">
import AccountTable from './AccountTable.vue'
import AccountForm from './AccountForm.vue'

export default {
  components: {
    AccountTable,
    AccountForm
  }
}
</script>
