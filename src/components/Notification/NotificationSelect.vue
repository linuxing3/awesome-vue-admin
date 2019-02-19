<script>
import { map, pick } from 'lodash/fp'
import Notification from '@/models/Notification'
export default {
  data() {
    return {
      model: { _id: 1, label: 'Select Notification' }
    }
  },
  created() {
    window.NotificationSelect = this
  },
  computed: {
    notifications: () => map(pick(['_id', 'text']), Notification.all())
  },
  methods: {
    change() {
      this.$emit('Notification_CHANGED', this.model._id)
    }
  }
}
</script>
<template>
  <v-select
      :items="notifications"
      item-text="text"
      item-value="_id"
      v-model="model._id"
      :label="model.label"
      class="white--text"
      @change="change"
    >
  </v-select>
</template>
