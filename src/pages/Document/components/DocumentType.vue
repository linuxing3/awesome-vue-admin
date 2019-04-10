<template>
  <DocumentTypeTable>
    <DocumentTypeForm />
  </DocumentTypeTable>
</template>

<script lang="js">
import DocumentTypeTable from './DocumentTypeTable.vue'
import DocumentTypeForm from './DocumentTypeForm.vue'

export default {
  components: {
    DocumentTypeTable,
    DocumentTypeForm
  }
}
</script>
