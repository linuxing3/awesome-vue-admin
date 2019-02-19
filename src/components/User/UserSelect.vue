<script>
import { map, pick } from 'lodash/fp'

import User from '@/User'

export default {
  data () {
    return {
      model: { '_id': 1, label: 'Select User' }
    }
  },
  created () {
    window.UserSelect = this
  },
  computed: {
    users: () => map(pick(['_id', 'text']), User.all())
  },
  methods: {
    change () {
      this.$emit('User_CHANGED', this.model._id)
    }
  }
}
</script>
<template>
  <v-select
      :items='users'
      item-text='text'
      item-value='_id'
      v-model='model._id'
      :label='model.label'
      class='white--text'
      @change='change'
    >
  </v-select>
</template>
