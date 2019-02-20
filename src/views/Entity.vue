<template>
  <DefaultLayout>
    <EntityTable></EntityTable>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import EntityTable from '@/components/Entity/EntityTable.vue'

@Component({
  components: {
    DefaultLayout,
    EntityTable
  }
})
export default class Home extends Vue {}
</script>
