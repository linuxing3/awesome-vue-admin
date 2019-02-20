<template>
  <DefaultLayout>
    <AccountTable></AccountTable>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import AccountTable from '@/components/Account/AccountTable.vue'

@Component({
  components: {
    DefaultLayout,
    AccountTable
  }
})
export default class Home extends Vue {}
</script>
