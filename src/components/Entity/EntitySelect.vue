<script>
import { map, pick } from 'lodash/fp'
import Entity from '@/models/Entity'
export default {
  data () {
    return {
      model: { _id: 1, label: 'Select Entity' }
    }
  },
  created () {
    window.EntitySelect = this
  },
  computed: {
    entities: () => map(pick(['_id', 'text']), Entity.all())
  },
  methods: {
    change () {
      this.$emit('Entity_CHANGED', this.model._id)
    }
  }
}
</script>
<template>
  <v-select
      :items="entities"
      item-text="text"
      item-value="_id"
      v-model="model._id"
      :label="model.label"
      class="white--text"
      @change="change"
    >
  </v-select>
</template>
