<template>
  <DefaultLayout>
    <Manual />
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src
import Manual from '@/components/Home/Manual.vue' // @ is an alias to /src

@Component({
  components: {
    DefaultLayout,
    Manual
  }
})
export default class About extends Vue {}
</script>
