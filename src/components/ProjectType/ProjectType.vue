<template>
  <ProjectTypeTable>
    <ProjectTypeForm />
  </ProjectTypeTable>
</template>

<script lang="js">
import ProjectTypeTable from './ProjectTypeTable.vue'
import ProjectTypeForm from './ProjectTypeForm.vue'

export default {
  components: {
    ProjectTypeTable,
    ProjectTypeForm
  }
}
</script>
