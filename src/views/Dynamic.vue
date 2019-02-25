<template>
  <DefaultLayout>
    <v-layout class="ma-3">
      <v-text-field
          label="model"
          v-model="model"/>
      <v-text-field
          label="type"
          v-model="type"/>
      <keep-living v-if="type === 'form'">
        <component :is="modelForm" />
      </keep-living>
      <keep-living v-if="type === 'table'">
        <component :is="modelTable" />
      </keep-living>
    </v-layout>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'
import { upperFirst } from 'lodash'

@Component({
  components: {
    DefaultLayout
  }
})
export default class Dynamic extends Vue {
  model: 'user'
  type: 'form'

  get modelName () {
    return upperFirst(this.model)
  }

  get modelForm () {
    let fileName = `@components/${this.modelName}/${this.modelName}Form.vue`
    return import(/* webpackChunkName: "dynamic" */ fileName)
  }

  get modelTable () {
    let fileName = `@components/${this.modelName}/${this.modelName}Table.vue`
    return import(/* webpackChunkName: "dynamic" */ fileName)
  }

  created () {
    console.log(`Current model is ${this.modelName}`)
    console.log(`Current model form component is ${this.modelForm}`)
    console.log(`Current model form component is ${this.modelTable}`)
  }
}
</script>
