<template>
  <DefaultLayout>
    <ProjectTaskTable>
      <ProjectTaskForm />
    </ProjectTaskTable>
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import ProjectTaskTable from './ProjectTaskTable.vue'
import ProjectTaskForm from './ProjectTaskForm.vue'

export default {
  components: {
    DefaultLayout,
    ProjectTaskTable,
    ProjectTaskForm
  }
}
</script>
