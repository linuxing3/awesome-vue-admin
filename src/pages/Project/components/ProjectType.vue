<template>
  <DefaultLayout>
    <ProjectTypeTable>
      <ProjectTypeForm />
    </ProjectTypeTable>
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import ProjectTypeTable from './ProjectTypeTable.vue'
import ProjectTypeForm from './ProjectTypeForm.vue'

export default {
  components: {
    DefaultLayout,
    ProjectTypeTable,
    ProjectTypeForm
  }
}
</script>
