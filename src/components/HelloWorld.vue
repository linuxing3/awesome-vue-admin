<template>
  <v-layout>
    <v-flex>{{msg}}</v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {
  @Prop() msg!: string;
}
</script>
