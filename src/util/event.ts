// Events for app
import { dirname, resolve, join } from 'path'

export interface Event {
  name: string
  callback: Function
  snackbar?: any
  $router?: any
  $message?: any
  editing?: boolean
  model?: any
}

const events: Event[] = [
  {
    name: 'APP_LOGIN_SUCCESS',
    callback: function (e: any) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: '登录成功!'
      }
    }
  },
  {
    name: 'APP_LOGIN_DATA_INVALID',
    callback: function (e: any) {
      this.snackbar = {
        show: true,
        color: 'red',
        text: '信息无效, 登录失败!'
      }
    }
  },
  {
    name: 'APP_LOGIN_FAILED',
    callback: function (e: any) {
      this.snackbar = {
        show: true,
        color: 'red',
        text: '必须填写全部信息, 登录失败!'
      }
    }
  },
  {
    name: 'DOCPATH_CHANGED',
    callback: function (e: any) {
      this.snackbar = {
        show: true,
        color: 'red',
        text: '模板文件位置改变!'
      }
    }
  },
  {
    name: 'APP_LOGOUT',
    callback: function (e: any) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: '成功登出！'
      }
      this.$router.replace({ path: '/login' })
    }
  },
  {
    name: 'APP_ACCOUNTSETTING',
    callback: function (e: any) {
      this.$router.push({ path: '/account-form' })
    }
  },
  {
    name: 'APP_PAGE_LOADED',
    callback: function (e: any) {
      console.log('页面加载！')
    }
  },
  {
    name: 'APP_AUTH_FAILED',
    callback: function (e: any) {
      this.$router.push('/login')
      this.$message.error('登录过期')
    }
  },
  {
    name: 'APP_BAD_REQUEST',
    // @error api response data
    callback: function (msg: any) {
      this.$message.error(msg)
    }
  },
  {
    name: 'APP_ACCESS_DENIED',
    // @error api response data
    callback: function (msg: any) {
      this.$message.error(msg)
      this.$router.push('/forbidden')
    }
  },
  {
    name: 'APP_RESOURCE_DELETED',
    // @error api response data
    callback: function (msg: any) {
      this.$message.success(msg)
    }
  },
  {
    name: 'APP_RESOURCE_UPDATED',
    // @error api response data
    callback: function (msg: any) {
      this.$message.success(msg)
    }
  },
  {
    name: 'ONLINE_STATUS_CHANGED',
    // @error api response data
    callback: function (status: string) {
      let color = status === 'online' ? 'green' : 'red'
      this.snackbar = {
        show: true,
        color,
        text: '在线状态改变!'
      }
    }
  },
  {
    name: 'EDITING_STATUS_CHANGED',
    // @component listen editing status
    callback: function (item: object) {
      this.editing = true
      this.model = item
    }
  },
  {
    name: 'APP_PLAYGROUND',
    // @error api response data
    callback: function (e: any) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: '打开实验场!'
      }
      this.$router.push({ path: '/vacation' })
    }
  },
  {
    name: 'APP_SPLITROUTES',
    // @error api response data
    callback: function (e: any) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: '分割路由!'
      }
      console.log(resolve('./src/router'))
    }
  },
  {
    name: 'DATA_EXPORTED',
    callback: function (path: string) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: `导出成功!文件在${path}`
      }
    }
  },
  {
    name: 'DATA_HEAD_CHANGED',
    callback: function (path: string) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: `标题修改成功!文件在${path}`
      }
    }
  }
]

export default events
