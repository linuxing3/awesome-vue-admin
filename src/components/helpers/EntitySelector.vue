<template>
  <v-container
      id="dropdown-example"
      grid-list-xl>
    <v-layout
        row
        wrap>
      <v-flex
          xs12
          sm4>
        <v-overflow-btn
            :items="entities"
            item-value="entityName"
            @change="handleChange(entityName)"
            label="Entities"
            target="#dropdown-example"
          ></v-overflow-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      // entityName: ''
    }
  },
  methods: {
    handleChange (entityName) {
      this.currentEntity = entityName
      window.CrudTable.$forceUpdate()
    }
  }
}
</script>