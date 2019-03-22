<template>
  <v-card
      max-width="750px"
      class="elevation-1 pa-3 mt-5">
    <v-card-title>
      <div
          @click="chooseAvatar"
          class="layout column align-center">

        <v-layout
            row
            justify-center>
          <v-dialog
              v-model="dialog"
              persistent
              max-width="400">
            <v-avatar
                slot="activator"
                size="256"
              >
              <img
                  :src="model.avatar"
                  alt="Admin Panel"
                  width="200"
                  height="200">
            </v-avatar>

            <v-card>
              <v-card-title class="headline primary--text">
                选择你的头像图片
                <v-spacer />
                <v-btn
                    @click="dialog = false"
                    flat>关闭</v-btn>
              </v-card-title>
              <v-card-text>
                <PhotoGallery :items="avatars" />
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>

        <h1 class="flex my-4 primary--text">通用管理系统</h1>
      </div>

    </v-card-title>

    <v-card-text>
      <v-layout
          row
          wrap>
        <v-flex
            xs12
            sm6
            md6>
          <v-text-field
              class="ml-5 mr-5"
              v-model="model.name"
              label="姓名"
              type="text"
              data-vv-name="model.name"
              prepend-icon="contacts"
              required
            ></v-text-field>
        </v-flex>
        <v-flex
            xs12
            sm6
            md6>
          <v-text-field
              class="ml-5 mr-5"
              v-model="model.password"
              label="密码"
              type="password"
              data-vv-name="model.password"
              prepend-icon="lock"
              required
            ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
          color="primary"
          @click="login"
          :loading="loading">{{ $t('app.login') }}</v-btn>
      <v-btn
          class="ml-3 mr-5"
          flat
          @click="logout">{{ $t('app.logout') }}</v-btn>
    </v-card-actions>

    <v-responsive>
      <!-- 显示状态信息 -->
      <SnackBar
          :snackbar="snackbar"
        >:(
      </SnackBar>
    </v-responsive>
  </v-card>
</template>

<script>
import { mapValues } from 'lodash'
import { get, sync, call } from 'vuex-pathify'
import { join } from 'path'

import Account from '@/models/CoreModel/Account/Account'
import AppEvents from '@/util/event'

import { publicAssets } from '@/api/globals'

import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'
const { avatars } = publicAssets

export default {
  data () {
    return {
      modelName: 'account',
      loading: false,
      avatars,
      dialog: false,
      model: {
        name: '',
        password: '',
        email: '',
        hash: '',
        role: 'user',
        avatar: 'avatar/man_1.jpg'
      },
      snackbar: {
        show: false,
        text: '',
        color: ''
      }
    }
  },
  watch: {
    'model.name': {
      handler (name) {
        let account = Account.query()
          .where('name', name).get()[0]
        if (account !== undefined) {
          this.model.avatar = account.avatar
        }
      },
      immediate: false
    }
  },
  computed: {
    loggedIn: sync('entities/account/loggedIn')
  },
  mixins: [ crudMixin, exportMixin ],
  async created () {
    await this.init()

    AppEvents.forEach(item => {
      this.$on(item.name, item.callback)
    })
    this.$on('select-photo', photo => {
      this.chooseAvatar(photo.src)
    })

    window.LoginForm = this
  },
  methods: {
    signup: call('entities/account/signup'),
    init: call('entities/account/init'),
    clearCache: call('entities/account/clearCache'),
    async login () {
      if (this.model.name !== '' && this.model.password !== '') {
        // 注册
        await this.signup(this.model)
        // 过渡
        this.loading = true
        // 跳转页面
        setTimeout(() => {
          if (this.loggedIn) {
            this.$router.push('/home')
            this.$emit('APP_LOGIN_SUCCESS')
          } else {
            this.loading = false
            this.$emit('APP_LOGIN_DATA_INVALID')
          }
        }, 1000)
      } else {
        this.loading = false
        this.$emit('APP_LOGIN_FAILED')
      }
    },
    logout () {
      mapValues(this.model, (o) => '')
      setTimeout(() => {
        this.clearCache()
        this.$router.push('/login')
      }, 1000)
    },
    chooseAvatar (avatar) {
      // choose avatar from photo gallery
      this.model.avatar = avatar
      this.dialog = false
    }
  }
}
</script>
<style scoped>
#loginPanel {
  height: 50%;
  width: 50%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
