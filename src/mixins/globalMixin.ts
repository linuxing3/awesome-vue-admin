import { words, truncate } from 'lodash'
import { get } from 'vuex-pathify'

import { interval } from 'rxjs'

import Account from '@/models/CoreModel/Account/Account'
import { entities } from '@/api/globals'

export const validateMixin = {
  data () {
    return {
      currentEntity: 'user',
      entities
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
    }
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
      return truncate(text, {
        length: 20
      })
    },
    countWords (text) {
      return words(text)
    },
    /**
     * 尝试进行国际化翻译
     * @param text 需要翻译的文字
     */
    tryT (text: string) {
      if (this.$t !== undefined) {
        return this.$t(text)
      } else {
        return text
      }
    }
  },
  mounted () {
    this.$subscribeTo(interval(60000), function (count) {
      this.loginTime = count
    })
  }
}
