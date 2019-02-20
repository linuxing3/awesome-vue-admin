<template>
  <DefaultLayout>
    <EvaluationTable></EvaluationTable>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import EvaluationTable from '@/components/Evaluation/EvaluationTable.vue'

@Component({
  components: {
    DefaultLayout,
    EvaluationTable
  }
})
export default class Home extends Vue {}
</script>
