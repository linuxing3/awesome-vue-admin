<template>
  <div id="pageCard">
    <v-expansion-panel
        v-model="panel"
        expand
      >
      <v-expansion-panel-content
          v-for="(section, i) in sections"
          :key="i"
        >
        <div slot="header">{{ section }}</div>
        <v-card
          :key="model"
          v-for="model in models">
          <v-card-text v-if="model.meta.groups.section === section"
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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import { join } from 'path'

import models from '@/models'
import { mayKeys } from 'lodash'

export default {
  data () {
    return {
      show: true,
      cardText: '请查看手册, 了解具体使用方法',
      models,
      panel: [true, false],
      sections: [
        'core',
        'hr',
        'accounts',
        'assets',
        'buying',
        'education',
        'healthcare',
        'maintenance',
        'projects',
        'quality_management',
        'selling',
        'shopping_cart',
        'stock'
      ]
    }
  },
  computed: {
    computeBg1: () => 'bg/1.jpg',
    computeBg2: () => 'bg/2.jpg',
    computeBg3: () => 'bg/3.jpg',
    computeBg4: () => 'bg/4.jpg',
    computeBg5: () => 'bg/5.jpg',
    computeBg6: () => 'bg/6.jpg',
    computeBg10: () => 'bg/10.jpg',
    computeAvatarMan4: () => 'avatar/man_4.jpg',
    belongsToSection: function(section, model) {
      return section === model.meta.groups.section
    }
  },
  methods: {}
}
</script>
