<template>
  <DefaultLayout>
    <PlayComponent v-show="true"/>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue'
import { publicAssets } from '@/api/globals'
import PlayComponent from '@/components/helpers/CrudX.vue'

const { backgrounds, avatars, nature } = publicAssets

export default {
  components: {
    DefaultLayout,
    PlayComponent
  },
  data () {
    return {
      backgrounds,
      avatars,
      nature
    }
  }
}
</script>
