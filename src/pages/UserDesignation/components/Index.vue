<template>
  <UserDesignationTable>
    <UserDesignationForm />
  </UserDesignationTable>
</template>

<script lang="js">
import UserDesignationTable from './UserDesignationTable.vue'
import UserDesignationForm from './UserDesignationForm.vue'

export default {
  components: {
    UserDesignationTable,
    UserDesignationForm
  }
}
</script>
