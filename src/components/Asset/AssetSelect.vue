<script>
import { map, pick } from 'lodash/fp'

import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  data () {
    return {
      model: {},
      modelName: 'asset'
    }
  },
  mixins: [ crudMixin, exportMixin ],
  created () {
    window.AssetSelect = this
  },
  methods: {
    change () {
      this.$emit('Asset_CHANGED', this.model._id)
    }
  }
}
</script>
<template>
  <v-select
      :items='items'
      item-text='text'
      item-value='_id'
      v-model='model._id'
      :label='model.label'
      class='white--text'
      @change='change'
    >
  </v-select>
</template>
