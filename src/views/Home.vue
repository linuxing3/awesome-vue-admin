<template>
  <DefaultLayout>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Component({
  components: {
    DefaultLayout,
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
