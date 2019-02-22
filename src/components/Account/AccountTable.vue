<script>
import { join } from 'path'
import { get, sync, call } from 'vuex-pathify'

import Account from '@/models/Account'

import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  data () {
    return {
      modelName: 'account'
    }
  },
  mixins: [crudMixin, exportMixin],
  created () {
    window.AccountForm = this
  },
  async created () {
    let authedAccounts = await Account.query().where('hash', this.cached[0].hash).get()
    console.table(authedAccounts)
    this.model =  authedAccounts[0]
  },
  computed: {
    cached: get('entities/account/cached'),
    computeImgePath: () => 'avatar/man_1.jpg'
  },
  methods: {
    saveAccount (item) {
      accountDb.update('account', item)
    }
  }
}
</script>

<template>
  <v-card class="account-profile ma-5">
    <v-img
        :src="computeImgePath"
        height="390">
      <v-layout
          column
          class="media ma-0">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn
              dark
              icon
              class="mr-3"
              @click="editing = !editing"
            >
            <v-icon>edit</v-icon>
          </v-btn>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="white--text pl-5 pt-5">
          <div class="display-1 pl-5 pt-5">{{model.name}}</div>
        </v-card-title>
      </v-layout>
    </v-img>
    <v-card-text>
      <v-form>
        <v-layout wrap>
          <v-flex
              key="name"
              lg12
              md12
              sm12>
            <v-text-field
                name="name"
                v-model="model['name']"
                :label="tryT('name')">
            </v-text-field>
          </v-flex>
          <v-flex
              key="password"
              lg12
              md12
              sm12>
            <v-text-field
                name="password"
                v-model="model['password']"
                :label="tryT('password')">
            </v-text-field>
          </v-flex>
          <v-flex
              key="email"
              lg12
              md12
              sm12>
            <v-text-field
                name="email"
                v-model="model['email']"
                :label="tryT('email')">
            </v-text-field>
          </v-flex>
          <v-flex
              key="role"
              lg12
              md12
              sm12>
            <v-text-field
                name="role"
                v-model="model['role']"
                :label="tryT('role')">
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions class="pb-3">
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          @click="saveAccount(model)">更新</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="stylus" scoped>
.account-profile
  font-size: 36px
</style>
