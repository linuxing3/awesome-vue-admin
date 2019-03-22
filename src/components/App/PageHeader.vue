<template>
  <v-layout
      row
      class="align-center layout px-2 pt-2 app--page-header">
    <v-breadcrumbs divider="-">
      <v-breadcrumbs-item
          to="/home">
        <v-icon
            :color="$vuetify.theme.primary"
            dark
            fab>
          home
        </v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item
          :to="'/' + $route.name">
        <h1 class="title text-capitalize font-weight-light">
          {{$route.name}}
        </h1>
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
  created () {
    window.PageHeader = this
  },
  computed: {
    subRoute: function () {
      return this.$route.params.blueprint || this.$route.name
    }
  },
  methods: {
    refresh () {
      window.CrudTable.$emit('SET_MODEL', this.subRoute)
    }
  }
}
</script>
