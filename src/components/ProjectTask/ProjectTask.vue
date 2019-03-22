<template>
  <ProjectTaskTable>
    <ProjectTaskForm />
  </ProjectTaskTable>
</template>

<script lang="js">
import ProjectTaskTable from './ProjectTaskTable.vue'
import ProjectTaskForm from './ProjectTaskForm.vue'

export default {
  components: {
    ProjectTaskTable,
    ProjectTaskForm
  }
}
</script>
