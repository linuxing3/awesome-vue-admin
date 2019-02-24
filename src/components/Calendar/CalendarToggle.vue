<template>
  <v-card
      class="hide-overflow ma-5"
      height="700"
    >
    <slot
        name="project"
        v-if="activeBtn === 0"></slot>
    <slot
        name="weekly"
        v-if="activeBtn === 1"></slot>
    <slot
        name="list"
        v-if="activeBtn === 2"></slot>
    <v-bottom-nav
        :active.sync="activeBtn"
        :value="showNav"
        absolute
        color="transparent"
      >
      <v-btn
          flat
          color="teal">
        <span>项目</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn
          flat
          color="teal">
        <span>周历</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn
          flat
          color="teal">
        <span>任务清单</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      activeBtn: 0,
      showNav: true
    }
  }
}
</script>
