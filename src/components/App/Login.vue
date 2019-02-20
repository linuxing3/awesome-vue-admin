<template>
  <v-app
      id="login"
      class="primary">
    <v-content>
      <v-container
          fluid
          fill-height>
        <v-layout
            align-center
            justify-center>
          <v-flex
              xs12
              sm8
              md6
              lg6>
            <v-card class="elevation-1 pa-3">
              <v-card-text>

                <div class="layout column align-center">
                  <img
                      :src="computeAvatar"
                      alt="Admin Panel"
                      width="120"
                      height="120">
                  <h1 class="flex my-4 primary--text">通用管理系统</h1>
                </div>

              </v-card-text>

              <v-responsive class="loginPanel">
                <v-text-field
                    v-model="model.name"
                    label="姓名"
                    type="text"
                    data-vv-name="model.name"
                    prepend-icon="contacts"
                    required
                  ></v-text-field>
                <v-text-field
                    v-model="model.password"
                    label="密码"
                    type="password"
                    data-vv-name="model.password"
                    prepend-icon="lock"
                    required
                  ></v-text-field>
                <v-text-field
                    v-model="model.email"
                    label="电子邮件"
                    type="email"
                    data-vv-name="model.email"
                    prepend-icon="email"
                    required
                  ></v-text-field>
              </v-responsive>

              <v-card-actions>
                <v-btn
                    block
                    color="primary"
                    @click="login"
                    :loading="loading">Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    block
                    color="grey"
                    @click="logout">Logout</v-btn>
              </v-card-actions>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { get, sync, call } from 'vuex-pathify'
import { join } from 'path'

export default {
  data: () => ({
    loading: false,
    model: {
      name: 'embajadachina',
      password: 'embajadachina',
      email: 'embajachina@gmail.com',
      hash: '',
      role: 'manager'
    },
    baseUrl: process.env.BASE_URL
  }),
  computed: {
    computeAvatar: () => join(process.env.BASE_URL, 'avatar/man_1.jpg'),
    currentItem: sync('entities/account/currentItem'),
    loggedIn: sync('entities/account/loggedIn')
  },
  mounted () {
    console.log(this.baseUrl)
  },
  methods: {
    signup: call('entities/account/signup'),
    async login () {
      // account/signin/signup
      if ((this.model.name !== '' && this.model.password !== '') || this.model.email !== '') {
        await this.signup(this.model)
        this.loading = true
        setTimeout(() => {
          if (this.loggedIn) {
            this.$router.push('/docs/manual')
          } else {
            this.loading = false
            window.getApp.$emit('APP_LOGIN_DATA_INVALID')
          }
        }, 1000)
      } else {
        this.loading = false
        window.getApp.$emit('APP_LOGIN_FAILED')
      }
    },
    logout () {
      this.model.name = ''
      this.model.password = ''
      this.model.email = ''
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    }
  }
}
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
