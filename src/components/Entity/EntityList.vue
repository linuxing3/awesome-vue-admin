<script>
import Entity from '@/models/Entity'
import EntityForm from './EntityForm'
import exportMixin from '@/mixins/exportMixin'
export default {
  components: {
    EntityForm
  },
  data() {
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
  created() {
    window.EntityList = this
  },
  methods: {
    deleteItem(item) {
      Entity.delete(item._id)
    },
    editItem(item) {
      window.EntityForm.$emit('SET_EDITING', item)
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
          group="group"
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
