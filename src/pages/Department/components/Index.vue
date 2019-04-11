<template>
  <DepartmentTable>
    <DepartmentForm />
  </DepartmentTable>
</template>

<script lang="js">
import DepartmentTable from './DepartmentTable.vue'
import DepartmentForm from './DepartmentForm.vue'

export default {
  components: {
    DepartmentTable,
    DepartmentForm
  }
}
</script>
