import { get } from 'vuex-pathify'
import { words, truncate } from 'lodash'

import Account from '@/models/CoreModel/Account/Account'
import { entities } from '@/api/globals'

export const validateMixin = {
  data () {
    return {
      currentEntity: 'user'
    }
  },
  computed: {
    currentItem: get('entities/account/currentItem'),
    cached: get('entities/account/cached'),
    admins (): any[] {
      return Account.query()
        .where((_record, _query, model) => {
          return model.isAdmin()
        })
        .get()
    },
    entities: () => entities
  },
  methods: {
    isAdmin () {
      return this.currentItem.role === 'admin'
    },
    crud (params) {
      this.$router.push({
        name: 'crud',
        params
      })
    },
    info (params) {
      this.$router.push({
        name: 'info',
        params
      })
    },
    truncateText (text) {
      let count = words(text)
      let omission = `[... ${count} more]`
      return truncate(text, {
        omission
      })
    },
    countWords (text) {
      return words(text)
    }
  }
}
