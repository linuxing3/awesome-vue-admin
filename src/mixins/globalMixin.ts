import { get } from 'vuex-pathify'
import Account from '@/models/Account'
import Database from '@/models/Database'
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
    // entities () {
    //   return Database.all().reduce((entities, entityConfig) => {
    //     entities.push(entityConfig['name'])
    //     return entities
    //   }, [])
    // }
    entities: () => entities
  },
  methods: {
    isAdmin () {
      return this.currentItem.role === 'admin'
    }
  }
}
