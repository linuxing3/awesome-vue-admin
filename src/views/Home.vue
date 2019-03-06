<template>
  <DefaultLayout>
    <ControlCenter>
    </ControlCenter>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src
import ControlCenter from '@/components/Home/ControlCenter.vue' // @ is an alias to /src

@Component({
  components: {
    DefaultLayout,
    ControlCenter
  }
})
export default class Home extends Vue {
  created () {
    this.initialize()
  }

  initialize () {
    // Try to persist app settings
    // this.$store.commit('entities/app/init')
    // Try to persist database names
    this.$store.dispatch('entities/database/init')
  }
}
</script>
