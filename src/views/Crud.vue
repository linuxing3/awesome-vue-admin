<template>
  <DefaultLayout>
    <CrudTable>
      <template v-slot:export="{ modelName, items }">
        <ExportDialog :modelName="modelName" :items="items" />
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
