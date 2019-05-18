import Vue from 'vue'
import lfService from '@/util/request.localforage'
import axService from '@/util/request'

const VueAxios = {
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install(Vue, instance) {
    if (this.installed) {
      return
    }
    this.installed = true

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error('You have to install axios')
      return
    }

    Vue.axios = instance

    Object.defineProperties(Vue.prototype, {
      axios: {
        get: function get() {
          return instance
        }
      },
      $http: {
        get: function get() {
          return instance
        }
      }
    })
  }
}

const VueAxiosInstaller = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, axService)
  }
}

// Vue Axios-plugin backed with localforage
const VueLocalForageAxios = {
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install(Vue, instance) {
    if (this.installed) {
      return
    }
    this.installed = true

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error('You have to install localforage axios')
      return
    }

    Vue.lf = instance

    Object.defineProperties(Vue.prototype, {
      lf: {
        get: function get() {
          return instance
        }
      },
      $lf: {
        get: function get() {
          return instance
        }
      }
    })
  }
}

const VueLfInstaller = {
  vm: {},
  install(Vue) {
    Vue.use(VueLocalForageAxios, lfService)
  }
}

Vue.use(VueAxiosInstaller)
Vue.use(VueLfInstaller)
