<template>
  <v-navigation-drawer
      id="appDrawer"
      :mini-variant.sync="mini"
      fixed
      :dark="$vuetify.dark"
      app
      v-model="drawer"
      width="260"
    >
    <v-toolbar
        :color="$vuetify.theme.primary"
        dark>
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">综合管理系统</span>
      </v-toolbar-title>
    </v-toolbar>
    <div
        class="drawer-menu--scroll"
        :settings="scrollSettings">
      <v-list
          dense
          expand>
        <template v-for="(item, i) in menus">
          <!--group with subitems-->
          <v-list-group
              v-if="item.items"
              :key="item.name"
              :group="item.group"
              :prepend-icon="item.icon"
              no-action="no-action">
            <v-list-tile
                slot="activator"
                ripple="ripple">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="(subItem, i) in item.items">
              <!--sub group-->
              <v-list-group
                  v-if="subItem.items"
                  :key="subItem.name"
                  :group="subItem.group"
                  sub-group="sub-group">
                <v-list-tile
                    slot="activator"
                    ripple="ripple">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                    v-for="(grand, i) in subItem.children"
                    :key="i"
                    @click="goCrudBluePrint(grand.name)"
                    ripple="ripple">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
              <!--child item-->
              <v-list-tile
                  v-else
                  :key="i"
                  @click="goCrudBluePrint(subItem.name)"
                  ripple="ripple">
                <v-list-tile-content>
                  <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>
                </v-list-tile-content>
                <!-- <v-circle class="white--text pa-0 circle-pill" v-if="subItem.badge" color="red" disabled="disabled">{{ subItem.badge }}</v-circle> -->
                <v-list-tile-action v-if="subItem.action">
                  <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list-group>
          <v-subheader
              v-else-if="item.header"
              :key="i">{{ item.header }}</v-subheader>
          <v-divider
              v-else-if="item.divider"
              :key="i"></v-divider>

          <!--top-level link with crud -->
          <v-list-tile
              v-else-if="item.type === 'crud'"
              @click="crud({ blueprint: item.name })"
              rel="noopener"
              :key="item.name">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <!-- top level link without crud -->
          <v-list-tile
              v-else-if="item.href !== undefined "
              :href="item.href"
              :target="item.target"
              rel="noopener"
              :key="item.name">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
              v-else
              @click="$router.push({ name: item.name })"
              rel="noopener"
              :key="item.name">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>
<script>
import menu from '@/api/menu'
import { join } from 'path'

export default {
  name: 'app-drawer',
  props: {
    expanded: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    mini: false,
    drawer: true,
    menus: menu,
    scrollSettings: {
      maxScrollbarLength: 160
    }
  }),
  computed: {
    computeGroupActive: () => true,
    computeLogo: () => join(process.env.BASE_URL, 'icon/google.png'),
    sideToolbarColor: () => this.$vuetify.options.extra.sideNav
  },
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = !this.drawer
    })
  },

  methods: {
    genChildTarget (item, subItem) {
      if (subItem.href) return
      if (subItem.component) {
        return {
          name: subItem.component
        }
      }
      return { name: `${item.group}/${subItem.name}` }
    }
  }
}
</script>

<style>
#appDrawer {
  overflow: hidden;
}
#appDrawer.drawer-menu--scroll {
  height: calc(100vh - 48px);
  overflow: auto;
}
</style>
