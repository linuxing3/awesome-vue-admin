import get from 'vuex-pathify'
import Account from '@/models/Account'

export const validateMixin = {
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
    }
  }
}
