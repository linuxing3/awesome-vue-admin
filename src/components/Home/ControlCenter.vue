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
        <div
          class="headline"
          @click="currentSection = section"
          slot="header">
          {{ section }}
        </div>
        <v-container
          fluid
          grid-list-xl
        >
        <v-layout
            row
            wrap
        >
          <v-flex
            v-for="(item, index) in items"
            :key="index"
            @click="crud(item)"
            xs12
            md3
            sm3
            lg2
            >
            <NameCard
              :imgPath="computeBg10"
              :title="item.entity"
              :item="item"
              :subSection="item.meta.modelName"
              :color="$vuetify.theme.primary"
              >
            </NameCard>
          </v-flex>
      </v-layout>
    </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import { join } from 'path'
import { pickBy, mapKeys } from 'lodash'
import { sections } from '@/api/globals'

import models from '@/models'

export default {
  data () {
    return {
      show: true,
      cardText: '请查看手册, 了解具体使用方法',
      panel: [true, false],
      sections: [ sections[0] ],
      currentSection: '',
      items: {}
    }
  },
  watch: {
    currentSection: {
      handler: function (val) {
        this.genSectionModels(val)
      },
      immediate: true
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
    computeAvatarMan4: () => 'avatar/man_4.jpg'
  },
  created () {},
  methods: {
    genSectionModels (section) {
      this.items = pickBy(models, model => {
        return model.meta.section === section
      })
      console.log(Object.keys(this.items).length)
    }
  }
}
</script>
