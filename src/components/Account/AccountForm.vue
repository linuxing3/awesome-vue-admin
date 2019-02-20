<script>
import { join } from 'path'
import { get, sync, call } from 'vuex-pathify'

import Account from '@/models/Account'

import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

import AwesomeLowdb from '@/api/lowdb'
const accountDb = new AwesomeLowdb('account')

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
  async mounted () {
    this.model = accountDb.find('account', { hash: this.cached[0].hash })
  },
  computed: {
    cached: get('entities/account/cached'),
    computeImgePath: () => join(process.env.BASE_URL, 'avatar/man_1.jpg')
  },
  methods: {
    saveAccount (item) {
      accountDb.update('account', item)
    }
  }
}
</script>

<template>
  <v-card>
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
              v-for="field in fields"
              v-show="field !== 'hash'"
              :key="field"
              lg12
              md12
              sm12>
            <v-text-field
                v-model="model[field]"
                :name="field"
                :label=" $t !== undefined ? $t(field) : field">
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions class="pb-3">
      <v-spacer></v-spacer>
      <v-btn
          v-if="editing"
          color="primary"
          @click="saveAccount(model)">更新</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style lang="scss" module>
</style>
