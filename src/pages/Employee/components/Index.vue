<template>
  <EmployeeTable>
    <EmployeeForm />
  </EmployeeTable>
</template>

<script lang="js">
import EmployeeTable from './EmployeeTable.vue'
import EmployeeForm from './EmployeeForm.vue'

export default {
  components: {
    EmployeeTable,
    EmployeeForm
  }
}
</script>
