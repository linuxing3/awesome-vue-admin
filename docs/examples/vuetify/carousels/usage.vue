<template>
  <v-carousel
      class="mt-5"
    >
    <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          src: 'bg/1.jpg'
        },
        {
          src: 'bg/2.jpg'
        },
        {
          src: 'bg/3.jpg'
        },
        {
          src: 'bg/4.jpg'
        },
        {
          src: 'bg/5.jpg'
        },
        {
          src: 'bg/6.jpg'
        },
        {
          src: 'bg/7.jpg'
        },
        {
          src: 'bg/8.jpg'
        },
        {
          src: 'bg/9.jpg'
        }
      ]
    }
  }
}
</script>
