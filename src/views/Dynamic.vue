<template>
  <DefaultLayout>
    <v-layout class="ma-3">
      <v-chip>{{componentName}}</v-chip>
      <v-chip>{{fileName}}</v-chip>
      <v-text-field
          label="model"
          v-model="model"/>
      <v-text-field
          label="type"
          v-model="type"/>
      <keep-alive>
        <component :is="componentName" />
      </keep-alive>
    </v-layout>
  </DefaultLayout>
</template>

<script lang="ts">
// FIXME 使用inject时，导致编译失败，原因不明
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'
import { upperFirst, camelCase } from 'lodash'

@Component({
  components: {
    DefaultLayout
  }
})
export default class Dynamic extends Vue {
  model: string = 'user'
  type: string = 'form'

  get modelName () {
    return upperFirst(this.model)
  }

  get componentName () {
    let name = upperFirst(this.model)
    let type = upperFirst(this.type)
    let componentName = `${name}${type}`
    return componentName
  }

  get fileName () {
    let name = upperFirst(this.model)
    let type = upperFirst(this.type)
    let fileName = `@/components/${name}/${name}${type}.vue`
    return fileName
  }

  beforeCreate () {}
}
</script>
