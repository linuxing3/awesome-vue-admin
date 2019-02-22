<template>
  <v-card
      class="elevation-1 pa-3 mt-5">
    <v-card-text>
      <div class="layout column align-center">
        <v-avatar
            size="256"
          >
          <img
              src="avatar/man_1.jpg"
              alt="Admin Panel"
              width="200"
              height="200">
        </v-avatar>
        <h1 class="flex my-4 primary--text">通用管理系统</h1>
      </div>

    </v-card-text>

    <v-responsive class="loginPanel">
      <v-text-field
          class="ml-5 mr-5"
          v-model="model.name"
          label="姓名"
          type="text"
          data-vv-name="model.name"
          prepend-icon="contacts"
          required
        ></v-text-field>
      <v-text-field
          class="ml-5 mr-5"
          v-model="model.password"
          label="密码"
          type="password"
          data-vv-name="model.password"
          prepend-icon="lock"
          required
        ></v-text-field>
      <v-text-field
          class="ml-5 mr-5"
          v-model="model.email"
          label="电子邮件"
          type="email"
          data-vv-name="model.email"
          prepend-icon="email"
        ></v-text-field>
    </v-responsive>

    <v-card-actions>
      <v-spacer />
      <v-btn
          class="ml-3 mr-3"
          color="primary"
          @click="login"
          :loading="loading">Login</v-btn>
      <v-btn
          class="ml-3 mr-5"
          flat
          @click="logout">Logout</v-btn>
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

import Account from '@/models/Account'
import AppEvents from '@/util/event'

import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  data () {
    return {
      modelName: 'account',
      loading: false,
      model: {
        name: '',
        password: '',
        email: '',
        hash: '',
        role: ''
      },
      snackbar: {
        show: false,
        text: '',
        color: ''
      }
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
    }
  }
}
</script>
<style scoped>
#loginPanel {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
