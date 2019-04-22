<template>
  <a-button
      type="primary"
      icon="search">{{ name }}</a-button>
</template>

<script lang="ts">
import Vue from 'vue'
import { Button } from 'ant-design-vue' // <-- add this

export default Vue.extend({
  components: { Button }, // <-- and this
  props: ['name']
})
</script>
