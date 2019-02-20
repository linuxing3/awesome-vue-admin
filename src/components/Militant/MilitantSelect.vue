<script>
import { map, pick } from 'lodash/fp'
import Militant from '@/models/Militant'
export default {
  data () {
    return {
      model: { _id: 1, label: 'Select Militant' }
    }
  },
  created () {
    window.MilitantSelect = this
  },
  computed: {
    militants: () => map(pick(['_id', 'text']), Militant.all())
  },
  methods: {
    change () {
      this.$emit('Militant_CHANGED', this.model._id)
    }
  }
}
</script>
<template>
  <v-select
      :items="militants"
      item-text="text"
      item-value="_id"
      v-model="model._id"
      :label="model.label"
      class="white--text"
      @change="change"
    >
  </v-select>
</template>
