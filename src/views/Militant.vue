<template>
  <DefaultLayout>
    <MilitantTable></MilitantTable>
    <MilitantForm></MilitantForm>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import MilitantTable from '@/components/Militant/MilitantTable.vue'
import MilitantForm from '@/components/Militant/MilitantForm.vue'

@Component({
  components: {
    DefaultLayout,
    MilitantTable,
    MilitantForm
  }
})
export default class Home extends Vue {}
</script>
