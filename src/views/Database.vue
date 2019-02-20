<template>
  <DefaultLayout>
    <DatabaseManager></DatabaseManager>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import DatabaseManager from '@/components/Database/DatabaseManager.vue'

@Component({
  components: {
    DefaultLayout,
    DatabaseManager
  }
})
export default class Home extends Vue {}
</script>
