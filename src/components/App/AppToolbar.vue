<template>
  <v-toolbar
      color="primary"
      fixed
      dark
      app
    >
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
        icon
        @click="$router.push('/home')">
      <v-icon>home</v-icon>
    </v-btn>

    <v-menu
        offset-y
        origin="center center"
        :nudge-bottom="10"
        transition="scale-transition">
      <v-btn
          icon
          large
          flat
          slot="activator">
        <v-icon>perm_identity</v-icon>
      </v-btn>
      <v-list class="pa-0">
        <v-list-tile
            v-for="(item,index) in items"
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            @click="item.click"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="index">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import { toggleFullScreen } from '@/util'
import { join } from 'path'
export default {
  name: 'app-toolbar',
  data: () => ({
    baseUrl: process.env.BASE_URL,
    items: [
      {
        icon: 'settings',
        href: '#',
        title: '个人设置',
        click (e) {
          window.getApp.$emit('APP_ACCOUNTSETTING')
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: '登出',
        click (e) {
          window.getApp.$emit('APP_LOGOUT')
        }
      }
    ]
  }),
  computed: {
    computeAvatar: () => join(process.env.BASE_URL, 'avatar/mf-avatar.svg'),
    toolbarColor: () => this.$vuetify.options.extra.mainNav,
    notificationCount: () => Notification.query().count()
  },
  methods: {
    handleDrawerToggle: () => window.getApp.$emit('APP_DRAWER_TOGGLED')
  }
}
</script>
