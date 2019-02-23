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
            lg4
            md4
            sm12>
          <v-card
              :color="item.color || 'indigo'"
              dark>
            <v-card-title>
              <v-btn
                  @click="go(item)"
                  icon>
                <v-icon>{{item.icon}}</v-icon>
              </v-btn>
              <router-link
                  class="white--text"
                  :to="'/' + item.name">
                <h2>{{ $t('entity.'+ item.name) }}</h2>
              </router-link>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  @click="go(item)"
                  flat
                  small>开始使用</v-btn>
            </v-card-actions>
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
    go (menuItem) {
      this.$router.push({ name: menuItem.name })
    }
  }
}
</script>
