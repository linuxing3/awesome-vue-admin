<template>
  <v-flex>
    <v-chip
        v-for="item in items"
        :key="item"
        @click="select(item)"
        :color="$vuetify.theme.primary"
        dark
      >{{ item }}</v-chip>
  </v-flex>
</template>
<script>

export default {
  props: [ 'items'],
  methods: {
    select (item) {
      window.databaseManager.$emit('SELECT_MODEL', item)
    }
  }
}
</script>
