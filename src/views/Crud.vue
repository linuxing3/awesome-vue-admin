<template>
  <DefaultLayout>
    <CrudTable>
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
