<template>
  <DefaultLayout>
    <CrudForm
        :modelName=" $route.params.blueprint || 'user' ">
      <!-- slot for export dialog -->
      <template v-slot:export="{ modelName, items }">
        <ExportDialog
            :modelName="modelName"
            :items="items" />
      </template>
      <!-- slot for import dialog -->
      <template v-slot:import="{ modelName }">
        <ImportDialog
            class="pr-5 mr-5"
            :modelName="modelName" />
      </template>
      <!-- slot for date pick dialog -->
      <template v-slot:datedialog="{ field, editedItem }">
        <DatePicker
            class="pr-5 mr-5"
            :editedItem="editedItem"
            :field="field" />
      </template>
    </CrudForm>
  </DefaultLayout>
</template>

<script>
import CrudForm from '@/components/helpers/CrudForm.vue'
import DefaultLayout from '@/layout/default.vue'

export default {
  components: {
    DefaultLayout,
    CrudForm
  }
}
</script>
