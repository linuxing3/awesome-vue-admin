<template>
  <DefaultLayout>
    <UserTable></UserTable>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import UserTable from '@/components/User/UserTable.vue'

@Component({
  components: {
    DefaultLayout,
    UserTable
  }
})
export default class Home extends Vue {}
</script>
