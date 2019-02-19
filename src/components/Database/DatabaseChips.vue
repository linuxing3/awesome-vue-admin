<template>
  <v-flex>
    <v-chip
        v-for="item in entities"
        :key="item"
        @click="select(item)"
        :color="selectedColor"
        outline
        close
    >{{ item }}</v-chip>
  </v-flex>
</template>
<script>
import { entities } from '@/api/globals'
export default {
  data() {
    return {
      entities: [],
      selectedColor: 'primary'
    }
  },
  methods: {
    select(item) {
      window.dbApp.$emit('SELECT_MODEL', item)
    }
  },
  created() {
    this.entities = entities
  }
}
</script>
