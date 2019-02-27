<template>
  <DefaultLayout>
    <v-text-field
        class="ma-3"
        @keyup="handleChange"
        v-model='modelName' />
    <PlayComponent
        ref="crud-form"
        :modelName='modelName' />
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import PlayComponent from '@/components/helpers/CrudForm.vue'

@Component({
  components: {
    DefaultLayout,
    PlayComponent
  }
})
export default class Play extends Vue {
  modelName = 'user'

  handleChange () {
    (window as any).CrudForm.$forceUpdate()
  }
}
</script>
