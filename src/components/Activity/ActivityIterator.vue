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
    window.ActivityIterator = this
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
    <h3 class="heading pa-3">{{modelName}}</h3>
    <v-data-iterator
        :items="all"
        row
        wrap
      >
      <v-flex
          slot="item"
          slot-scope="props"
        >
        <v-card
            class="indigo lighten-1"
          >
          <v-card-text>
            <h4 class="white--text pa-1">
              {{ props.item.name }}
            </h4>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </div>
</template>
