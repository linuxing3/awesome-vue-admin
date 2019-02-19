<script>
import Notification from '@/models/Notification'
export default {
  data() {
    return {
      editing: false,
      model: {}
    }
  },
  created() {
    this.model = new Notification()
    this.$on('SET_EDITING', item => {
      this.editing = true
      this.model = item
    })
    window.NotificationForm = this
  },
  computed: {
    fields: () => Notification.fieldsKeys()
  },
  methods: {
    reset() {
      this.editing = false
      this.model = new Notification()
    },
    saveItem() {
      if (!this.editing) {
        Notification.insert({
          data: this.model
        })
        this.model = new Notification()
      } else {
        Notification.update(this.model)
        this.editing = false
        this.model = new Notification()
      }
    }
  }
}
</script>

<template>
  <v-card>
    <v-toolbar
        color="primary"
        dark="">
      <v-toolbar-title class="headline">
        输入新消息
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-layout wrap>
          <v-flex
              v-for="field in fields"
              :key="field"
              lg12
              sm12>
            <v-text-field
                v-model="model[field]"
                :name="field"
                :label=" $t !== undefined ? $t(field) : field">
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions class="pb-3">
      <v-spacer></v-spacer>
      <v-btn
          :color="editing ? 'warning' : 'primary'"
          @click="saveItem">{{editing ? "更新": "添加"}}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style lang="scss" module>
</style>
