<script>
import Activity from '@/models/Activity'
import ActivityForm from './ActivityForm'

import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin'

export default {
  components: {
    ActivityForm
  },
  data() {
    return {
      editing: false,
      modelName: 'activity'
    }
  },
  mixins: [exportMixin, crudMixin],
  created() {
    window.ActivityTimeline = this
  },
  methods: {
    editItem(item) {
      this.$emit('SET_EDITING', item)
      window.ActivityForm.$emit('SET_EDITING', item)
    }
  }
}
</script>

<template>
  <v-card
      class="mt-45"
    >
    <v-card-text>
      <v-timeline>
        <v-timeline-item
            v-for="(item, i) in all"
            color="primary"
            icon="star"
            :key="i"
            fill-dot
          >
          <span
              :class="`headline font-weight-bold blue--text`"
              v-text="item.occurenceDate"
          ></span>
          <v-card
              color="indigo"
              dark
            >
            <v-card-title class="title">
              {{ item.applicant }}
            </v-card-title>
            <v-card-text class="white text--primary">
              {{ item.content }}
              <v-spacer></v-spacer>
              <v-btn
                  icon
                  class="mx-0"
                  @click="editItem(item);">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn
                  icon
                  @click="deleteItem(item)">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
    <v-card-actions>
      <ActivityForm></ActivityForm>
    </v-card-actions>
  </v-card>
</template>

<style lang="stylus" scoped>
  .mt-45
    margin-left: 45px
    margin-right: 45px
</style>
