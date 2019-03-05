import { get } from 'vuex-pathify'

import Account from '@/models/CoreModel/Account'
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
      let modelName = model.entity
      this.$router.push({
        name: 'crud',
        params: {
          modelName
        }
      })
      setTimeout(() => {
        (window as any).CrudTable &&
          (window as any).CrudTable.$emit('SET_MODEL', modelName)
      }, 500)
    }
  }
}
