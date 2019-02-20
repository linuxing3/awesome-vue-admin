<script>
import Entity from '@/models/Entity'
import EntityForm from './EntityForm'
import exportMixin from '@/mixins/exportMixin'
export default {
  components: {
    EntityForm
  },
  data () {
    return {
      editing: false
    }
  },
  computed: {
    modelName: () => Entity.entity,
    all: () =>
      Entity.query()
        .withAll()
        .get(),
    headers: () => Entity.fieldsKeys()
  },
  mixins: [exportMixin],
  created () {
    window.EntityIterator = this
  },
  methods: {
    deleteItem (item) {
      Entity.delete(item._id)
    },
    editItem (item) {
      window.EntityForm.$emit('SET_EDITING', item)
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
