<template>
  <VehicleTable>
    <VehicleForm />
  </VehicleTable>
</template>

<script lang="js">
import VehicleTable from './VehicleTable.vue'
import VehicleForm from './VehicleForm.vue'

export default {
  components: {
    VehicleTable,
    VehicleForm
  }
}
</script>
