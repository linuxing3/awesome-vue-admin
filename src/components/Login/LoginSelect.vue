<script>
import { map, pick } from 'lodash/fp'

import Login from '@/models/Login'

export default {
  data () {
    return {
      model: { '_id': 1, label: 'Select Login' }
    }
  },
  created () {
    window.LoginSelect = this
  },
  computed: {
    logins: () => map(pick(['_id', 'text']), Login.all())
  },
  methods: {
    change () {
      this.$emit('Login_CHANGED', this.model._id)
    }
  }
}
</script>
<template>
  <v-select
      :items='logins'
      item-text='text'
      item-value='_id'
      v-model='model._id'
      :label='model.label'
      class='white--text'
      @change='change'
    >
  </v-select>
</template>
