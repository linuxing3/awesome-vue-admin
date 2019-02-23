<template>
  <DefaultLayout>
    <ArchiveTable></ArchiveTable>
    <ArchiveForm></ArchiveForm>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import ArchiveTable from '@/components/Archive/ArchiveTable.vue'
import ArchiveForm from '@/components/Archive/ArchiveForm.vue'

@Component({
  components: {
    DefaultLayout,
    ArchiveTable,
    ArchiveForm
  }
})
export default class Archive extends Vue {}
</script>
