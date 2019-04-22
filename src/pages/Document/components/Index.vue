<template>
  <DocumentTable>
    <DocumentForm />
  </DocumentTable>
  <!-- <div>
    <DocumentTableAntd />
  </div> -->
</template>

<script lang="js">
import DocumentTable from './DocumentTable.vue'
// import DocumentTableAntd from './DocumentTable.antd.vue'
import DocumentForm from './DocumentForm.vue'

export default {
  components: {
    DocumentTable,
    // DocumentTableAntd,
    DocumentForm
  }
}
</script>
