<template>
  <DefaultLayout>
    <Manual>
      <template #grid="{ models }">
        <v-card
            :key="model"
            v-for="model in models">
          <v-card-text
              class="grey lighten-3">
            <v-avatar
                size="64">
              <v-btn
                  @click="crud(model)"
                  icon>
                <v-icon>{{model.meta.icon || 'star'}}</v-icon>
              </v-btn>
            </v-avatar>
            <h2>{{ $t(model.entity) }}</h2>
          </v-card-text>
        </v-card>
      </template>
      <template #erp="{ models }">
        <v-card
            :key="model"
            v-for="model in models">
          <v-card-text
              class="grey lighten-3">
            <v-avatar
                size="64">
              <v-btn
                  @click="crud(model)"
                  icon>
                <v-icon>{{model.meta.icon || 'star'}}</v-icon>
              </v-btn>
            </v-avatar>
            <h2>{{ $t(model.entity) }}</h2>
          </v-card-text>
        </v-card>
      </template>
    </Manual>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src
import Manual from '@/components/Home/Manual.vue' // @ is an alias to /src

@Component({
  components: {
    DefaultLayout,
    Manual
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
