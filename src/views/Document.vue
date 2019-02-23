<template>
  <DefaultLayout>
    <DocumentTable></DocumentTable>
    <DocumentForm></DocumentForm>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import DocumentTable from '@/components/Document/DocumentTable.vue'
import DocumentForm from '@/components/Document/DocumentForm.vue'

@Component({
  components: {
    DefaultLayout,
    DocumentTable,
    DocumentForm
  }
})
export default class Home extends Vue {}
</script>
