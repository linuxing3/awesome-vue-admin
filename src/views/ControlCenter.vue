<template>
  <DefaultLayout>
    <ControlCenter>
      <template #grid="{ models }">
        <v-layout
            row
            wrap>
          <v-flex
              :key="model"
              v-for="model in models"
              xs12
              sm4
              md4
              lg4>
            <v-card>
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
                <h2>{{ model.entity }}</h2>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
      <template #erp="{ models }">
        <v-layout
            row
            wrap>
          <v-flex
              :key="model"
              v-for="model in models"
              xs12
              sm4
              md4
              lg4>
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
                <h2>{{ model.entity }}</h2>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </ControlCenter>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src
import ControlCenter from '@/components/Home/ControlCenter.vue' // @ is an alias to /src

export default {
  components: {
    DefaultLayout,
    ControlCenter
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.$store.dispatch('entities/database/init')
    }
  }
}
</script>
