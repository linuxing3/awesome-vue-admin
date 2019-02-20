<template>
  <DefaultLayout>
    <MilitantTable></MilitantTable>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import MilitantTable from '@/components/Militant/MilitantTable.vue'

@Component({
  components: {
    DefaultLayout,
    MilitantTable
  }
})
export default class Home extends Vue {}
</script>
