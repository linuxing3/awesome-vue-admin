<template>
  <DefaultLayout>
    <h1>This is a About Page</h1>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src

@Component({
  components: {
    DefaultLayout
  }
})
export default class Home extends Vue {}
</script>
