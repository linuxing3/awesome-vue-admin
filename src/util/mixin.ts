// import Vue from 'vue'
import { deviceEnquire, DEVICE_TYPE } from '@/util/device'
import { mapState } from 'vuex'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods
const mixin = {
  computed: {
    ...mapState({
      layoutMode: (state: any) => state.app.layout,
      navTheme: (state: any) => state.app.theme,
      primaryColor: (state: any) => state.app.color,
      colorWeak: (state: any) => state.app.weak,
      fixedHeader: (state: any) => state.app.fixedHeader,
      fixSiderbar: (state: any) => state.app.fixSiderbar,
      fixSidebar: (state: any) => state.app.fixSiderbar,
      contentWidth: (state: any) => state.app.contentWidth,
      autoHideHeader: (state: any) => state.app.autoHideHeader,
      sidebarOpened: (state: any) => state.app.sidebar,
      multiTab: (state: any) => state.app.multiTab
    })
  },
  methods: {
    isTopMenu() {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu() {
      return !this.isTopMenu()
    }
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: (state: any) => state.app.device
    })
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

const AppDeviceEnquire = {
  mounted() {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
    })
  }
}

export { mixin, AppDeviceEnquire, mixinDevice }
