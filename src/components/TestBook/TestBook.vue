<template>
  <TestBookTable>
    <TestBookForm />
  </TestBookTable>
</template>

<script lang="js">
import TestBookTable from './TestBookTable.vue'
import TestBookForm from './TestBookForm.vue'

export default {
  components: {
    TestBookTable,
    TestBookForm
  }
}
</script>
