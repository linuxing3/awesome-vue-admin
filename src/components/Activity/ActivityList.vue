<script>
import Activity from '@/models/Activity'
import ActivityForm from './ActivityForm'
import exportMixin from '@/mixins/exportMixin'
export default {
  components: {
    ActivityForm
  },
  data() {
    return {
      editing: false
    }
  },
  computed: {
    modelName: () => Activity.entity,
    all: () =>
      Activity.query()
        .withAll()
        .get(),
    headers: () => Activity.fieldsKeys()
  },
  mixins: [exportMixin],
  created() {
    window.ActivityList = this
  },
  methods: {
    deleteItem(item) {
      Activity.delete(item._id)
    },
    editItem(item) {
      window.ActivityForm.$emit('SET_EDITING', item)
    }
  }
}
</script>

<template>
  <div>
    <h3 class="heading pa-3">{{ modelName }}</h3>
    <v-list
        dense
        expand
      >
      <v-list-group
          v-for="(item, i) in all"
          :key="i"
          :group="i"
          prepend-icon=""
          no-action="no-action"
        >
        <v-list-tile
            slot="activator"
            ripple="ripple"
          >
          <v-list-tile-content>
            <h4 class="white--text pa-1">
              {{ item.name }}
            </h4>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </div>
</template>
