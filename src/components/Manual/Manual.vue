<template>
  <div id="pageCard">
    <v-container
        grid-list-xl
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
            <v-card-title class="pb-0">
              <router-link
                class="white--text"
                :to="'/' + item.name">
                <h2>{{ $t(item.name) || capitalize }}</h2>
              </router-link>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-btn
                @click="go(item)"
                icon>
                <v-icon>{{item.icon}}</v-icon>
              </v-btn>
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
import items from '@/api/menu'

export default {
  data () {
    return {
      show: true,
      cardText: '请查看手册, 了解具体使用方法',
      items: items
    }
  },
  computed: {
    computeBg1: () => join(process.env.BASE_URL, 'bg/1.jpg'),
    computeBg2: () => join(process.env.BASE_URL, 'bg/2.jpg'),
    computeBg3: () => join(process.env.BASE_URL, 'bg/3.jpg'),
    computeBg4: () => join(process.env.BASE_URL, 'bg/4.jpg'),
    computeBg5: () => join(process.env.BASE_URL, 'bg/5.jpg'),
    computeBg6: () => join(process.env.BASE_URL, 'bg/6.jpg'),
    computeBg10: () => join(process.env.BASE_URL, 'bg/10.jpg'),
    computeAvatarMan4: () => join(process.env.BASE_URL, 'avatar/man_4.jpg')
  },
  methods: {
    go(menuItem) {
      this.$router.push({name: menuItem.name})
    }
  }
}
</script>
<style lang="stylus" scoped>
  .mt-45
    margin-top: -45px
  .mt-56
    margin-top: -56px
</style>
