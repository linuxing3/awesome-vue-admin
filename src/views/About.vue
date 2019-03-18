<template>
  <DefaultLayout>
    <Home />
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src
import Home from '@/components/Home/Home.vue' // @ is an alias to /src

@Component({
  components: {
    DefaultLayout,
    Home
  }
})
export default class About extends Vue {}
</script>
