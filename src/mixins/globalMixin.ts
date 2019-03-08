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
    crud (model) {
      let blueprint = model.entity
      this.$router.push({
        name: 'crud',
        params: {
          blueprint
        }
      })
      setTimeout(() => {
        ;(window as any).CrudTable &&
          (window as any).CrudTable.$emit('SET_MODEL', blueprint)
      }, 500)
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
