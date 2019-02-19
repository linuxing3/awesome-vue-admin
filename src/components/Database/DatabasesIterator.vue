<template>
  <div>
    <v-data-iterator
        :items="entities"
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
              {{ props.item }}
            </h4>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </div>
</template>
<script>
import { entities } from '@/api/globals'
export default {
  data() {
    return {
      entities: []
    }
  },
  created() {
    this.entities = entities
  }
}
</script>
