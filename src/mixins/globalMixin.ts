import { get } from 'vuex-pathify'
import { interval } from 'rxjs'
import models from '@/models'
import { entities } from '@/api/globals'

export const validateMixin = {
  data() {
    return {
      entities,
      models,
      fields: ['name']
    }
  },
  computed: {
    currentItem: get('entities/account/currentItem'),
    cached: get('entities/account/cached')
  },
  methods: {
    isAdmin() {
      return this.currentItem.role === 'admin'
    }
  },
  mounted() {
    this.$subscribeTo(interval(60000), function(count) {
      this.loginTime = count
    })
  }
}
