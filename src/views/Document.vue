<template>
  <DefaultLayout>
    <DocumentTable></DocumentTable>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import DocumentTable from '@/components/Document/DocumentTable.vue'

@Component({
  components: {
    DefaultLayout,
    DocumentTable
  }
})
export default class Home extends Vue {}
</script>
