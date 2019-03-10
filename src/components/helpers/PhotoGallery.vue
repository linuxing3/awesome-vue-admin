<template>
  <v-carousel
      class="mt-3"
    >
    <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        @click="selectPhoto(item)"
      ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: [ 'items' ],
  methods: {
    selectPhoto (item) {
      this.$emit('select-photo', item)
      window.LoginForm.$emit('select-photo', item)
    }
  }
}
</script>
