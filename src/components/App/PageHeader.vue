<template>
  <v-layout
      row
      class="align-center layout px-4 pt-4 app--page-header">
    <v-breadcrumbs divider="-">
      <v-breadcrumbs-item
        to="/home">
        <v-icon larg>home</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item
        :to="'/crud/' + subRoute">
        {{subRoute}}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-spacer></v-spacer>
    <div class="page-header-right">
      <v-btn icon>
        <v-icon
            @click="refresh"
            class="text--secondary">refresh</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
export default {
  computed: {
    subRoute: function () {
      return this.$route.params.modelName
    }
  },
  methods: {
    refresh () {
      window.CrudTable.$emit('SET_MODEL', this.subRoute)
    }
  }
}
</script>
