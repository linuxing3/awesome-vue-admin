<template>
  <v-container
      fluid
      grid-list-xl
    >
    <v-layout
        class="mt-3"
        row
        wrap
      >
      <v-flex
          v-show="false"
          xs12
          sm12
          md12
          lg12
        >
        <v-img
            src="nature/n7.jpeg"
            height="280">
        </v-img>
      </v-flex>
      <v-flex
          v-for="(model, index) in models"
          :key="index"
          @click="$router.push({ name: model.entity})"
          xs12
          md4
          sm4
          lg4
        >
        <NameCard
            :imgPath="computeBg10"
            :title=" tryT('entity.' + model.entity) "
            :item="model"
            :subSection="model.entity"
            :color="$vuetify.theme.primary"
          >
        </NameCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { join } from 'path'
import { pickBy, mapKeys } from 'lodash'
import { sections } from '@/api/globals'

import models from '@/models'
import crudMixin from '@/mixins/crudMixin'

export default {
  mixins: [ crudMixin ],
  data () {
    return {
      modelName: 'account',
      show: true,
      cardText: '请查看手册, 了解具体使用方法',
      panel: [true, false],
      sections: [ sections[0] ],
      currentSection: '',
      models
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
    },
    countModels () {
      console.log(Object.keys(this.items).length)
    }
  }
}
</script>
