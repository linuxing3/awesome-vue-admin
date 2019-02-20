<script>
import { map, pick } from 'lodash/fp'
import Resummee from '@/models/Resummee'
export default {
  data () {
    return {
      model: { _id: 1, label: 'Select Resummee' }
    }
  },
  created () {
    window.ResummeeSelect = this
  },
  computed: {
    resummees: () => map(pick(['_id', 'text']), Resummee.all())
  },
  methods: {
    change () {
      this.$emit('Resummee_CHANGED', this.model._id)
    }
  }
}
</script>
<template>
  <v-select
      :items="resummees"
      item-text="text"
      item-value="_id"
      v-model="model._id"
      :label="model.label"
      class="white--text"
      @change="change"
    >
  </v-select>
</template>
