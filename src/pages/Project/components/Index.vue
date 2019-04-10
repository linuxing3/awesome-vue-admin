<template>
  <ProjectTable>
    <ProjectForm />
  </ProjectTable>
</template>

<script lang="js">
import ProjectTable from './ProjectTable.vue'
import ProjectForm from './ProjectForm.vue'

export default {
  components: {
    ProjectTable,
    ProjectForm
  }
}
</script>
