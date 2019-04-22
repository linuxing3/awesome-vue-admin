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
          v-for="(model, index) in coreModels"
          :key="index"
          @click="$router.push({ name: model.entity})"
          xs12
          md3
          sm3
          lg3
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

const coreModels = pickBy(models, model => {
  return model.meta.section === 'core'
})

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
      coreModels
    }
  },
  computed: {
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
