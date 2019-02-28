<template>
  <div id="pageCard">
    <v-container
        grid-list-lg
        fluid>
      <v-layout
          row
          wrap>
        <v-flex sm12>
          <h1>开始使用</h1>
        </v-flex>
        <v-flex
            v-for="(item,index) in items"
            :key="index"
            lg2
            md4
            sm12>
          <v-card
              v-if="item.type === 'crud'"
              :color="item.color || 'indigo'"
              dark>
            <v-card-title
                class="pt-5 pb-5 justify-content-center"
              >
              <v-avatar
                  size="64">
                <v-btn
                    width="64px"
                    height="64px"
                    @click="crud(item)"
                    icon>
                  <v-icon>{{item.icon}}</v-icon>
                </v-btn>
              </v-avatar>
              <h2>{{ $t('entity.'+ item.name) }}</h2>
            </v-card-title>
          </v-card>
          <v-card
              v-else
              :color="item.color || 'indigo'"
              dark>
            <v-card-title
                class="pt-5 pb-5 justify-content-center"
              >
              <v-avatar
                  size="64">
                <v-btn
                    width="64px"
                    height="64px"
                    @click="$router.push({ name: item.name })"
                    icon>
                  <v-icon>{{item.icon}}</v-icon>
                </v-btn>
              </v-avatar>
              <h2>{{ $t('entity.'+ item.name) }}</h2>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { join } from 'path'
import { menuItems } from '@/api/menu'

export default {
  data () {
    return {
      show: true,
      cardText: '请查看手册, 了解具体使用方法',
      items: menuItems
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
  methods: {
    crud (menuItem) {
      let modelName = menuItem.name
      this.$router.push({
        name: 'crud',
        modelName
      })
      setTimeout(() => {
        window.CrudTable.$emit('SET_MODEL', modelName)
      }, 1000);
    }
  }
}
</script>
