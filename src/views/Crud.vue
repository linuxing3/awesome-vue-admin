<template>
  <DefaultLayout>
    <CrudTable :modelName=" $route.params.blueprint || user ">
      <template v-slot:export="{ modelName, items }">
        <ExportDialog :modelName="modelName" :items="items" />
        <ImportDialog :modelName="modelName" />
      </template>
    </CrudTable>
  </DefaultLayout>
</template>

<script>
import CrudTable from '@/components/helpers/CrudTable.vue'
import DefaultLayout from '@/layout/default.vue'

export default {
  components: {
    DefaultLayout,
    CrudTable
  }
}
</script>
