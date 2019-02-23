<template>
  <DefaultLayout>
    <AssetTable></AssetTable>
    <AssetForm></AssetForm>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import AssetTable from '@/components/Asset/AssetTable.vue'
import AssetForm from '@/components/Asset/AssetForm.vue'

@Component({
  components: {
    DefaultLayout,
    AssetTable,
    AssetForm
  }
})
export default class Asset extends Vue {}
</script>
