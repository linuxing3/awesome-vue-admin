<template>
  <UserMilitantTable>
    <UserMilitantForm />
  </UserMilitantTable>
</template>

<script lang="js">
import UserMilitantTable from './UserMilitantTable.vue'
import UserMilitantForm from './UserMilitantForm.vue'

export default {
  components: {
    UserMilitantTable,
    UserMilitantForm
  }
}
</script>
