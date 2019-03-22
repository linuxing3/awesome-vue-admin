<template>
  <v-flex>
    <v-chip
        class="ma-2"
        v-for="item in items"
        :key="item"
        @click="select(item)"
        :color="$vuetify.theme.primary"
        outline
        dark
      >
      <span class="pr-3 title font-weight-bold">
        {{ item }}
      </span>
      <v-spacer />
      <v-avatar
          v-if="hasRoute(item)">
        <v-icon :color="$vuetify.theme.primary">edit</v-icon>
      </v-avatar>
    </v-chip>
  </v-flex>
</template>
<script>

export default {
  props: [ 'items' ],
  methods: {
    select (item) {
      if (this.hasRoute(item)) {
        console.log('使用经典导航到你的页面。')
        this.$router.push({ name: item })
      } else {
        console.log('使用crud通用导航到你的页面。')
        window.databaseManager.$emit('SELECT_MODEL', item)
      }
    },
    hasRoute (item) {
      return this.$router.routes.filter(route => route.name === item) !== 0
    }
  }
}
</script>
