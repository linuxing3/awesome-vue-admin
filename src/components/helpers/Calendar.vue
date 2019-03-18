<template>
  <div>Calendar</div>
</template>

<script>
export default {
  data () {
    return {
      calendar: 'calendar'
    }
  },
  watch: {
    calendar: {
      handler (newValue) {
        this.handler(newValue)
      },
      immediate: true
    }
  },
  mixins: [],
  created () {
  },
  methods: {
    handler (item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>
</style>
