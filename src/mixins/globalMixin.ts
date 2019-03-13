import { words, truncate } from 'lodash'
import { get } from 'vuex-pathify'

import { interval } from 'rxjs'
import { pluck, map } from 'rxjs/operators'

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
      return truncate(text, {
        length: 20
      })
    },
    countWords (text) {
      return words(text)
    }
  },
  mounted () {
    this.$subscribeTo(interval(60000), function (count) {
      this.loginTime = count
    })
  },
  subscriptions () {
    // declaratively map to another property with Rx operators
    return {
      watchModelName: this.$watchAsObservable('modelName').pipe(
        pluck('newValue'),
        map(value => {
          console.log(`New modelName: ${value}`)
          // update current component
          this.$forceUpdate()
          // refetch asyncData
          this.fetch && this.fetch()
        })
      )
    }
  }
}
