<template>
  <DefaultLayout>
    <PlayComponent v-show="false"/>
    <PhotoGallery :items="backgrounds" />
    <PhotoGallery :items="nature" />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue'
import PlayComponent from '@/components/examples/lists/subheadingsAndDividers'
import { publicAssets } from '@/api/globals'

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
