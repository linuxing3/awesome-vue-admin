<template>
  <DefaultLayout>
    <PlayComponent :modelName='modelName' />
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
}
</script>
